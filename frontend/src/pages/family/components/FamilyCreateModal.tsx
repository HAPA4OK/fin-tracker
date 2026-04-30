import { Link } from 'react-router-dom';
import { routes } from '../routes';
import { ParticipantCard } from './ParticipantCard';

export function FamilyCreateModal() {
  return (
    <div className="overlay" style={{ paddingTop: 52 }}>
      <div className="modal modal-large">
        <Link className="close-link" to={routes.home}>×</Link>
        <h1 className="modal-header-title">Создание семьи</h1>
        <p className="modal-header-subtitle">
          Каждый сам вносит траты (если есть email) или вы вносите их за близких без аккаунта
        </p>
        <div className="family-section-title" style={{ marginTop: 0 }}>Владелец</div>
        <div className="owner-row">
          <span>oleg@gmail.com</span>
          <span className="owner-badge">Это вы</span>
        </div>
        <div className="family-section-title" style={{ marginTop: 0 }}>Участники семьи</div>
        <ParticipantCard label="Участник" />
        <ParticipantCard label="Участник 2" />
        <Link className="add-participant" to={routes.notReady}>
          <span className="plus" style={{ fontSize: 18 }}>＋</span>
          Добавить участника
        </Link>
        <Link className="primary-button" to={routes.familyMenu}>Создать семью</Link>
      </div>
    </div>
  );
}
