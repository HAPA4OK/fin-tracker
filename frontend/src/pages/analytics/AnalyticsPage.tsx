import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

type AnalyticsView = 'personal' | 'family';
type PeriodId = 'all' | 'today' | 'week' | 'month' | 'custom';

type ApiTransaction = {
  _id?: string;
  id?: string;
  transactionNum?: number;
  amount: number;
  date: string;
  categoryInfo?: string;
  category?: string;
  bank?: string;
  commentary?: string;
  description?: string;
};

type Transaction = {
  id: string;
  amount: number;
  date: string;
  category: string;
  bank: string;
  description: string;
};

type CategoryItem = {
  key: string;
  label: string;
  value: number;
  percent: number;
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const categoryLabels: Record<string, string> = {
  salary: 'Зарплата',
  transfers: 'Переводы',
  products: 'Продукты',
  others: 'Другое',
  other: 'Другое',
  transport: 'Транспорт',
  restaurant: 'Рестораны',
  restaurants: 'Рестораны',
  supermarket: 'Супермаркеты',
  cash: 'Наличные',
  services: 'Услуги',
  entertainment: 'Развлечения',
  health: 'Здоровье',
  home: 'Дом',
  education: 'Образование',
};

const periods: Array<{ id: PeriodId; label: string }> = [
  { id: 'all', label: 'Все время' },
  { id: 'today', label: 'Сегодня' },
  { id: 'week', label: 'Эта неделя' },
  { id: 'month', label: 'Этот месяц' },
  { id: 'custom', label: 'Свой период' },
];

const familyFallbackTransactions: Transaction[] = [
  {
    id: 'family-1',
    amount: 85000,
    date: '2026-03-29',
    category: 'salary',
    bank: 'Семейный счёт',
    description: 'Зарплата',
  },
  {
    id: 'family-2',
    amount: 90000,
    date: '2026-03-27',
    category: 'transfers',
    bank: 'Семейный счёт',
    description: 'Проект',
  },
  {
    id: 'family-3',
    amount: -9000,
    date: '2026-03-24',
    category: 'products',
    bank: 'Семейный счёт',
    description: 'Продукты',
  },
  {
    id: 'family-4',
    amount: -2000,
    date: '2026-03-21',
    category: 'transport',
    bank: 'Семейный счёт',
    description: 'Транспорт',
  },
  {
    id: 'family-5',
    amount: -29000,
    date: '2026-03-18',
    category: 'entertainment',
    bank: 'Семейный счёт',
    description: 'Развлечения',
  },
];

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (dateValue: string) => {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return date.toLocaleDateString('ru-RU');
};

const formatMoney = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: Math.abs(value) % 1 === 0 ? 0 : 2,
  }).format(value);

const normalizeCategory = (value?: string) => {
  const category = value?.trim();

  if (!category) {
    return 'other';
  }

  return category;
};

const getCategoryLabel = (category: string) => categoryLabels[category] || category;

const getPeriodRange = (periodId: PeriodId, customFrom: string, customTo: string) => {
  const now = new Date();
  const today = formatDate(now);

  switch (periodId) {
    case 'today':
      return {
        from: today,
        to: today,
      };

    case 'week': {
      const firstDay = new Date(now);
      const currentDay = firstDay.getDay();
      const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

      firstDay.setDate(firstDay.getDate() + diffToMonday);

      return {
        from: formatDate(firstDay),
        to: today,
      };
    }

    case 'month':
      return {
        from: formatDate(new Date(now.getFullYear(), now.getMonth(), 1)),
        to: today,
      };

    case 'custom':
      return {
        from: customFrom,
        to: customTo,
      };

    case 'all':
    default:
      return {
        from: '2000-01-01',
        to: today,
      };
  }
};

const mapApiTransaction = (transaction: ApiTransaction, index: number): Transaction => ({
  id: transaction._id || transaction.id || `transaction-${index}`,
  amount: Number(transaction.amount) || 0,
  date: transaction.date,
  category: normalizeCategory(transaction.categoryInfo || transaction.category),
  bank: transaction.bank || 'Общий счёт',
  description:
    transaction.description ||
    transaction.commentary ||
    getCategoryLabel(normalizeCategory(transaction.categoryInfo || transaction.category)),
});

const filterTransactionsByDate = (transactions: Transaction[], dateFrom: string, dateTo: string) => {
  const fromTime = new Date(`${dateFrom}T00:00:00`).getTime();
  const toTime = new Date(`${dateTo}T23:59:59`).getTime();

  return transactions.filter((transaction) => {
    const transactionTime = new Date(transaction.date).getTime();

    if (Number.isNaN(transactionTime)) {
      return false;
    }

    return transactionTime >= fromTime && transactionTime <= toTime;
  });
};

