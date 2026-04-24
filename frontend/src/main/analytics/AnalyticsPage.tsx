import { analyticsData } from './data';
import { AnalyticsHeader } from './components/AnalyticsHeader';
import { ViewToggle } from './components/ViewToggle';
import { PeriodFilter } from './components/PeriodFilter';
import { StatsGrid } from './components/StatsGrid';
import { CategorySummary } from './components/CategorySummary';
import { OperationsList } from './components/OperationsList';
import { ExportButton } from './components/ExportButton';

import '../../App.css';

export default function AnalyticsPage() {
  const {
    title,
    subtitle,
    views,
    periods,
    dateRange,
    stats,
    expenseCategories,
    incomeCategories,
    operationsCount,
    operations,
    showMoreHref,
    exportHref,
  } = analyticsData;

  return (
    <div className="center-page">
      <section className="analytics-sheet">
        <AnalyticsHeader
          title={title}
          subtitle={subtitle}
        />
        <ViewToggle views={views} />
        <div className="analytics-stack">
          <PeriodFilter
            periods={periods}
            from={dateRange.from}
            to={dateRange.to}
            applyHref={dateRange.applyHref}
          />
          <StatsGrid stats={stats} />
          <CategorySummary
            title="Расходы по категориям"
            items={expenseCategories}
          />
          <CategorySummary
            title="Доходы по категориям"
            items={incomeCategories}
          />
          <OperationsList
            count={operationsCount}
            operations={operations}
            showMoreHref={showMoreHref}
          />
        </div>
        <ExportButton href={exportHref} />
      </section>
    </div>
  );
}
