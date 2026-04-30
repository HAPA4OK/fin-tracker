import { Link } from 'react-router-dom';
import { routes } from '../routes';

type MemberCardProps = {
  name: string;
  email: string;
  isOwner?: boolean;
};

export function MemberCard({ name, email, isOwner = false }: MemberCardProps) {
  return (
    <div className={isOwner ? 'member-card owner' : 'member-card'}>
      <div>
        <div className="member-name">{name}</div>
        <div className="member-mail">{email}</div>
      </div>
      {isOwner ? (
        <span className="owner-badge">Владелец</span>
      ) : (
        <Link className="member-remove" to={routes.notReady}>×</Link>
      )}
    </div>
  );
}