const groupByCategory = (transactions: Transaction[], type: 'income' | 'expense'): CategoryItem[] => {
  const isIncome = type === 'income';
  const filtered = transactions.filter((transaction) =>
    isIncome ? transaction.amount > 0 : transaction.amount < 0,
  );

  const total = filtered.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
  const grouped = filtered.reduce<Record<string, number>>((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + Math.abs(transaction.amount);

    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([key, value]) => ({
      key,
      label: getCategoryLabel(key),
      value,
      percent: total > 0 ? Math.round((value / total) * 100) : 0,
    }))
    .sort((a, b) => b.value - a.value);
};

const buildExportText = (
  view: AnalyticsView,
  dateFrom: string,
  dateTo: string,
  transactions: Transaction[],
) => {
  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  const balance = income - expenses;

  const rows = transactions
    .map(
      (transaction) =>
        `${formatDisplayDate(transaction.date)} | ${transaction.description} | ${transaction.bank} | ${formatMoney(
          transaction.amount,
        )}`,
    )
    .join('\n');

  return [
    `Аналитика: ${view === 'personal' ? 'Личная' : 'Семейная'}`,
    `Период: ${dateFrom} — ${dateTo}`,
    `Баланс: ${formatMoney(balance)}`,
    `Доходы: ${formatMoney(income)}`,
    `Расходы: ${formatMoney(expenses)}`,
    '',
    'Операции:',
    rows || 'Нет операций',
  ].join('\n');
};

export default function AnalyticsPage() {
  const [activeView, setActiveView] = useState<AnalyticsView>('personal');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodId>('all');
  const [customFrom, setCustomFrom] = useState('2000-01-01');
  const [customTo, setCustomTo] = useState(formatDate(new Date()));
  const [personalTransactions, setPersonalTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [expanded, setExpanded] = useState(false);

  const { from: dateFrom, to: dateTo } = useMemo(
    () => getPeriodRange(selectedPeriod, customFrom, customTo),
    [selectedPeriod, customFrom, customTo],
  );

  useEffect(() => {
    if (activeView !== 'personal') {
      return;
    }

    const controller = new AbortController();

    const loadPersonalAnalytics = async () => {
      setIsLoading(true);
      setLoadError('');

      try {
        const url = new URL('/api/transactions', API_URL);
        url.searchParams.set('dateFrom', dateFrom);
        url.searchParams.set('dateTo', dateTo);
        url.searchParams.set('limit', '200');
        url.searchParams.set('sortBy', 'date');
        url.searchParams.set('order', 'desc');

        const response = await fetch(url.toString(), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Не удалось загрузить операции');
        }

        const result = await response.json();
        const transactions = Array.isArray(result.data) ? result.data : [];

        setPersonalTransactions(transactions.map(mapApiTransaction));
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setLoadError('Не удалось загрузить личную аналитику. Проверь backend и API.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPersonalAnalytics();

    return () => {
      controller.abort();
    };
  }, [activeView, dateFrom, dateTo]);

  useEffect(() => {
    setExpanded(false);
  }, [activeView, selectedPeriod, customFrom, customTo]);

  const currentTransactions = useMemo(() => {
    if (activeView === 'personal') {
      return personalTransactions;
    }

    return filterTransactionsByDate(familyFallbackTransactions, dateFrom, dateTo);
  }, [activeView, dateFrom, dateTo, personalTransactions]);

  const income = useMemo(
    () =>
      currentTransactions
        .filter((transaction) => transaction.amount > 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    [currentTransactions],
  );

  const expenses = useMemo(
    () =>
      currentTransactions
        .filter((transaction) => transaction.amount < 0)
        .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0),
    [currentTransactions],
  );

  const balance = income - expenses;
  const expenseCategories = useMemo(
    () => groupByCategory(currentTransactions, 'expense'),
    [currentTransactions],
  );
  const incomeCategories = useMemo(
    () => groupByCategory(currentTransactions, 'income'),
    [currentTransactions],
  );

  const visibleTransactions = expanded ? currentTransactions : currentTransactions.slice(0, 5);

  const handlePeriodClick = (periodId: PeriodId) => {
    setSelectedPeriod(periodId);

    const range = getPeriodRange(periodId, customFrom, customTo);

    if (periodId !== 'custom') {
      setCustomFrom(range.from);
      setCustomTo(range.to);
    }
  };

  const handleExport = () => {
    const text = buildExportText(activeView, dateFrom, dateTo, currentTransactions);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = fileUrl;
    link.download = `analytics-${activeView}-${dateFrom}-${dateTo}.txt`;
    link.click();

    URL.revokeObjectURL(fileUrl);
  };

  return (
    <div className="app-shell analytics-shell">
      <Header userName="Олег Зуев" />

      <main className="analytics-page">
        <section className="analytics-hero panel">
          <div>
            <p className="analytics-hero__eyebrow">Баланс+</p>
            <h1>Аналитика</h1>
            <p>
              Наглядная статистика по доходам, расходам и операциям за выбранный
              период.
            </p>
          </div>

          <Link className="analytics-hero__close" to="/main" aria-label="Вернуться на главную">
            ×
          </Link>
        </section>

        <section className="analytics-toggle panel" aria-label="Тип аналитики">
          <button
            type="button"
            className={activeView === 'personal' ? 'active' : ''}
            onClick={() => setActiveView('personal')}
          >
            Личная аналитика
          </button>

          <button
            type="button"
            className={activeView === 'family' ? 'active' : ''}
            onClick={() => setActiveView('family')}
          >
            Семейная аналитика
          </button>
        </section>

        <section className="analytics-period panel">
          <div className="analytics-section-heading">
            <h2>Периоды</h2>
            <span>
              {dateFrom} — {dateTo}
            </span>
          </div>

          <div className="analytics-period__chips">
            {periods.map((period) => (
              <button
                key={period.id}
                type="button"
                className={selectedPeriod === period.id ? 'active' : ''}
                onClick={() => handlePeriodClick(period.id)}
              >
                {period.label}
              </button>
            ))}
          </div>

          <div className="analytics-period__dates">
            <label>
              <span>С</span>
              <input
                type="date"
                value={customFrom}
                onChange={(event) => {
                  setSelectedPeriod('custom');
                  setCustomFrom(event.target.value);
                }}
              />
            </label>

            <span className="analytics-period__dash">—</span>

            <label>
              <span>По</span>
              <input
                type="date"
                value={customTo}
                onChange={(event) => {
                  setSelectedPeriod('custom');
                  setCustomTo(event.target.value);
                }}
              />
            </label>
          </div>
        </section>

        {loadError && activeView === 'personal' && (
          <div className="analytics-alert panel">{loadError}</div>
        )}

        <section className="analytics-stats">
          <article className="analytics-stat panel">
            <span>Баланс за период</span>
            <strong>{formatMoney(balance)}</strong>
          </article>

          <article className="analytics-stat panel analytics-stat--income">
            <span>Доходы</span>
            <strong>{formatMoney(income)}</strong>
          </article>

          <article className="analytics-stat panel analytics-stat--expense">
            <span>Расходы</span>
            <strong>{formatMoney(expenses)}</strong>
          </article>
        </section>

        <section className="analytics-columns">
          <CategoryBlock
            title="Расходы по категориям"
            items={expenseCategories}
            emptyText="Расходов за выбранный период нет"
            type="expense"
          />

          <CategoryBlock
            title="Доходы по категориям"
            items={incomeCategories}
            emptyText="Доходов за выбранный период нет"
            type="income"
          />
        </section>

        <section className="analytics-operations panel">
          <div className="analytics-section-heading">
            <h2>Все операции</h2>
            <span>{currentTransactions.length}</span>
          </div>

          {isLoading && activeView === 'personal' ? (
            <div className="analytics-empty">Загружаем личные операции...</div>
          ) : visibleTransactions.length > 0 ? (
            <div className="analytics-operations__list">
              {visibleTransactions.map((transaction) => (
                <article className="analytics-operation" key={transaction.id}>
                  <div
                    className={`analytics-operation__icon ${
                      transaction.amount >= 0 ? 'income' : 'expense'
                    }`}
                  >
                    {transaction.amount >= 0 ? '+' : '−'}
                  </div>

                  <div className="analytics-operation__main">
                    <strong>{transaction.description || getCategoryLabel(transaction.category)}</strong>
                    <span>
                      {getCategoryLabel(transaction.category)} · {transaction.bank}
                    </span>
                  </div>

                  <time dateTime={transaction.date}>{formatDisplayDate(transaction.date)}</time>

                  <strong
                    className={`analytics-operation__amount ${
                      transaction.amount >= 0 ? 'income' : 'expense'
                    }`}
                  >
                    {formatMoney(transaction.amount)}
                  </strong>
                </article>
              ))}
            </div>
          ) : (
            <div className="analytics-empty">Операций за выбранный период нет</div>
          )}

          {currentTransactions.length > 5 && (
            <button
              type="button"
              className="analytics-show-more"
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? 'Свернуть' : 'Показать больше'}
            </button>
          )}
        </section>

        <button type="button" className="analytics-export" onClick={handleExport}>
          Экспортировать отчёт
        </button>
      </main>
    </div>
  );
}

function CategoryBlock({
  title,
  items,
  emptyText,
  type,
}: {
  title: string;
  items: CategoryItem[];
  emptyText: string;
  type: 'income' | 'expense';
}) {
  return (
    <section className="analytics-category panel">
      <h2>{title}</h2>

      {items.length > 0 ? (
        <div className="analytics-category__list">
          {items.map((item) => (
            <div className="analytics-category__row" key={item.key}>
              <div>
                <strong>{item.label}</strong>
                <span>{item.percent}%</span>
              </div>

              <div className="analytics-category__bar">
                <span
                  className={type}
                  style={{ width: `${Math.max(item.percent, 6)}%` }}
                />
              </div>

              <strong className={type}>{formatMoney(item.value)}</strong>
            </div>
          ))}
        </div>
      ) : (
        <div className="analytics-empty">{emptyText}</div>
      )}
    </section>
  );
}
