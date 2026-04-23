import React from 'react';

interface StatsProps {
  balance: string;
  income: string;
  expenses: string;
}

const StatsCards: React.FC<StatsProps> = ({ balance, income, expenses }) => (
  <div className="stats-row">
    <section className="panel stat-card">
      <div className="stat-label">Баланс за период</div>
      <div className="stat-value">{balance}</div>
    </section>
    <section className="panel stat-card">
      <div className="stat-label">Доходы</div>
      <div className="stat-value green">{income}</div>
    </section>
    <section className="panel stat-card">
      <div className="stat-label">Расходы</div>
      <div className="stat-value red">{expenses}</div>
    </section>
  </div>
);

export default StatsCards;