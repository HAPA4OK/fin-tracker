import { Link } from 'react-router-dom';

export default function Dashboard() {

  return (
      <>
          <h1>Landing page</h1>
          <Link to="/register">
          <button id='btn' >
            Перейти на страницу регистрации
          </button>
          </Link>
      </>
  )
}