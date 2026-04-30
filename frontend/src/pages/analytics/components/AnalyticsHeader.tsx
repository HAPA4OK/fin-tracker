import { Link } from 'react-router-dom';

type AnalyticsHeaderProps = {
  title: string;
  subtitle: string;
};

export function AnalyticsHeader({
  title,
  subtitle,
}: AnalyticsHeaderProps) {
  return (
    <>
      <Link className="close-link" to="/main">
        ×
      </Link>
      <h1 className="analytics-header-title">{title}</h1>
      <div className="analytics-subtitle">{subtitle}</div>
    </>
  );
}
