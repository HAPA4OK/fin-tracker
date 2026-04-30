import { Link } from 'react-router-dom';
import { accountRoutes } from '../../routes';

export function ProfileActions() {
  return (
    <>
      <div className="bottom-save">
        <Link className="primary-button" to={accountRoutes.home}>
          Сохранить изменения
        </Link>
      </div>
      <Link className="danger-link" to={accountRoutes.home}>
        Выйти из профиля
      </Link>
    </>
  );
}
