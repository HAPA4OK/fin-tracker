import { Link } from 'react-router-dom';

export function InviteCard() {
  return (
    <div className="invite-card">
      <div className="invite-title">Семья Олега</div>
      <div className="invite-text">Приглашение от oleg@gmail.com</div>

      <div className="invite-actions">
        <Link className="small-primary" to="/family">
          Принять
        </Link>

        <Link className="hollow-danger" to="/">
          Отклонить
        </Link>
      </div>
    </div>
  );
}
