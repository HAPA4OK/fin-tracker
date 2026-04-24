import { Link } from 'react-router-dom';
import './dashboard.css';

export default function Dashboard() {

  return (
      <div className='Landing'>
        <header>
          <h1>Семейный финансовый трекер</h1>
        </header>
        <div className='text'>
          <h2>Добро пожаловать в семейный финансовый трекер</h2>
            <p>Управляйте своими финансами легко и эффективно с нашим приложением. <br />
             Отслеживайте доходы и расходы, планируйте бюджет и анализируйте финансовые данные в удобном интерфейсе.</p>  
            <p>Начните уже сегодня и возьмите контроль над своими финансами!</p>
        </div>
          <Link to="/register">
          <button id='btn' >
            Зарегистрироваться
          </button>
          </Link>

          <footer>
            <p>&copy; 2026 Семейный финансовый трекер. Все права защищены.</p>
          </footer>
      </div>
  )
}