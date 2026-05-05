import { useState, type CSSProperties } from 'react';

import { operations, type Operation } from '../data/operations';

const rowMenuStyle: CSSProperties = {
  position: 'absolute',
  right: 0,
  top: '42px',
  width: '190px',
  zIndex: 20,
  padding: '8px',
};

const menuButtonStyle: CSSProperties = {
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

const noticeStyle: CSSProperties = {
  marginTop: '12px',
  padding: '12px 14px',
  borderRadius: '16px',
  background: 'rgba(11, 79, 126, 0.08)',
  color: '#0b4f7e',
  fontSize: '14px',
  fontWeight: 700,
};

export function OperationsList() {
  const [expanded, setExpanded] = useState(false);
  const [activeOperationIndex, setActiveOperationIndex] = useState<number | null>(null);
  const [notice, setNotice] = useState('');

  const visibleOperations = expanded ? operations : operations.slice(0, 4);

  const handleAction = (action: string, operation: Operation) => {
    setNotice(`${action}: ${operation.title}`);
    setActiveOperationIndex(null);
  };

  return (
    <section className="panel operations-panel">
      <div className="section-heading">
        <h2>Все операции</h2>
        <span className="list-count">{operations.length}</span>
      </div>

      <div className="operations-list">
        {visibleOperations.map((operation, index) => (
          <div className="operation-row" style={{ position: 'relative' }} key={`${operation.title}-${operation.date}-${index}`}>
            <div>
              <strong>{operation.title}</strong>
              <span>{operation.tag}</span>
            </div>

            <span>{operation.date}</span>
            <strong className={operation.color}>{operation.amount}</strong>

            <button
              className="kebab"
              type="button"
              onClick={() => {
                setActiveOperationIndex((current) => (current === index ? null : index));
                setNotice('');
              }}
              aria-label={`Открыть действия для операции ${operation.title}`}
            >
              ⋯
            </button>

            {activeOperationIndex === index && (
              <div className="dropdown" style={rowMenuStyle} role="menu">
                <button type="button" style={menuButtonStyle} onClick={() => handleAction('Редактирование выбрано', operation)}>
                  Редактировать
                </button>
                <button type="button" style={menuButtonStyle} onClick={() => handleAction('Повтор операции выбран', operation)}>
                  Повторить
                </button>
                <button type="button" style={menuButtonStyle} onClick={() => handleAction('Удаление выбрано', operation)}>
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
          setActiveOperationIndex(null);
          setNotice('');
        }}
      >
        {expanded ? 'Свернуть' : 'Показать больше'}
      </button>
    </section>
  );
}
