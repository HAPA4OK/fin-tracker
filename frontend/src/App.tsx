import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './dashboard.tsx';
import Register from './register/register.tsx';
import SignedUp from'./login/login.tsx';
import AnalyticsPage from './main/analytics/AnalyticsPage.tsx';
import './App.css';


import Header from './components/Header.tsx';
import OperationForm from './components/OperationForm.tsx';
import OperationsList from './components/OperationList.tsx';
import CategoryChart from './components/CategoryChart.tsx';
import PeriodSelector from './components/PeriodSelector.tsx';
import StatsCards from './components/StatsCards.tsx';


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




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        <Route path="/register" element={<Register />} />
        
        <Route path="/login" element={<SignedUp />} />

        <Route path="/main" element={<MainPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}