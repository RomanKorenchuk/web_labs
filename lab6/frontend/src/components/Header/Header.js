import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="logo-icon">🏦</div>
          <div className="logo-text">
            <h1>BankCompare</h1>
            <span>Порівняння банків України</span>
          </div>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <input type="text" placeholder="Пошук банків або кредитів..." />
            <button className="search-btn">🔍</button>
          </div>
          
          <nav className="header-nav">
            <a href="#banks" className="nav-link">Банки</a>
            <a href="#loans" className="nav-link">Кредити</a>
            <a href="#compare" className="nav-link">Порівняння</a>
          </nav>
          
          <div className="user-actions">
            <button className="login-btn">Увійти</button>
            <button className="register-btn">Реєстрація</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;