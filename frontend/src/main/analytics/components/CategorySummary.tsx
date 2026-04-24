import type { CategoryItem } from '../data';

type CategorySummaryProps = {
  title: string;
  items: CategoryItem[];
};

export function CategorySummary({
  title,
  items,
}: CategorySummaryProps) {
  return (
    <div className="analytics-block">
      <h2 className="section-title" style={{ marginBottom: 12 }}>
        {title}
      </h2>
      <div className="table-lines">
        {items.map((item) => (
          <div key={`${title}-${item.name}`} className="table-row">
            <span>{item.name}</span>
            <span className={`table-value ${item.tone}`}>{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
