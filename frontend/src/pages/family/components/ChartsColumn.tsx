import { expenseLegend, incomeLegend } from '../data/charts';
import { CategoryChart } from './CategoryChart';

export function ChartsColumn() {
  return (
    <div className="right-stack">
      <CategoryChart title="Расходы по категориям" total="22 000 ₽" legend={expenseLegend} />
      <CategoryChart title="Доходы по категориям" total="22 000 ₽" variant="income" legend={incomeLegend} />
    </div>
  );
}
