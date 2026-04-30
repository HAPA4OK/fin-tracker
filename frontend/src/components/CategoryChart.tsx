import React from 'react';
import { Link } from 'react-router-dom';


interface ChartData {
  label: string;
  value: string;
  color: string;
}

interface ChartProps {
  title: string;
  total: string;
  data: ChartData[];
  isIncome?: boolean;
}

const CategoryChart: React.FC<ChartProps> = ({ title, total, data, isIncome }) => (
  <section className="panel chart-card">
    <h2 className="section-title" style={{ marginBottom: '12px' }}>{title}</h2>
    <div className="donut-wrap">
      <div className={`donut ${isIncome ? 'income' : ''}`}>
        <div className="donut-center">{total}</div>
      </div>
      <div className="legend">
        {data.map((item, idx) => (
          <div key={idx} className="legend-row">
            <span className={`legend-dot ${item.color}`}></span>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
    <Link className="analytics-link" to="/main/analytics">
        Перейти к детальной аналитике
    </Link>

  </section>
);

export default CategoryChart;