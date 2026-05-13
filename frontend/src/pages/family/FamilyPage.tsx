import { useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

export type FamilyPageVariant = 'menu' | 'prompt' | 'create' | 'settings';

type FamilyPageProps = {
  variant?: FamilyPageVariant;
};

type FamilyMember = {
  id: number;
  name: string;
  role: string;
  initials: string;
  balance: number;
  income: number;
  expenses: number;
  color: 'blue' | 'green' | 'orange' | 'purple';
};

type FamilyOperation = {
  id: number;
  title: string;
  member: string;
  category: string;
  date: string;
  amount: number;
};

type BudgetItem = {
  title: string;
  spent: number;
  limit: number;
};

const members: FamilyMember[] = [
  {
    id: 1,
    name: 'Олег Зуев',
    role: 'Владелец',
    initials: 'ОЗ',
    balance: 76000,
    income: 125000,
    expenses: 49000,
    color: 'blue',
  },
  {
    id: 2,
    name: 'Анна Зуева',
    role: 'Участник',
    initials: 'АЗ',
    balance: 42000,
    income: 73000,
    expenses: 31000,
    color: 'green',
  },
  {
    id: 3,
    name: 'Семейный счёт',
    role: 'Общий бюджет',
    initials: 'С',
    balance: 118000,
    income: 198000,
    expenses: 80000,
    color: 'purple',
  },
];

const operations: FamilyOperation[] = [
  {
    id: 1,
    title: 'Зарплата',
    member: 'Олег Зуев',
    category: 'Доходы',
    date: '15.05.2026',
    amount: 115670,
  },
  {
    id: 2,
    title: 'Продукты',
    member: 'Анна Зуева',
    category: 'Супермаркеты',
    date: '14.05.2026',
    amount: -8230,
  },
  {
    id: 3,
    title: 'Перевод на общий счёт',
    member: 'Олег Зуев',
    category: 'Переводы',
    date: '13.05.2026',
    amount: -15000,
  },
  {
    id: 4,
    title: 'Оплата квартиры',
    member: 'Семейный счёт',
    category: 'Дом',
    date: '12.05.2026',
    amount: -42000,
  },
];

const budgets: BudgetItem[] = [
  {
    title: 'Продукты',
    spent: 32800,
    limit: 50000,
  },
  {
    title: 'Транспорт',
    spent: 9200,
    limit: 15000,
  },
  {
    title: 'Развлечения',
    spent: 18600,
    limit: 25000,
  },
];

const periodOptions = ['Все время', 'Сегодня', 'Эта неделя', 'Этот месяц', 'Свой период'];

const formatMoney = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value);

