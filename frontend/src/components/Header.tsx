import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  userName: string;
  defaultMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ userName, defaultMenuOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultMenuOpen);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(defaultMenuOpen);
  }, [defaultMenuOpen]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <div className="logo-title">
        <div className="logo-mark">₽</div>
        <div>
          <div>ФинТрекер</div>
          <span>Семейный бюджет без хаоса</span>
        </div>
      </div>

      <div className="profile-area" ref={menuRef}>
        <button
          className="profile-pill"
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <span className="profile-dot" />
          {userName}
          <span className={`caret ${isOpen ? 'up' : ''}`} />
        </button>

        {isOpen && (
          <div className="dropdown" role="menu">
            <Link to="/family" onClick={closeMenu}>
              Семья
            </Link>

            <Link to="/invitations" onClick={closeMenu}>
              <span>Приглашения</span>
              <span className="small-badge">2</span>
            </Link>

            <Link to="/profile/settings" onClick={closeMenu}>
              Настройки профиля
            </Link>

            <Link to="/main/analytics" onClick={closeMenu}>
              Аналитика
            </Link>

            <Link className="danger" to="/" onClick={closeMenu}>
              Выйти
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
