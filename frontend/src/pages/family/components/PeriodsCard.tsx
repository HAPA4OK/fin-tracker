import { Link } from 'react-router-dom';
import { routes } from '../routes';

export function PeriodsCard() {
  return (
    <section className="panel periods-card">
      <h2 className="section-title period-title">Периоды</h2>
      <div className="chips-row">
        <Link className="period-chip" to={routes.notReady}>Все время</Link>
        <Link className="period-chip" to={routes.notReady}>Сегодня</Link>
        <Link className="period-chip" to={routes.notReady}>Эта неделя</Link>
        <Link className="period-chip" to={routes.notReady}>Этот месяц</Link>
        <Link className="period-chip active" to={routes.notReady}>Свой период</Link>
      </div>
      <div className="dates-row" style={{ marginTop: 18 }}>
        <div className="date-field">23.03.2026</div>
        <div className="date-dash">–</div>
        <div className="date-field">04.05.2026</div>
        <Link className="action-light" to={routes.notReady}>Применить</Link>
      </div>
    </section>
  );
}