export function FamilyPage({ variant = 'menu' }: FamilyPageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('Все время');
  const [familyName, setFamilyName] = useState('Семья Зуевых');
  const [inviteEmail, setInviteEmail] = useState('');
  const [notice, setNotice] = useState('');

  const totals = useMemo(
    () => ({
      balance: members.reduce((sum, member) => sum + member.balance, 0),
      income: members.reduce((sum, member) => sum + member.income, 0),
      expenses: members.reduce((sum, member) => sum + member.expenses, 0),
    }),
    [],
  );

  const closeLink = '/family';

  const handleCreateFamily = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(`Семья «${familyName}» сохранена`);
  };

  const handleInvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inviteEmail.trim()) {
      setNotice('Введите email участника');
      return;
    }

    setNotice(`Приглашение отправлено на ${inviteEmail}`);
    setInviteEmail('');
  };

  return (
    <div className="app-shell family-redesign-shell">
      <Header userName="Олег Зуев" />

      <main className="family-page">
        <section className="family-hero panel">
          <div className="family-hero__content">
            <p className="family-hero__eyebrow">Баланс+ · семейный доступ</p>
            <h1>Семья Олега</h1>
            <p>
              Общий бюджет, участники, лимиты и последние операции в одном аккуратном
              разделе.
            </p>

            <div className="family-hero__actions">
              <Link className="family-primary-action" to="/family/create">
                Создать семью
              </Link>
              <Link className="family-secondary-action" to="/family/settings">
                Настройки
              </Link>
            </div>
          </div>
        </section>

        <section className="family-stats">
          <article className="family-stat-card panel">
            <span>Общий баланс</span>
            <strong>{formatMoney(totals.balance)}</strong>
          </article>

          <article className="family-stat-card panel family-stat-card--income">
            <span>Доходы семьи</span>
            <strong>{formatMoney(totals.income)}</strong>
          </article>

          <article className="family-stat-card panel family-stat-card--expense">
            <span>Расходы семьи</span>
            <strong>{formatMoney(totals.expenses)}</strong>
          </article>
        </section>

        <section className="family-layout">
          <div className="family-left-column">
            <section className="family-period-card panel">
              <div className="family-section-heading">
                <h2>Периоды</h2>
                <span>{selectedPeriod}</span>
              </div>

              <div className="family-period-chips">
                {periodOptions.map((period) => (
                  <button
                    key={period}
                    type="button"
                    className={selectedPeriod === period ? 'active' : ''}
                    onClick={() => setSelectedPeriod(period)}
                  >
                    {period}
                  </button>
                ))}
              </div>

              <div className="family-date-row">
                <label>
                  <span>С</span>
                  <input type="date" defaultValue="2000-01-01" />
                </label>

                <span className="family-date-row__dash">—</span>

                <label>
                  <span>По</span>
                  <input type="date" defaultValue="2026-05-13" />
                </label>
              </div>

              <button className="family-soft-button" type="button">
                Применить
              </button>
            </section>

            <section className="family-members-card panel">
              <div className="family-section-heading">
                <h2>Участники</h2>
                <Link to="/family/prompt">Пригласить</Link>
              </div>

              <div className="family-members-list">
                {members.map((member) => (
                  <article className="family-member-card" key={member.id}>
                    <span className={`family-avatar family-avatar--${member.color}`}>
                      {member.initials}
                    </span>

                    <div className="family-member-card__main">
                      <strong>{member.name}</strong>
                      <span>{member.role}</span>
                    </div>

                    <strong className="family-member-card__balance">
                      {formatMoney(member.balance)}
                    </strong>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="family-right-column">
            <section className="family-budgets-card panel">
              <div className="family-section-heading">
                <h2>Лимиты по категориям</h2>
                <span>Май</span>
              </div>

              <div className="family-budget-list">
                {budgets.map((budget) => {
                  const percent = Math.min(Math.round((budget.spent / budget.limit) * 100), 100);

                  return (
                    <article className="family-budget-row" key={budget.title}>
                      <div>
                        <strong>{budget.title}</strong>
                        <span>
                          {formatMoney(budget.spent)} из {formatMoney(budget.limit)}
                        </span>
                      </div>

                      <div className="family-budget-progress">
                        <span style={{ width: `${percent}%` }} />
                      </div>

                      <strong>{percent}%</strong>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="family-operations-card panel">
              <div className="family-section-heading">
                <h2>Последние операции</h2>
                <span>{operations.length}</span>
              </div>

              <div className="family-operations-list">
                {operations.map((operation) => (
                  <article className="family-operation-row" key={operation.id}>
                    <div
                      className={`family-operation-row__icon ${
                        operation.amount > 0 ? 'income' : 'expense'
                      }`}
                    >
                      {operation.amount > 0 ? '+' : '−'}
                    </div>

                    <div className="family-operation-row__main">
                      <strong>{operation.title}</strong>
                      <span>
                        {operation.member} · {operation.category}
                      </span>
                    </div>

                    <time>{operation.date}</time>

                    <strong
                      className={`family-operation-row__amount ${
                        operation.amount > 0 ? 'income' : 'expense'
                      }`}
                    >
                      {formatMoney(operation.amount)}
                    </strong>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>

      {variant === 'prompt' && (
        <div className="family-modal-backdrop">
          <form className="family-modal panel" onSubmit={handleInvite}>
            <Link className="family-modal__close" to={closeLink} aria-label="Закрыть">
              ×
            </Link>

            <p className="family-modal__eyebrow">Приглашение</p>
            <h2>Добавить участника</h2>
            <p>
              Укажи email человека, которого нужно подключить к семейному бюджету.
            </p>

            <label className="family-field">
              <span>Email</span>
              <input
                type="email"
                value={inviteEmail}
                onChange={(event) => setInviteEmail(event.target.value)}
                placeholder="name@example.com"
              />
            </label>

            {notice && <div className="family-notice">{notice}</div>}

            <button className="family-primary-action" type="submit">
              Отправить приглашение
            </button>
          </form>
        </div>
      )}

      {variant === 'create' && (
        <div className="family-modal-backdrop">
          <form className="family-modal panel" onSubmit={handleCreateFamily}>
            <Link className="family-modal__close" to={closeLink} aria-label="Закрыть">
              ×
            </Link>

            <p className="family-modal__eyebrow">Новая семья</p>
            <h2>Создать семейный бюджет</h2>
            <p>
              Название будет отображаться в общем разделе и настройках семейного доступа.
            </p>

            <label className="family-field">
              <span>Название семьи</span>
              <input
                value={familyName}
                onChange={(event) => setFamilyName(event.target.value)}
                placeholder="Например, Семья Зуевых"
              />
            </label>

            {notice && <div className="family-notice">{notice}</div>}

            <button className="family-primary-action" type="submit">
              Создать
            </button>
          </form>
        </div>
      )}

      {variant === 'settings' && (
        <div className="family-modal-backdrop">
          <section className="family-modal family-settings-modal panel">
            <Link className="family-modal__close" to={closeLink} aria-label="Закрыть">
              ×
            </Link>

            <p className="family-modal__eyebrow">Настройки</p>
            <h2>Настройки семьи</h2>
            <p>Управление участниками, правами доступа и общим бюджетом.</p>

            <div className="family-settings-list">
              <button type="button">Переименовать семью</button>
              <button type="button">Настроить лимиты</button>
              <button type="button">Права участников</button>
              <button type="button" className="danger">
                Покинуть семью
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default FamilyPage;
