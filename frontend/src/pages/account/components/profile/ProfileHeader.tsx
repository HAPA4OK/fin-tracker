import { Link } from 'react-router-dom';
import { accountRoutes } from '../../routes';

export function ProfileHeader() {
  return (
    <>
      <Link className="close-link" to={accountRoutes.home}>
        ×
      </Link>
      <h1 className="sheet-title">Настройки профиля</h1>
      <div className="sheet-subtitle">
        Здесь вы можете управлять своими личными данными
      </div>
    </>
  );
}
