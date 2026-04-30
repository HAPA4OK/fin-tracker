import { Link } from 'react-router-dom';
import { accountRoutes } from '../../routes';

export function InviteCard() {
  return (
    <div className="invite-card">
      <div className="invite-title">Семья Олега</div>
      <div className="invite-text">Приглашение от oleg@gmail.com</div>
      <div className="invite-actions">
        <Link className="small-primary" to={accountRoutes.familyMenu}>
          Принять
        </Link>
        <Link className="hollow-danger" to={accountRoutes.home}>
          Отклонить
        </Link>
      </div>
    </div>
  );
}
