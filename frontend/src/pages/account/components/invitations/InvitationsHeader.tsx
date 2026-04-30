import { Link } from 'react-router-dom';

export function InvitationsHeader() {
  return (
    <>
      <Link className="close-link" to="/">
        ×
      </Link>

      <h1 className="sheet-title">Приглашения</h1>
      <div className="sheet-subtitle">
        Здесь отображаются приглашения от других пользователей
      </div>
    </>
  );
}
