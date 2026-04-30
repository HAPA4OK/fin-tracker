import type { ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';

import Dashboard from './dashboard.tsx';
import Register from './register/register.tsx';
import SignedUp from './login/login.tsx';

import Header from './components/Header.tsx';
import OperationForm from './components/OperationForm.tsx';
import OperationsList from './components/OperationList.tsx';
import CategoryChart from './components/CategoryChart.tsx';
import PeriodSelector from './components/PeriodSelector.tsx';
import StatsCards from './components/StatsCards.tsx';

import AnalyticsPage from './pages/analytics/AnalyticsPage.tsx';
import AdminUploadPage from './pages/admin/AdminUploadPage.tsx';

import FamilyMenuPage from './pages/family/pages/FamilyMenuPage.tsx';
import FamilyPromptPage from './pages/family/pages/FamilyPromptPage.tsx';
import FamilyCreateModalPage from './pages/family/pages/FamilyCreateModalPage.tsx';
import FamilySettingsPage from './pages/family/pages/FamilySettingsPage.tsx';

import InvitationsPage from './pages/account/pages/InvitationsPage.tsx';
import ProfileSettingsPage from './pages/account/pages/ProfileSettingsPage.tsx';

type AppRoute = {
  path: string;
  element: ReactNode;
};

const MainPage = () => (
  <div className="body-dim">
    <div className="app-shell">
      <Header userName="Олег Зуев" />

      <main className="dashboard-grid">
        <div className="left-stack">
          <PeriodSelector />
          <StatsCards balance="92 000 ₽" income="110 000 ₽" expenses="22 000 ₽" />
          <OperationForm />
          <OperationsList />
        </div>

        <div className="right-stack">
          <CategoryChart title="Расходы по категориям" total="22 000 ₽" data={[]} />
          <CategoryChart title="Доходы по категориям" total="22 000 ₽" isIncome data={[]} />
        </div>
      </main>

      <footer className="panel footer">© 2025 Финансовый трекер</footer>
    </div>
  </div>
);

const NotReadyPage = () => (
  <div className="body-dim">
    <div className="app-shell">
      <div className="panel not-ready-card">
        <h1>Раздел пока не готов</h1>
        <p>Эта функция будет добавлена позже.</p>
        <a className="primary-button not-ready-link" href="/main">
          Вернуться на главную
        </a>
      </div>
    </div>
  </div>
);

const publicRoutes: AppRoute[] = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <SignedUp />,
  },
];

const mainRoutes: AppRoute[] = [
  {
    path: '/main',
    element: <MainPage />,
  },
  {
    path: '/main/analytics',
    element: <AnalyticsPage />,
  },
  {
    path: '/analytics',
    element: <Navigate to="/main/analytics" replace />,
  },
  {
    path: '/main-menu',
    element: <Navigate to="/menu" replace />,
  },
  {
    path: '/menu',
    element: <Navigate to="/main" replace />,
  },
];

const adminRoutes: AppRoute[] = [
  {
    path: '/admin/upload',
    element: <AdminUploadPage />,
  },
];

const familyRoutes: AppRoute[] = [
  {
    path: '/family',
    element: <FamilyMenuPage />,
  },
  {
    path: '/family/main',
    element: <Navigate to="/family" replace />,
  },
  {
    path: '/family/prompt',
    element: <FamilyPromptPage />,
  },
  {
    path: '/family/create',
    element: <FamilyCreateModalPage />,
  },
  {
    path: '/family/settings',
    element: <FamilySettingsPage />,
  },
];

const accountRoutes: AppRoute[] = [
  {
    path: '/account/invitations',
    element: <InvitationsPage />,
  },
  {
    path: '/account/profile-settings',
    element: <ProfileSettingsPage />,
  },
  {
    path: '/invitations',
    element: <InvitationsPage />,
  },
  {
    path: '/profile/settings',
    element: <ProfileSettingsPage />,
  },
  {
    path: '/account',
    element: <Navigate to="/invitations" replace />,
  },
  {
    path: '/profile-settings',
    element: <Navigate to="/profile/settings" replace />,
  },
  {
    path: '/account2',
    element: <Navigate to="/profile/settings" replace />,
  },
];

const systemRoutes: AppRoute[] = [
  {
    path: '/not-ready',
    element: <NotReadyPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

const groupedRoutes: AppRoute[] = [
  ...publicRoutes,
  ...mainRoutes,
  ...adminRoutes,
  ...familyRoutes,
  ...accountRoutes,
  ...systemRoutes,
];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {groupedRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
