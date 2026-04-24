import type { PeriodOption } from '../data';

type PeriodFilterProps = {
  periods: PeriodOption[];
  from: string;
  to: string;
  applyHref: string;
};

export function PeriodFilter({
  periods,
  from,
  to,
  applyHref,
}: PeriodFilterProps) {
  return (
    <div className="analytics-block">
      <h2 className="section-title period-title">Периоды</h2>
      <div className="chips-row">
        {periods.map((period) => (
          <a
            key={period.id}
            className={period.active ? 'period-chip active' : 'period-chip'}
            href={period.href}
          >
            {period.label}
          </a>
        ))}
      </div>
      <div className="dates-row" style={{ marginTop: 18 }}>
        <div className="date-field">{from}</div>
        <div className="date-dash">–</div>
        <div className="date-field">{to}</div>
        <a className="action-light" href={applyHref}>
          Применить
        </a>
      </div>
    </div>
  );
}
