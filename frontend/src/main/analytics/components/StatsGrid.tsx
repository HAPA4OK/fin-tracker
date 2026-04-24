import type { StatItem } from '../data';

type StatsGridProps = {
  stats: StatItem[];
};

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="stats-row" style={{ marginTop: 0 }}>
      {stats.map((item) => (
        <section key={item.label} className="panel stat-card">
          <div className="stat-label">{item.label}</div>
          <div className={item.tone ? `stat-value ${item.tone}` : 'stat-value'}>
            {item.value}
          </div>
        </section>
      ))}
    </div>
  );
}
