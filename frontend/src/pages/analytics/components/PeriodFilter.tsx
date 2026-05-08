import { useNavigate } from 'react-router-dom';

import type { PeriodOption } from '../data';

type PeriodFilterProps = {
  periods: PeriodOption[];
  from: string;
  to: string;
  applyHref: string;
};

function getTargetRoute(href: string) {
  return href && href !== '#' ? href : '/not-ready';
}

export function PeriodFilter({
  periods,
  from,
  to,
  applyHref,
}: PeriodFilterProps) {
  const navigate = useNavigate();

  return (
    <div className="analytics-block">
      <h2 className="section-title period-title">Периоды</h2>

      <div className="chips-row">
        {periods.map((period) => (
          <button
            key={period.id}
            type="button"
            className={period.active ? 'period-chip active' : 'period-chip'}
            onClick={() => navigate(getTargetRoute(period.href))}
          >
            {period.label}
          </button>
        ))}
      </div>

      <div className="dates-row" style={{ marginTop: 18 }}>
        <div className="date-field">{from}</div>
        <div className="date-dash">–</div>
        <div className="date-field">{to}</div>

        <button
          type="button"
          className="action-light"
          onClick={() => navigate(getTargetRoute(applyHref))}
        >
          Применить
        </button>
      </div>
    </div>
  );
}