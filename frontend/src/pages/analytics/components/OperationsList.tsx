import type { OperationItem } from '../data';

type OperationsListProps = {
  count: number;
  operations: OperationItem[];
  showMoreHref: string;
};

export function OperationsList({
  count,
  operations,
  showMoreHref,
}: OperationsListProps) {
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
          <a className="kebab" href={operation.href}>
            <span></span>
          </a>
        </div>
      ))}
      <a className="show-more" href={showMoreHref}>
        Показать больше <span className="caret"></span>
      </a>
    </section>
  );
}
