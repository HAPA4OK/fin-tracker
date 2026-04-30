import React from 'react';
import { useNavigate } from 'react-router-dom';

const PeriodSelector: React.FC = () => {
  const navigate = useNavigate();

  const openNotReady = () => {
    navigate('/not-ready');
  };

  return (
    <section className="panel periods-card">
      <h2 className="section-title period-title">Периоды</h2>

      <div className="chips-row">
        {['Все время', 'Сегодня', 'Эта неделя', 'Этот месяц'].map((p) => (
          <button
            key={p}
            type="button"
            className="period-chip"
            onClick={openNotReady}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          className="period-chip active"
          onClick={openNotReady}
        >
          Свой период
        </button>
      </div>

      <div className="dates-row" style={{ marginTop: '18px' }}>
        <div className="date-field">23.03.2026</div>
        <div className="date-dash">–</div>
        <div className="date-field">04.05.2026</div>

        <button
          type="button"
          className="action-light"
          onClick={openNotReady}
        >
          Применить
        </button>
      </div>
    </section>
  );
};

export default PeriodSelector;