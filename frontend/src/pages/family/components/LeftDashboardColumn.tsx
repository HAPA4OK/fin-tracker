import { OperationForm } from './OperationForm';
import { OperationsList } from './OperationsList';
import { PeriodsCard } from './PeriodsCard';
import { StatsRow } from './StatsRow';

export function LeftDashboardColumn() {
  return (
    <div className="left-stack">
      <PeriodsCard />
      <StatsRow />
      <OperationForm />
      <OperationsList />
    </div>
  );
}
