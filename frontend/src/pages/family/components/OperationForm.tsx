import { useState, type CSSProperties } from 'react';

const modalBackdropStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  display: 'grid',
  placeItems: 'center',
  padding: '24px',
  background: 'rgba(25, 51, 77, 0.28)',
  backdropFilter: 'blur(6px)',
};

const modalStyle: CSSProperties = {
  width: 'min(420px, 100%)',
  padding: '28px',
  display: 'grid',
  gap: '14px',
};

const modalTitleStyle: CSSProperties = {
  margin: 0,
  color: '#19334d',
  fontSize: '24px',
};

const modalTextStyle: CSSProperties = {
  margin: 0,
  color: '#5f7488',
  lineHeight: 1.5,
};

export function OperationForm() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Доход');
  const [category, setCategory] = useState('Зарплата');
  const [date, setDate] = useState('2026-03-29');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="panel form-panel">
      <div className="section-heading">
        <h2>Новая операция</h2>
      </div>

      <label>
        Описание
        <input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Например: зарплата" />
      </label>

      <label>
        Сумма (₽)
        <input value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="85000" inputMode="numeric" />
      </label>

      <div className="form-row">
        <label>
          Тип
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option>Доход</option>
            <option>Расход</option>
          </select>
        </label>

        <label>
          Категория
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option>Зарплата</option>
            <option>Проекты</option>
            <option>Еда</option>
            <option>Транспорт</option>
            <option>Развлечения</option>
          </select>
        </label>
      </div>

      <label>
        Дата
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
      </label>

      <button className="primary-button" type="button" onClick={handleSubmit}>
        ＋ Добавить операцию
      </button>

      {isModalOpen && (
        <div style={modalBackdropStyle} role="dialog" aria-modal="true" aria-labelledby="family-operation-modal-title">
          <div className="panel" style={modalStyle}>
            <h3 id="family-operation-modal-title" style={modalTitleStyle}>
              Операция добавлена в черновик
            </h3>
            <p style={modalTextStyle}>
              {description || 'Новая операция'} — {amount || '0'} ₽, тип: {type.toLowerCase()}, категория: {category}.
            </p>
            <button className="primary-button" type="button" onClick={() => setIsModalOpen(false)}>
              Понятно
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
