export function StatsRow() {
  return (
    <div className="stats-row">
      <section className="panel stat-card">
        <div className="stat-label">Баланс за период</div>
        <div className="stat-value">92 000 ₽</div>
      </section>
      <section className="panel stat-card">
        <div className="stat-label">Доходы</div>
        <div className="stat-value green">110 000 ₽</div>
      </section>
      <section className="panel stat-card">
        <div className="stat-label">Расходы</div>
        <div className="stat-value red">22 000 ₽</div>
      </section>
    </div>
  );
}
