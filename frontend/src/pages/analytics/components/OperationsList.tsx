import { useNavigate } from 'react-router-dom';

import type { OperationItem } from '../data';

type OperationsListProps = {
  count: number;
  operations: OperationItem[];
  showMoreHref: string;
};

function getTargetRoute(href: string) {
  return href && href !== '#' ? href : '/not-ready';
}

export function OperationsList({
  count,
  operations,
  showMoreHref,
}: OperationsListProps) {
  const navigate = useNavigate();

  return (
    <section className="panel list-card analytics-list">
      <div className="list-head">
        <h2 className="section-title" style={{ margin: 0 }}>
          Все операции
        </h2>

        <div className="list-count">{count}</div>
      </div>

      {operations.map((operation) => (
        <div key={operation.id} className="operation-row">
          <div>
            <div className="operation-title">
              <span>{operation.title}</span>
              <span className="tag">{operation.tag}</span>
            </div>

            <div className="operation-date">{operation.date}</div>
          </div>

          <div className={`amount ${operation.tone}`}>{operation.amount}</div>

          <button
            type="button"
            className="kebab"
            aria-label={`Открыть действия для операции ${operation.title}`}
            onClick={() => navigate(getTargetRoute(operation.href))}
          >
            <span></span>
          </button>
        </div>
      ))}

      <button
        type="button"
        className="show-more"
        onClick={() => navigate(getTargetRoute(showMoreHref))}
      >
        Показать больше <span className="caret"></span>
      </button>
    </section>
  );
}