import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MainContent.css';

const MainContent = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredBanks, setFeaturedBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [banksResponse, loansResponse] = await Promise.all([
          fetch('http://localhost:5000/api/top-banks'),
          fetch('http://localhost:5000/api/top-loans')
        ]);

        const banksData = await banksResponse.json();
        const loansData = await loansResponse.json();

        setFeaturedBanks(banksData);
        setFeaturedProducts(loansData);
      } catch (error) {
        console.error('Помилка завантаження:', error);
        setFeaturedBanks([]);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="main-content">
        <div className="container">
          <div className="loading-state">
            <h2>Завантаження...</h2>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="container">
        {/* Hero Banner */}
        <section className="hero-banner">
          <div className="hero-content">
            <h1>BankCompare - ваш помічник у виборі банку</h1>
            <p className="hero-description">
              Ми допомагаємо порівнювати банки України за реальними показниками: 
              кількість клієнтів, видані кредити, рейтинги надійності та відгуки. 
              Обирайте найкращі умови серед перевірених фінансових установ.
            </p>
            <div className="hero-features">
              <div className="feature">
                <div className="feature-icon">📊</div>
                <div className="feature-text">
                  <strong>Прозоре порівняння</strong>
                  <span>Реальні дані та статистика</span>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">⚡</div>
                <div className="feature-text">
                  <strong>Швидкий вибір</strong>
                  <span>Найкращі пропозиції за критеріями</span>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">🛡️</div>
                <div className="feature-text">
                  <strong>Надійність</strong>
                  <span>Тільки ліцензовані банки</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="benefits-section">
          <h2>Чому обирають BankCompare?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🏆</div>
              <h3>Топ-3 банки</h3>
              <p>Ми аналізуємо рейтинги та відгуки, щоб показати вам найкращих</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💸</div>
              <h3>Вигідні умови</h3>
              <p>Знаходимо кредити з найнижчими ставками та найкращими умовами</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📈</div>
              <h3>Актуальні дані</h3>
              <p>Вся інформація регулярно оновлюється та перевіряється</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3>Безкоштовно</h3>
              <p>Наш сервіс абсолютно безкоштовний для всіх клієнтів</p>
            </div>
          </div>
        </section>

        {/* Featured Banks */}
        <section className="featured-section">
          <div className="section-header">
            <h2>Рекомендовані банки</h2>
            <p className="section-description">Найпопулярніші фінансові установи серед клієнтів</p>
          </div>
          <div className="banks-grid">
            {featuredBanks.map(bank => (
              <div key={bank.id} className="bank-card">
                <div className="bank-image">
                  <div className="bank-logo">{bank.logo}</div>
                </div>
                <div className="bank-info">
                  <h3>{bank.name}</h3>
                  <div className="bank-rating">
                    <span className="stars">⭐ {bank.rating}</span>
                    <span className="reviews">({bank.clients?.toLocaleString()}+ клієнтів)</span>
                  </div>
                  <p className="bank-description">{bank.description}</p>
                  <div className="bank-features">
                    {bank.products?.slice(0, 2).map((product, index) => (
                      <span key={index} className="feature-tag">{product}</span>
                    ))}
                  </div>
                  <button className="bank-button">Детальніше</button>
                </div>
              </div>
            ))}
          </div>
          {/* Кнопка "Показати всі банки" */}
          <div className="show-more-section">
            <Link to="/catalog" className="show-more-button">
              Показати всі банки
              <span className="button-arrow">→</span>
            </Link>
          </div>
        </section>

        {/* Featured Loans */}
        <section className="featured-section">
          <div className="section-header">
            <h2>Популярні кредитні пропозиції</h2>
            <p className="section-description">Найвигідніші умови від партнерських банків</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-header">
                  <div className="product-icon">{product.image}</div>
                  <div className="product-bank">{product.bankName}</div>
                </div>
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <div className="product-rate">
                    <span className="rate">{product.interestRate}%</span>
                    <span className="rate-label">річна ставка</span>
                  </div>
                  <p className="product-description">{product.description}</p>
                  <div className="product-details">
                    <div className="detail">
                      <span>Сума:</span>
                      <strong>{product.maxAmount?.toLocaleString()} грн</strong>
                    </div>
                    <div className="detail">
                      <span>Термін:</span>
                      <strong>{product.term}</strong>
                    </div>
                  </div>
                  <button className="product-button">Оформити</button>
                </div>
              </div>
            ))}
          </div>
          {/* Кнопка "Показати всі кредити" */}
          <div className="show-more-section">
            <Link to="/loans" className="show-more-button">
              Показати всі кредити
              <span className="button-arrow">→</span>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Готові знайти ідеальну пропозицію?</h2>
            <p>Перегляньте повний каталог з усіма банками та кредитними програмами</p>
            <div className="cta-buttons">
              <Link to="/banks" className="cta-button primary">Перейти до каталогу</Link>
              <Link to="/compare" className="cta-button secondary">Порівняти банки</Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default MainContent;