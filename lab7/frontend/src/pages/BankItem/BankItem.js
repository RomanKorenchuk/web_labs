import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import './BankItem.css';

const BankItem = () => {
  const { id } = useParams();
  const [bank, setBank] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bankResponse, loansResponse] = await Promise.all([
          fetch(`http://localhost:5000/api/banks/${id}`),
          fetch(`http://localhost:5000/api/all-loans`)
        ]);
        
        const bankData = await bankResponse.json();
        const loansData = await loansResponse.json();
        
        setBank(bankData);
        // Фільтруємо кредити тільки для цього банку
        const bankLoans = loansData.filter(loan => loan.bankId === bankData.id);
        setLoans(bankLoans);
      } catch (error) {
        console.error('Помилка завантаження:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="bank-item-page">
        <div className="container">
          <div className="loading-state">Завантаження...</div>
        </div>
      </div>
    );
  }

  if (!bank) {
    return (
      <div className="bank-item-page">
        <div className="container">
          <div className="error-state">Банк не знайдено</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bank-item-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Головна</Link> / <Link to="/catalog">Банки</Link> / <span>{bank.name}</span>
        </div>

        {/* Bank Header */}
        <div className="bank-header">
          <div className="bank-main-info">
            <div className="bank-logo-large">{bank.logo}</div>
            <div className="bank-title">
              <h1>{bank.name}</h1>
              <div className="bank-rating">
                <span className="stars">⭐ {bank.rating.toFixed(1)}</span>
                <span className="reviews">({bank.clients?.toLocaleString()}+ клієнтів)</span>
              </div>
            </div>
          </div>
          <div className="bank-actions">
            <button className="btn-primary">Порівняти</button>
            <button className="btn-secondary">Додати до обраного</button>
          </div>
        </div>

        {/* Bank Stats */}
        <div className="bank-stats-overview">
          <div className="stat-card">
            <div className="stat-value">{bank.clients?.toLocaleString()}</div>
            <div className="stat-label">Клієнтів</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{bank.loansIssued?.toLocaleString()}</div>
            <div className="stat-label">Кредитів видано</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{bank.established}</div>
            <div className="stat-label">Рік заснування</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{bank.rating.toFixed(1)}/5</div>
            <div className="stat-label">Рейтинг</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bank-tabs">
          <button 
            className={`tab ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            Про банк
          </button>
          <button 
            className={`tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Послуги
          </button>
          <button 
            className={`tab ${activeTab === 'loans' ? 'active' : ''}`}
            onClick={() => setActiveTab('loans')}
          >
            Кредити ({loans.length})
          </button>
          <button 
            className={`tab ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            Контакти
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'about' && (
            <div className="about-section">
              <h2>Про {bank.name}</h2>
              <p>{bank.description}</p>
              <div className="bank-features">
                <h3>Ключові переваги:</h3>
                <div className="features-grid">
                  {bank.products?.map((product, index) => (
                    <div key={index} className="feature-item">
                      ✓ {product}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="products-section">
              <h2>Продукти та послуги</h2>
              <div className="products-grid">
                {bank.products?.map((product, index) => (
                  <div key={index} className="product-item">
                    <div className="product-icon">💼</div>
                    <div className="product-info">
                      <h4>{product}</h4>
                      <p>Детальний опис послуги доступний в відділенні банку</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'loans' && (
            <div className="loans-section">
              <h2>Кредитні пропозиції {bank.name}</h2>
              {loans.length > 0 ? (
                <div className="loans-grid">
                  {loans.map(loan => (
                    <ProductCard 
                      key={loan.id}
                      product={loan}
                      onDetailsClick={() => window.location.href = `/loan/${loan.id}`}
                      onApplyClick={() => console.log('Apply:', loan.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="no-loans">
                  <h3>Наразі кредитних пропозицій немає</h3>
                  <p>Банк тимчасово не надає кредитні продукти</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="contacts-section">
              <h2>Контактна інформація</h2>
              <div className="contact-info">
                <div className="contact-item">
                  <strong>📞 Телефон:</strong>
                  <span>{bank.phone || '0-800-000-000'}</span>
                </div>
                <div className="contact-item">
                  <strong>🌐 Вебсайт:</strong>
                  <a href={bank.website} target="_blank" rel="noopener noreferrer">
                    {bank.website}
                  </a>
                </div>
                <div className="contact-item">
                  <strong>🏢 Рік заснування:</strong>
                  <span>{bank.established}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Similar Banks */}
        <div className="similar-section">
          <h2>Схожі банки</h2>
          <div className="similar-banks">
            <Link to="/bank/2" className="similar-bank">
              <div className="similar-logo">🏛️</div>
              <div className="similar-name">Ощадбанк</div>
            </Link>
            <Link to="/bank/4" className="similar-bank">
              <div className="similar-logo">🇦🇹</div>
              <div className="similar-name">Райффайзен Банк</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankItem;