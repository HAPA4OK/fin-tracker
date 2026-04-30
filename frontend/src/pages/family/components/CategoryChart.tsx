import { Link } from 'react-router-dom';
import type { LegendItem } from '../data/charts';
import { routes } from '../routes';

type CategoryChartProps = {
  title: string;
  total: string;
  variant?: 'expense' | 'income';
  legend: LegendItem[];
};

export function CategoryChart({ title, total, variant = 'expense', legend }: CategoryChartProps) {
  const donutClassName = variant === 'income' ? 'donut income' : 'donut';

  return (
    <section className="panel chart-card">
      <h2 className="section-title" style={{ marginBottom: 12 }}>{title}</h2>
      <div className="donut-wrap">
        <div className={donutClassName}>
          <div className="donut-center">{total}</div>
        </div>
        <div className="legend">
          {legend.map((item) => (
            <div className="legend-row" key={item.label}>
              <span className={`legend-dot ${item.dotClass}`}></span>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
      <Link className="analytics-link" to={routes.analytics}>Перейти к детальной аналитике</Link>
    </section>
  );
}
