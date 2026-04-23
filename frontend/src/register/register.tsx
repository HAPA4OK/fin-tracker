import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

export default function Register() {
  const navigate = useNavigate();

  // 1. Хранилище данных формы
  const [formData, setFormData] = useState({
    fullname: '',
    login: '',
    email: '',
    password: '',
    gender: 'male'
  });

  // 2. Хранилище для ошибок
  const [error, setError] = useState('');

  // --- НОВОЕ: Состояние загрузки ---
  const [isLoading, setIsLoading] = useState(false); 

  // 3. Функция "Слежка за инпутами"
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 4. Главная функция отправки
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    
    // --- НОВОЕ: Включаем индикатор загрузки ---
    setIsLoading(true); 

    try {
      await registerUser(formData);
      
      alert("Регистрация прошла успешно!");
      navigate('/login');
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false); 
    }
  };


    return (
  <>
    <div className="form">
      <h1>Регистрация</h1>
      
      {/* 1. Выводим ошибку от бэкенда, если она есть */}
      {error && <div className="error-general" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">ФИО <span className="warning">*</span></label>
          <br />
          <input
            type="text"
            id="fullName"
            name="fullname" // Должно совпадать с тем, что ждет бэкенд (у вас там fullname)
            placeholder="Фамилия Имя Отчество"
            value={formData.fullname} // Связка со стейтом
            onChange={handleChange}   // Обработчик изменений
          />
        </div>

        <div>
          <label htmlFor="login">Логин <span className="warning">*</span></label>
          <br />
          <input 
            type="text" 
            id="login" 
            name="login" 
            placeholder="login" 
            value={formData.login}    // Связка со стейтом
            onChange={handleChange} 
          />
        </div>

        <div>
          <label htmlFor="email">Электронная почта <span className="warning">*</span></label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="example@email.com"
            value={formData.email}    // Связка со стейтом
            onChange={handleChange}
          />
        </div>

        {/* ПРИМЕР ДЛЯ ПАРОЛЯ */}
        <div className="passwordField">
          <label htmlFor="password">Пароль <span className="warning">*</span></label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            className="passwordPadding"
            placeholder="••••••••"
            value={formData.password} // Связка со стейтом
            onChange={handleChange}
          />
          {/* Чекбокс для глаза оставляем как есть, он обычно работает через CSS или отдельный стейт */}
          <input type="checkbox" id="seePassword1" className="toggle-checkbox" />
          <label htmlFor="seePassword1" className="toggle-label">
            <span className="eye-icon eye-open"></span>
          </label>
        </div>

        {/* ВАЖНО: Добавьте выбор пола, так как ваш бэкенд его требует! */}
        <div>
          <label>Пол <span className="warning">*</span></label>
          <br />
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
        </div>

        <div>
          <input
            type="checkbox"
            id="tosConfirm"
            name="tosConfirm"
            // Для чекбоксов логика чуть сложнее, но для начала можно оставить так
          />
          <label className="smallLabel" htmlFor="tosConfirm">
            Я согласен с <a href="/tos.html">политикой обработки данных</a>
          </label>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          {/* Добавляем аттрибут disabled, чтобы нельзя было спамить кнопку во время загрузки */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
          
          <p className="smallLabel">
            Уже есть аккаунт? <a href="/login">Войти</a>
          </p>
          
          {/* Кнопка назад через navigate(-1) */}
          <button type="button" onClick={() => navigate(-1)}>Назад</button>
        </div>
      </form>
    </div>
  </>
);
}
