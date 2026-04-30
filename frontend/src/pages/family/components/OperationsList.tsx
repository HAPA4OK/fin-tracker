import { Link } from 'react-router-dom';

import { operations } from '../data/operations';

export function OperationsList() {
  return (
    <section className="panel list-card">
      <div className="list-head">
        <h2 className="section-title" style={{ margin: 0 }}>Все операции</h2>
        <div className="list-count">29</div>
      </div>

      {operations.map((operation, index) => (
        <div className="operation-row" key={`${operation.title}-${operation.date}-${index}`}>
          <div>
            <div className="operation-title">
              <span>{operation.title}</span>
              <span className="tag">{operation.tag}</span>
            </div>

            <div className="operation-date">{operation.date}</div>
          </div>

          <div className={`amount ${operation.color}`}>{operation.amount}</div>

          <Link className="kebab" to="/not-ready"><span></span></Link>
        </div>
      ))}

      <Link className="show-more" to="/not-ready">
        Показать больше <span className="caret"></span>
      </Link>
    </section>
  );
}
