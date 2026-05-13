import React, { useState } from 'react';

const periods = [
  { id: 'all', label: 'Все время' },
  { id: 'today', label: 'Сегодня' },
  { id: 'week', label: 'Эта неделя' },
  { id: 'month', label: 'Этот месяц' },
  { id: 'custom', label: 'Свой период' },
] as const;

type PeriodId = (typeof periods)[number]['id'];

interface PeriodSelectorProps {
  onDataLoaded: (result: any) => void;
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ onDataLoaded }) => {
  const [selectedId, setSelectedId] = useState<PeriodId>('all');
  const [dateFrom, setDateFrom] = useState('2000-01-01');
  const [dateTo, setDateTo] = useState(formatDate(new Date()));

  const calculateDates = (id: PeriodId) => {
    const now = new Date();
    const todayStr = formatDate(now);

    switch (id) {
      case 'today':
        return {
          from: todayStr,
          to: todayStr,
        };

      case 'week': {
        const firstDay = new Date(now);
        const currentDay = firstDay.getDay();
        const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

        firstDay.setDate(firstDay.getDate() + diffToMonday);

        return {
          from: formatDate(firstDay),
          to: todayStr,
        };
      }

      case 'month': {
        const firstDayMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        return {
          from: formatDate(firstDayMonth),
          to: todayStr,
        };
      }

      case 'all':
        return {
          from: '2000-01-01',
          to: todayStr,
        };

      case 'custom':
      default:
        return null;
    }
  };

  const handlePeriodClick = (id: PeriodId) => {
    setSelectedId(id);

    const calculated = calculateDates(id);

    if (calculated) {
      setDateFrom(calculated.from);
      setDateTo(calculated.to);
    }
  };

  const applyPeriod = async () => {
    const calculated = calculateDates(selectedId);

    const finalFrom = calculated ? calculated.from : dateFrom;
    const finalTo = calculated ? calculated.to : dateTo;

    const url = new URL('http://localhost:5000/api/transactions');
    url.searchParams.append('dateFrom', finalFrom);
    url.searchParams.append('dateTo', finalTo);
    url.searchParams.append('sortBy', 'date');
    url.searchParams.append('order', 'desc');
    url.searchParams.append('limit', '50');

    try {
      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error('Ошибка сети');
      }

      const result = await response.json();

      onDataLoaded(result);
    } catch (error) {
      console.error('Ошибка при загрузке периода:', error);
    }
  };

  return (
    <section className="panel periods-card period-selector">
      <h2 className="section-title period-title period-selector__title">Периоды</h2>

      <div className="period-selector__chips" aria-label="Выбор периода">
        {periods.map((period) => (
          <button
            key={period.id}
            type="button"
            className={`period-chip period-selector__chip ${
              selectedId === period.id ? 'active' : ''
            }`}
            onClick={() => handlePeriodClick(period.id)}
          >
            {period.label}
          </button>
        ))}
      </div>

      <div className="period-selector__date-row">
        <label className="period-selector__date-pill">
          <span>С</span>
          <input
            type="date"
            value={dateFrom}
            onChange={(event) => {
              setSelectedId('custom');
              setDateFrom(event.target.value);
            }}
          />
        </label>

        <span className="period-selector__date-separator">—</span>

        <label className="period-selector__date-pill">
          <span>По</span>
          <input
            type="date"
            value={dateTo}
            onChange={(event) => {
              setSelectedId('custom');
              setDateTo(event.target.value);
            }}
          />
        </label>
      </div>

      <button
        type="button"
        className="action-light period-selector__apply"
        onClick={applyPeriod}
      >
        Применить
      </button>
    </section>
  );
};

export default PeriodSelector;
