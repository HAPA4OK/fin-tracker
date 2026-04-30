import { Link } from 'react-router-dom';

export type HeaderMode = 'family' | 'user';

type HeaderProps = {
  mode: HeaderMode;
};

export function Header({ mode }: HeaderProps) {
  return (
    <header className="header panel">
      <div className="logo-title">Название трекера</div>

      <div className="profile-area">
        {mode === 'family' ? (
          <>
            <Link className="profile-pill" to="/family">
              <span>Семья Олега</span>
              <span className="caret up"></span>
            </Link>

            <div className="dropdown">
              <Link to="/family/settings">Настройки семьи</Link>
              <Link className="danger" to="/">Выйти</Link>
            </div>
          </>
        ) : (
          <Link className="profile-pill" to="/main-menu">
            <span className="profile-dot"></span>
            <span>Олег Зуев</span>
            <span className="caret"></span>
          </Link>
        )}
      </div>
    </header>
  );
}
