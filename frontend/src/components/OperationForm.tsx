import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

type OperationType = 'income' | 'expense';

type CreatedTransaction = {
  _id: string;
  amount: number;
  date: string;
  category?: string;
  categoryInfo?: string;
  bank?: string;
  commentary?: string;
};

type OperationFormProps = {
  onCreated?: (transaction: CreatedTransaction) => void;
};

const categoryOptions = [
  { value: 'salary', label: 'Зарплата' },
  { value: 'products', label: 'Еда' },
  { value: 'transfers', label: 'Переводы' },
  { value: 'transport', label: 'Транспорт' },
  { value: 'restaurant', label: 'Рестораны' },
  { value: 'services', label: 'Услуги' },
  { value: 'cash', label: 'Наличные' },
  { value: 'others', label: 'Другое' },
];

const today = () => new Date().toISOString().slice(0, 10);

const getDefaultCategory = (type: OperationType) => (type === 'income' ? 'salary' : 'products');

const OperationForm: React.FC<OperationFormProps> = ({ onCreated }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('0');
  const [type, setType] = useState<OperationType>('income');
  const [categoryInfo, setCategoryInfo] = useState(getDefaultCategory('income'));
  const [date, setDate] = useState(today());
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const handleTypeChange = (nextType: OperationType) => {
    setType(nextType);

    if (
      (nextType === 'income' && categoryInfo !== 'salary') ||
      (nextType === 'expense' && categoryInfo === 'salary')
    ) {
      setCategoryInfo(getDefaultCategory(nextType));
    }
  };

  const resetForm = () => {
    setDescription('');
    setAmount('0');
    setType('income');
    setCategoryInfo(getDefaultCategory('income'));
    setDate(today());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice('');

    const numericAmount = Number(String(amount).replace(',', '.'));

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setNotice('Введите сумму больше нуля');
      return;
    }

    const finalAmount = type === 'income' ? numericAmount : -numericAmount;
    const selectedCategoryLabel =
      categoryOptions.find((category) => category.value === categoryInfo)?.label || 'Операция';

    const payload = {
      date,
      amount: finalAmount,
      category: categoryInfo,
      categoryInfo,
      bank: 'Ручная операция',
      commentary: description.trim() || selectedCategoryLabel,
    };

    setIsSaving(true);

    try {
      const response = await fetch(`${API_URL}/api/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorResult = await response.json().catch(() => null);
        throw new Error(errorResult?.message || 'Не удалось добавить операцию');
      }

      const result = await response.json();
      const createdTransaction = result.data || result;

      setNotice('Операция добавлена');
      resetForm();

      if (createdTransaction?._id) {
        onCreated?.(createdTransaction);
      }

      window.dispatchEvent(
        new CustomEvent('transactions:changed', {
          detail: createdTransaction,
        }),
      );
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Не удалось добавить операцию');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="panel form-card">
      <h2 className="section-title">Новая операция</h2>

      <form onSubmit={handleSubmit}>
        <div className="field-grid">
          <label className="field full">
            <span className="field-label">Описание</span>
            <input
              className="input-like"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Например: Продукты, Зарплата"
            />
          </label>

          <label className="field">
            <span className="field-label">Сумма (₽)</span>
            <input
              className="input-like"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Тип</span>
            <select
              className="select-like"
              value={type}
              onChange={(event) => handleTypeChange(event.target.value as OperationType)}
            >
              <option value="income">Доход</option>
              <option value="expense">Расход</option>
            </select>
          </label>

          <label className="field">
            <span className="field-label">Категория</span>
            <select
              className="select-like"
              value={categoryInfo}
              onChange={(event) => setCategoryInfo(event.target.value)}
            >
              {categoryOptions.map((category) => (
                <option value={category.value} key={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field-label">Дата</span>
            <input
              className="input-like"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </label>
        </div>

        {notice && <div className="form-notice">{notice}</div>}

        <button className="primary-button margin-top-22" type="submit" disabled={isSaving}>
          <span className="plus">+</span>
          {isSaving ? 'Добавляем...' : 'Добавить операцию'}
        </button>
      </form>
    </section>
  );
};

export default OperationForm;
