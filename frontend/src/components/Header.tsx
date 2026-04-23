import React from 'react';

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => (
  <header className="header panel">
    <div className="logo-title">Название трекера</div>
    <div className="profile-area">
      <a className="profile-pill" href="/main-menu">
        <span className="profile-dot"></span>
        <span>{userName}</span>
        <span className="caret"></span>
      </a>
    </div>
  </header>
);

export default Header;