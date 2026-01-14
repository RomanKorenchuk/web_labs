import React from 'react';
import PrimaryButton from '../UI/PrimaryButton/PrimaryButton';
import SecondaryButton from '../UI/SecondaryButton/SecondaryButton';
import './ProductCard.css';

const ProductCard = ({ product, onDetailsClick, onApplyClick }) => {
  // Функція для відображення емодзі за категорією
  const getProductIcon = (category) => {
    const icons = {
      consumer: '💰',
      mortgage: '🏠', 
      auto: '🚗',
      cards: '💳',
      business: '💼',
      agriculture: '🚜',
      education: '🎓'
    };
    return icons[category] || '📊';
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <div className="product-icon">
          {getProductIcon(product.category)}
        </div>
        <div className="product-bank">{product.bankName}</div>
      </div>
      
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-rate">
          <span className="rate-value">{product.interestRate}%</span>
          <span className="rate-label">річна ставка</span>
        </div>
        
        <div className="product-details">
          <div className="detail-item">
            <span>Макс. сума:</span>
            <strong>{product.maxAmount.toLocaleString()} грн</strong>
          </div>
          <div className="detail-item">
            <span>Термін:</span>
            <strong>{product.term}</strong>
          </div>
        </div>
        
        <p className="product-description">{product.description}</p>
        
        <div className="product-features">
          {product.features.map((feature, index) => (
            <span key={index} className="feature-tag">✓ {feature}</span>
          ))}
        </div>
        
        <div className="product-actions">
          <SecondaryButton onClick={onDetailsClick}>
            Детальніше
          </SecondaryButton>
          <PrimaryButton onClick={onApplyClick} disabled={!product.inStock}>
            {product.inStock ? 'Подати заявку' : 'Недоступно'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;