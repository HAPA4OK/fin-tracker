import { ChartsColumn } from './ChartsColumn';
import { Footer } from './Footer';
import { Header, type HeaderMode } from './Header';
import { LeftDashboardColumn } from './LeftDashboardColumn';

type DashboardLayoutProps = {
  headerMode: HeaderMode;
};

export function DashboardLayout({ headerMode }: DashboardLayoutProps) {
  return (
    <div className="app-shell">
      <Header mode={headerMode} />
      <div className="dashboard-grid">
        <LeftDashboardColumn />
        <ChartsColumn />
      </div>
      <Footer />
    </div>
  );
}
