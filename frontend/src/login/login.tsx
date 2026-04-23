import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';

export default function SignedUp() {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });


  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await loginUser(formData);
      

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      alert("Вход выполнен успешно!");
      navigate('/main');
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="form">
      <h1>Вход</h1>

      {/* Вывод ошибки от сервера */}
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">
            Логин или электронная почта <span className="warning">*</span>
          </label>
          <br />
          <input
            type="text"
            id="login"
            name="login" // Должно совпадать с ключом в formData
            placeholder="login"
            value={formData.login}
            onChange={handleChange}
            required
          />
        </div>

        <div className="passwordField">
          <label htmlFor="password">
            Пароль <span className="warning">*</span>
          </label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            className="passwordPadding"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <input type="checkbox" id="seePassword" className="toggle-checkbox" />
          <label htmlFor="seePassword" className="toggle-label">
            <span className="eye-icon eye-open"></span>
          </label>
        </div>

        <div>
          <input type="checkbox" id="rememberMe" name="rememberMe" />
          <label className="smallLabel" htmlFor="rememberMe">Запомнить меня</label>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Проверка...' : 'Войти'}
          </button>
          
          <p className="smallLabel textCentered">
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </p>
          
          <p className="smallLabel textCentered">
            <a href="/passwordRecovery.html">Забыли пароль?</a>
          </p>
          
          <button type="button" onClick={() => navigate(-1)}>Назад</button>
        </div>
      </form>
    </div>
  );
}