import React from 'react';

const OperationsList: React.FC = () => {
  const operations = [
    { id: 1, title: 'Зарплата', tag: 'Зарплата', date: '29.03.2026', amount: '+85 000 ₽', color: 'green' },
    { id: 2, title: 'Продукты', tag: 'Еда', date: '27.03.2026', amount: '-2 000 ₽', color: 'red' },
  ];

  return (
    <section className="panel list-card">
      <div className="list-head">
        <h2 className="section-title" style={{ margin: 0 }}>Все операции</h2>
        <div className="list-count">{operations.length}</div>
      </div>
      {operations.map((op) => (
        <div key={op.id} className="operation-row">
          <div>
            <div className="operation-title">
              <span>{op.title}</span><span className="tag">{op.tag}</span>
            </div>
            <div className="operation-date">{op.date}</div>
          </div>
          <div className={`amount ${op.color}`}>{op.amount}</div>
          <a className="kebab" href="#"><span></span></a>
        </div>
      ))}
      <a className="show-more" href="#">Показать больше <span className="caret"></span></a>
    </section>
  );
};

export default OperationsList;