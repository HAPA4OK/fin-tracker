import { Link } from 'react-router-dom';

export function OperationForm() {
  return (
    <section className="panel form-card">
      <h2 className="section-title">Новая операция</h2>

      <div className="field-grid">
        <div className="field full">
          <label className="field-label">Описание</label>
          <input className="input-like" placeholder="Например: Продукты, Зарплата" />
        </div>

        <div className="field">
          <label className="field-label">Сумма (₽)</label>
          <input className="input-like" placeholder="0" />
        </div>

        <div className="field">
          <label className="field-label">Тип</label>
          <select className="select-like">
            <option>Доход</option>
          </select>
        </div>

        <div className="field">
          <label className="field-label">Категория</label>
          <select className="select-like">
            <option>Зарплата</option>
          </select>
        </div>

        <div className="field">
          <label className="field-label">Дата</label>
          <select className="select-like">
            <option>29.03.2026</option>
          </select>
        </div>
      </div>

      <div className="margin-top-22">
        <Link className="primary-button" to="/not-ready">
          <span className="plus">＋</span>
          <span>Добавить операцию</span>
        </Link>
      </div>
    </section>
  );
}
