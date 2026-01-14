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