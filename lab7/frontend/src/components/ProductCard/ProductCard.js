import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onDetailsClick, onApplyClick }) => {
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

  const formatAmount = (amount) => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'M';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(0) + 'K';
    }
    return amount.toLocaleString();
  };

  return (
    <div className="product-card">
      <div className="product-header">
        <div className="product-icon">{getProductIcon(product.category)}</div>
        <Link to={`/bank/${product.bankId}`} className="product-bank">
          {product.bankName}
        </Link>
      </div>
      
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-rate">
          <span className="rate-value">{product.interestRate}%</span>
          <span className="rate-label">річна ставка</span>
        </div>
        
        <div className="product-details">
          <div className="detail">
            <span className="detail-label">Сума:</span>
            <span className="detail-value">{formatAmount(product.maxAmount)} грн</span>
          </div>
          <div className="detail">
            <span className="detail-label">Термін:</span>
            <span className="detail-value">{product.term}</span>
          </div>
          <div className="detail">
            <span className="detail-label">Популярність:</span>
            <span className="detail-value popularity">{product.popularity}%</span>
          </div>
        </div>
        
        <p className="product-description">{product.description}</p>
        
        <div className="product-features">
          {product.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="feature-tag">✓ {feature}</span>
          ))}
        </div>
        
        <div className="product-actions">
          <Link to={`/loan/${product.id}`} className="btn-details">
            Детальніше
          </Link>
          <button 
            className={`btn-apply ${!product.inStock ? 'disabled' : ''}`}
            onClick={onApplyClick}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Оформити' : 'Недоступно'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;