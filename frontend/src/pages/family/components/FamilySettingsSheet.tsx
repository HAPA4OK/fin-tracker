import { Link } from 'react-router-dom';

import { MemberCard } from './MemberCard';

export function FamilySettingsSheet() {
  return (
    <section className="sheet">
      <Link className="close-link" to="/family">×</Link>

      <h1 className="sheet-title">Настройки семьи</h1>
      <div className="sheet-subtitle">Основные настройки и управление участниками</div>

      <div className="family-section-title">Основное</div>

      <div className="soft-row">
        <span>Название семьи</span>
        <Link className="blue-link" to="/not-ready">Семья Олега ✎</Link>
      </div>

      <div className="family-section-title" style={{ marginTop: 46 }}>Участники семьи</div>

      <div className="member-list">
        <MemberCard name="Олег" email="oleg@gmail.com" isOwner />
        <MemberCard name="Собака Олега" email="gavgav@gmail.com" />
        <MemberCard name="Дед Олега" email="plesen@gmail.com" />
      </div>

      <div style={{ marginTop: 12 }}>
        <Link className="mini-light-button" to="/not-ready">
          <span className="plus" style={{ fontSize: 20 }}>＋</span>
          Добавить участника
        </Link>
      </div>

      <div className="bottom-save">
        <Link className="primary-button" to="/family">Сохранить изменения</Link>
      </div>
    </section>
  );
}
