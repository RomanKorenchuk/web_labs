import React from 'react';
import PrimaryButton from '../UI/PrimaryButton/PrimaryButton';
import SecondaryButton from '../UI/SecondaryButton/SecondaryButton';
import './BankCard.css';

const BankCard = ({ bank, onDetailsClick, onCompareClick }) => {
  return (
    <div className="bank-card">
      <div className="bank-header">
        <div className="bank-logo">{bank.logo}</div>
        <div className="bank-rating">⭐ {bank.rating}</div>
      </div>
      
      <div className="bank-content">
        <h3 className="bank-name">{bank.name}</h3>
        <p className="bank-description">{bank.description}</p>
        
        <div className="bank-stats">
          <div className="stat">
            <div className="stat-value">{bank.clients.toLocaleString()}</div>
            <div className="stat-label">клієнтів</div>
          </div>
          <div className="stat">
            <div className="stat-value">{bank.loansIssued.toLocaleString()}</div>
            <div className="stat-label">кредитів</div>
          </div>
        </div>
        
        <div className="bank-products">
          <h4>Послуги:</h4>
          <div className="products-tags">
            {bank.products.map((product, index) => (
              <span key={index} className="product-tag">{product}</span>
            ))}
          </div>
        </div>
        
        <div className="bank-actions">
          <SecondaryButton onClick={onDetailsClick}>
            Детальніше
          </SecondaryButton>
          <PrimaryButton onClick={onCompareClick}>
            Порівняти
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default BankCard;