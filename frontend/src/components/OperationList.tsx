import React, { useState } from 'react';

type Operation = {
  id: number;
  title: string;
  tag: string;
  date: string;
  amount: string;
  color: 'green' | 'red';
};

const operations: Operation[] = [
  { id: 1, title: 'Зарплата', tag: 'Зарплата', date: '29.03.2026', amount: '+85 000 ₽', color: 'green' },
  { id: 2, title: 'Продукты', tag: 'Еда', date: '27.03.2026', amount: '-2 000 ₽', color: 'red' },
  { id: 3, title: 'Такси', tag: 'Транспорт', date: '26.03.2026', amount: '-500 ₽', color: 'red' },
  { id: 4, title: 'Проект', tag: 'Проекты', date: '22.03.2026', amount: '+20 000 ₽', color: 'green' },
];

const rowMenuStyle: React.CSSProperties = {
  position: 'absolute',
  right: 0,
  top: '42px',
  width: '190px',
  zIndex: 20,
  padding: '8px',
};

const menuButtonStyle: React.CSSProperties = {
  width: '100%',
  border: 0,
  background: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  padding: '10px 12px',
  textAlign: 'left',
  borderRadius: '12px',
  font: 'inherit',
};

const noticeStyle: React.CSSProperties = {
  marginTop: '12px',
  padding: '12px 14px',
  borderRadius: '16px',
  background: 'rgba(11, 79, 126, 0.08)',
  color: '#0b4f7e',
  fontSize: '14px',
  fontWeight: 700,
};

const OperationsList: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeOperationId, setActiveOperationId] = useState<number | null>(null);
  const [notice, setNotice] = useState('');

  const visibleOperations = expanded ? operations : operations.slice(0, 2);

  const handleAction = (action: string, operation: Operation) => {
    setNotice(`${action}: ${operation.title}`);
    setActiveOperationId(null);
  };

  return (
    <section className="panel operations-panel">
      <div className="section-heading">
        <h2>Все операции</h2>
        <span className="list-count">{operations.length}</span>
      </div>

      <div className="operations-list">
        {visibleOperations.map((op) => (
          <div className="operation-row" style={{ position: 'relative' }} key={op.id}>
            <div>
              <strong>{op.title}</strong>
              <span>{op.tag}</span>
            </div>

            <span>{op.date}</span>
            <strong className={op.color}>{op.amount}</strong>

            <button
              className="kebab"
              type="button"
              onClick={() => {
                setActiveOperationId((current) => (current === op.id ? null : op.id));
                setNotice('');
              }}
              aria-label={`Открыть действия для операции ${op.title}`}
            >
              ⋯
            </button>

            {activeOperationId === op.id && (
              <div className="dropdown" style={rowMenuStyle} role="menu">
                <button type="button" style={menuButtonStyle} onClick={() => handleAction('Редактирование выбрано', op)}>
                  Редактировать
                </button>
                <button type="button" style={menuButtonStyle} onClick={() => handleAction('Повтор операции выбран', op)}>
                  Повторить
                </button>
                <button type="button" style={menuButtonStyle} onClick={() => handleAction('Удаление выбрано', op)}>
                  Удалить
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {notice && <div style={noticeStyle}>{notice}</div>}

      <button
        className="show-more"
        type="button"
        onClick={() => {
          setExpanded((value) => !value);
          setActiveOperationId(null);
          setNotice('');
        }}
      >
        {expanded ? 'Свернуть' : 'Показать больше'}
      </button>
    </section>
  );
};

export default OperationsList;
