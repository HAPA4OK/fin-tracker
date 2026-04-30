import { Link } from 'react-router-dom';
import { accountRoutes } from '../../routes';

export function InvitationsHeader() {
  return (
    <>
      <Link className="close-link" to={accountRoutes.home}>
        ×
      </Link>
      <h1 className="sheet-title">Приглашения</h1>
      <div className="sheet-subtitle">
        Здесь отображаются приглашения от других пользователей
      </div>
    </>
  );
}
