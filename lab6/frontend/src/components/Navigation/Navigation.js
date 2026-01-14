import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Головна', path: '/', icon: '🏠' },
    { name: 'Усі банки', path: '/banks', icon: '🏦' },
    { name: 'Кредити', path: '/loans', icon: '💳' },
    { name: 'Порівняння', path: '/compare', icon: '📊' },
    { name: 'Калькулятор', path: '/calculator', icon: '🧮' },
    { name: 'Довідка', path: '/help', icon: '❓' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul className="nav-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link 
                to={item.path} 
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="nav-actions">
          <div className="comparison-badge">
            <span className="comparison-icon">📋</span>
            <span className="comparison-text">Порівняння</span>
            <span className="comparison-count">(0)</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;