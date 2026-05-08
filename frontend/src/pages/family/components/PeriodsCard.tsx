import { useState, type CSSProperties } from 'react';

const periods = ['Все время', 'Сегодня', 'Эта неделя', 'Этот месяц', 'Свой период'];

const dateInputStyle: CSSProperties = {
  maxWidth: '150px',
  minHeight: '42px',
  border: '0',
  borderRadius: '999px',
  padding: '0 14px',
  background: 'rgba(255, 255, 255, 0.72)',
  color: '#19334d',
  font: 'inherit',
};

const appliedStyle: CSSProperties = {
  color: '#5f7488',
  fontSize: '13px',
  fontWeight: 700,
};

export function PeriodsCard() {
  const [selectedPeriod, setSelectedPeriod] = useState('Свой период');
  const [dateFrom, setDateFrom] = useState('2026-03-23');
  const [dateTo, setDateTo] = useState('2026-05-04');
  const [appliedPeriod, setAppliedPeriod] = useState('');

  const applyPeriod = () => {
    setAppliedPeriod(`${selectedPeriod}: ${dateFrom} — ${dateTo}`);
  };

  return (
    <section className="panel period-panel">
      <div className="section-heading">
        <h2>Периоды</h2>
      </div>

      <div className="period-chips">
        {periods.map((period) => (
          <button
            key={period}
            className={`period-chip ${selectedPeriod === period ? 'active' : ''}`}
            type="button"
            onClick={() => {
              setSelectedPeriod(period);
              setAppliedPeriod('');
            }}
          >
            {period}
          </button>
        ))}
      </div>

      <div className="date-row">
        <input
          aria-label="Дата начала"
          style={dateInputStyle}
          type="date"
          value={dateFrom}
          onChange={(event) => setDateFrom(event.target.value)}
        />
        <span>–</span>
        <input
          aria-label="Дата окончания"
          style={dateInputStyle}
          type="date"
          value={dateTo}
          onChange={(event) => setDateTo(event.target.value)}
        />
        <button className="action-light" type="button" onClick={applyPeriod}>
          Применить
        </button>
      </div>

      {appliedPeriod && <span style={appliedStyle}>Выбран период: {appliedPeriod}</span>}
    </section>
  );
}
