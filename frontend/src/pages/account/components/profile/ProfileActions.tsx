import { Link } from 'react-router-dom';

export function ProfileActions() {
  return (
    <>
      <div className="bottom-save">
        <Link className="primary-button" to="/">
          Сохранить изменения
        </Link>
      </div>

      <Link className="danger-link" to="/">
        Выйти из профиля
      </Link>
    </>
  );
}
