import React from 'react';

const PeriodSelector: React.FC = () => (
  <section className="panel periods-card">
    <h2 className="section-title period-title">Периоды</h2>
    <div className="chips-row">
      {['Все время', 'Сегодня', 'Эта неделя', 'Этот месяц'].map((p) => (
        <a key={p} className="period-chip" href="#">{p}</a>
      ))}
      <a className="period-chip active" href="#">Свой период</a>
    </div>
    <div className="dates-row" style={{ marginTop: '18px' }}>
      <div className="date-field">23.03.2026</div>
      <div className="date-dash">–</div>
      <div className="date-field">04.05.2026</div>
      <a className="action-light" href="#">Применить</a>
    </div>
  </section>
);

export default PeriodSelector;