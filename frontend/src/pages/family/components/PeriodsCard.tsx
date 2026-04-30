import { Link } from 'react-router-dom';

export function PeriodsCard() {
  return (
    <section className="panel periods-card">
      <h2 className="section-title period-title">Периоды</h2>

      <div className="chips-row">
        <Link className="period-chip" to="/not-ready">Все время</Link>
        <Link className="period-chip" to="/not-ready">Сегодня</Link>
        <Link className="period-chip" to="/not-ready">Эта неделя</Link>
        <Link className="period-chip" to="/not-ready">Этот месяц</Link>
        <Link className="period-chip active" to="/not-ready">Свой период</Link>
      </div>

      <div className="dates-row" style={{ marginTop: 18 }}>
        <div className="date-field">23.03.2026</div>
        <div className="date-dash">–</div>
        <div className="date-field">04.05.2026</div>

        <Link className="action-light" to="/not-ready">Применить</Link>
      </div>
    </section>
  );
}
