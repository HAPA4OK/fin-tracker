import { Link } from 'react-router-dom';
import { routes } from '../routes';

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
            <Link className="profile-pill" to={routes.familyMenu}>
              <span>Семья Олега</span>
              <span className="caret up"></span>
            </Link>
            <div className="dropdown">
              <Link to={routes.familySettings}>Настройки семьи</Link>
              <Link className="danger" to={routes.home}>Выйти</Link>
            </div>
          </>
        ) : (
          <Link className="profile-pill" to={routes.mainMenu}>
            <span className="profile-dot"></span>
            <span>Олег Зуев</span>
            <span className="caret"></span>
          </Link>
        )}
      </div>
    </header>
  );
}
