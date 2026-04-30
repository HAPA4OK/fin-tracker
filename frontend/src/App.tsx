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

import {
  FamilyMenuPage,
  FamilyPromptPage,
  FamilyCreateModalPage,
  FamilySettingsPage,
} from './pages/family';

import {
  InvitationsPage,
  ProfileSettingsPage,
} from './pages/account';

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
      <div className="panel" style={{ padding: 24 }}>
        <h1>Раздел пока не готов</h1>
        <p>Эта страница будет добавлена позже.</p>
      </div>
    </div>
  </div>
);

/**
 * Публичные страницы
 */
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

/**
 * Основной экран приложения
 */
const mainRoutes: AppRoute[] = [
  {
    path: '/main',
    element: <MainPage />,
  },
  {
    path: '/main/analytics',
    element: <AnalyticsPage />,
  },

  // Алиас из family/routes.ts
  {
    path: '/analytics',
    element: <Navigate to="/main/analytics" replace />,
  },

  // В Header сейчас есть href="/main-menu", поэтому оставил редирект.
  {
    path: '/main-menu',
    element: <Navigate to="/menu" replace />,
  },
  {
    path: '/menu',
    element: <Navigate to="/main" replace />,
  },
];

/**
 * Админка
 */
const adminRoutes: AppRoute[] = [
  {
    path: '/admin/upload',
    element: <AdminUploadPage />,
  },
];

/**
 * Семья
 */
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

/**
 * Аккаунт
 */
const accountRoutes: AppRoute[] = [
  {
    path: '/account/invitations',
    element: <InvitationsPage />,
  },
  {
    path: '/account/profile-settings',
    element: <ProfileSettingsPage />,
  },

  // Алиасы из src/pages/account/routes.ts и routes-example.tsx
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

/**
 * Системные маршруты
 */
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