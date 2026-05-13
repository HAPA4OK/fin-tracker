import React, { useState } from 'react';

const periods = [
  { id: 'all', label: 'Все время' },
  { id: 'today', label: 'Сегодня' },
  { id: 'week', label: 'Эта неделя' },
  { id: 'month', label: 'Этот месяц' },
  { id: 'custom', label: 'Свой период' },
];

const dateInputStyle: React.CSSProperties = {
  maxWidth: '150px',
  minHeight: '42px',
  border: '0',
  borderRadius: '999px',
  padding: '0 14px',
  background: 'rgba(255, 255, 255, 0.72)',
  color: '#19334d',
  font: 'inherit',
};

const appliedStyle: React.CSSProperties = {
  color: '#5f7488',
  fontSize: '13px',
  fontWeight: 700,
};

interface PeriodSelectorProps {
  onDataLoaded: (result: any) => void; 
}

// Добавляем деструктуризацию пропсов
const PeriodSelector: React.FC<PeriodSelectorProps> = ({ onDataLoaded }) => {
  const [selectedId, setSelectedId] = useState('custom');
  const [dateFrom, setDateFrom] = useState('2026-03-23');
  const [dateTo, setDateTo] = useState('2026-05-04');
  const [appliedPeriod, setAppliedPeriod] = useState('');

  

  // Чистая функция для мгновенного расчета дат без ожидания стейта
  const calculateDates = (id: string) => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    switch (id) {
      case 'today':
        return { from: todayStr, to: todayStr };
      case 'week': {
        const firstDay = new Date(now.setDate(now.getDate() - now.getDay() + 1));
        return { from: firstDay.toISOString().split('T')[0], to: todayStr };
      }
      case 'month': {
        const firstDayMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return { from: firstDayMonth.toISOString().split('T')[0], to: todayStr };
      }
      case 'all':
        return { from: '2000-01-01', to: todayStr };
      default:
        return null; // Для 'custom' берем данные из текущих инпутов
    }
  };

  const handlePeriodClick = (id: string) => {
    setSelectedId(id);
    setAppliedPeriod('');
    
    const calculated = calculateDates(id);
    if (calculated) {
      setDateFrom(calculated.from);
      setDateTo(calculated.to);
    }
  };

  

  const applyPeriod = async () => {
    // 1. Определяем, какие даты использовать для запроса
    const calculated = calculateDates(selectedId);
    const finalFrom = calculated ? calculated.from : dateFrom;
    const finalTo = calculated ? calculated.to : dateTo;

    // 2. Обновляем визуальный статус
    const label = periods.find(p => p.id === selectedId)?.label;
    setAppliedPeriod(`${label}: ${finalFrom} — ${finalTo}`);

    // 3. Формируем URL с параметрами
    const url = new URL('http://localhost:5000/api/transactions');
    url.searchParams.append('dateFrom', finalFrom);
    url.searchParams.append('dateTo', finalTo);

    try {
      console.log(`Запрос: ${url.toString()}`);
      const response = await fetch(url.toString());
      
      if (!response.ok) throw new Error('Ошибка сети');
      
      const result = await response.json();

      console.log('Данные загружены:', result.data);
      console.log('Статистика периода:', result.stats);
      
      // Здесь можно вызвать функцию обратного вызова, например:
      onDataLoaded(result);
      
    } catch (error) {
      console.error('Ошибка при загрузке:', error);
    }
  };

  return (
    <section className="panel period-panel">
      <div className="section-heading">
        <h2>Периоды</h2>
      </div>

      <div className="period-chips">
        {periods.map((period) => (
          <button
            key={period.id}
            className={`period-chip ${selectedId === period.id ? 'active' : ''}`}
            type="button"
            onClick={() => handlePeriodClick(period.id)}
          >
            {period.label}
          </button>
        ))}
      </div>

      <div className="date-row">
        <input
          aria-label="Дата начала"
          style={dateInputStyle}
          type="date"
          value={dateFrom}
          readOnly={selectedId !== 'custom'}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <span>–</span>
        <input
          aria-label="Дата окончания"
          style={dateInputStyle}
          type="date"
          value={dateTo}
          readOnly={selectedId !== 'custom'}
          onChange={(e) => setDateTo(e.target.value)}
        />
        <button className="action-light" type="button" onClick={applyPeriod}>
          Применить
        </button>
      </div>

      {appliedPeriod && (
        <div style={{ marginTop: '10px' }}>
          <span style={appliedStyle}>Выбран период: {appliedPeriod}</span>
        </div>
      )}
    </section>
  );
};

export default PeriodSelector;