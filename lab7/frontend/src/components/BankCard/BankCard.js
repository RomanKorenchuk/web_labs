import React from 'react';
import { Link } from 'react-router-dom';
import './BankCard.css';

const BankCard = ({ bank, onDetailsClick, onCompareClick }) => {
  // Форматування чисел для компактного відображення
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + ' млн';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + ' тис';
    }
    return num.toLocaleString();
  };

  return (
    <div className="bank-card">
      <div className="bank-header">
        <div className="bank-logo">{bank.logo}</div>
        <div className="bank-rating">
          <span className="stars">⭐ {bank.rating.toFixed(1)}</span> {/* Змінено на цифровий формат */}
        </div>
      </div>
      
      <div className="bank-content">
        <h3 className="bank-name">{bank.name}</h3>
        <p className="bank-description">{bank.description}</p>
        
        <div className="bank-stats">
          <div className="stat">
            <div className="stat-value">{formatNumber(bank.clients)}</div>
            <div className="stat-label">клієнтів</div>
          </div>
          <div className="stat">
            <div className="stat-value">{formatNumber(bank.loansIssued)}</div>
            <div className="stat-label">кредитів</div>
          </div>
          <div className="stat">
            <div className="stat-value">{bank.score}</div>
            <div className="stat-label">балів</div>
          </div>
        </div>
        
        <div className="bank-products">
          <h4>Основні послуги:</h4>
          <div className="products-tags">
            {bank.products.slice(0, 3).map((product, index) => (
              <span key={index} className="product-tag">{product}</span>
            ))}
          </div>
        </div>
        
        <div className="bank-actions">
          <Link to={`/bank/${bank.id}`} className="btn-details">
            Детальніше
          </Link>
          <button className="btn-compare" onClick={onCompareClick}>
            Порівняти
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankCard;