import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Хук для отримання даних
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  
  // Отримуємо items з Redux store
  const cartItems = useSelector((state) => state.cartItems);

  // Рахуємо загальну кількість товарів (сума всіх quantity)
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const menuItems = [
    { name: 'Головна', path: '/', icon: '🏠' },
    { name: 'Усі банки', path: '/catalog', icon: '🏦' },
    { name: 'Кредити', path: '/loans', icon: '💳' },
    { name: 'Кошик', path: '/cart', icon: '🛒' }, // Змінили на Кошик
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
          {/* Клікабельний бейдж кошика */}
          <Link to="/cart" className="comparison-badge" style={{textDecoration: 'none'}}>
            <span className="comparison-icon">🛒</span>
            <span className="comparison-text">Кошик</span>
            <span className="comparison-count">({cartCount})</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;