import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { loanApi, bankApi } from '../../api/apiService';
import './LoanItem.css';

const LoanItem = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [bank, setBank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const loanResponse = await loanApi.getLoanById(id);
        const loanData = loanResponse.data;
        setLoan(loanData);

        // Отримуємо інформацію про банк
        const bankResponse = await bankApi.getBankById(loanData.bankId);
        setBank(bankResponse.data);
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
      <div className="loan-item-page">
        <div className="container">
          <Spinner text="Завантаження..." />
        </div>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="loan-item-page">
        <div className="container">
          <div className="error-state">Кредит не знайдено</div>
        </div>
      </div>
    );
  }

  return (
    <div className="loan-item-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Головна</Link> / <Link to="/loans">Кредити</Link> / <span>{loan.name}</span>
        </div>

        {/* Loan Header */}
        <div className="loan-header">
          <div className="loan-main-info">
            <div className="loan-icon-large">{loan.image || '💰'}</div>
            <div className="loan-title">
              <h1>{loan.name}</h1>
              <div className="loan-bank">
                <Link to={`/bank/${loan.bankId}`} className="bank-link">
                  {loan.bankName} → 
                </Link>
                <span className="bank-rating">⭐ {bank?.rating?.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <div className="loan-rate">
            <div className="rate-value">{loan.interestRate}%</div>
            <div className="rate-label">річна ставка</div>
          </div>
        </div>

        {/* Loan Stats */}
        <div className="loan-stats-overview">
          <div className="stat-card">
            <div className="stat-value">{loan.maxAmount?.toLocaleString()} грн</div>
            <div className="stat-label">Максимальна сума</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{loan.term}</div>
            <div className="stat-label">Термін кредиту</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{loan.popularity}%</div>
            <div className="stat-label">Популярність</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{loan.inStock ? 'Доступний' : 'Недоступний'}</div>
            <div className="stat-label">Статус</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="loan-tabs">
          <button 
            className={`tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Деталі
          </button>
          <button 
            className={`tab ${activeTab === 'requirements' ? 'active' : ''}`}
            onClick={() => setActiveTab('requirements')}
          >
            Вимоги
          </button>
          <button 
            className={`tab ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            Документи
          </button>
          <button 
            className={`tab ${activeTab === 'bank' ? 'active' : ''}`}
            onClick={() => setActiveTab('bank')}
          >
            Про банк
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'details' && (
            <div className="details-section">
              <h2>Деталі кредиту</h2>
              <p className="loan-description">{loan.description}</p>
              
              <div className="loan-features">
                <h3>Особливості кредиту:</h3>
                <div className="features-grid">
                  {loan.features?.map((feature, index) => (
                    <div key={index} className="feature-item">✓ {feature}</div>
                  ))}
                </div>
              </div>

              <div className="loan-calculation">
                <h3>Приклад розрахунку:</h3>
                <div className="calculation-example">
                  <p>Сума: <strong>100,000 грн</strong></p>
                  <p>Термін: <strong>5 років</strong></p>
                  <p>Щомісячний платіж: <strong>~2,400 грн</strong></p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div className="requirements-section">
              <h2>Вимоги до позичальника</h2>
              <div className="requirements-list">
                <div className="requirement">✓ Вік від 21 до 65 років</div>
                <div className="requirement">✓ Стабільний дохід від 6 місяців</div>
                <div className="requirement">✓ Українське громадянство</div>
                <div className="requirement">✓ Відсутність прострочень в інших банках</div>
                <div className="requirement">✓ Постійна реєстрація</div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="documents-section">
              <h2>Необхідні документи</h2>
              <div className="documents-list">
                <div className="document">✓ Паспорт громадянина України</div>
                <div className="document">✓ Ідентифікаційний код</div>
                <div className="document">✓ Довідка про доходи</div>
                <div className="document">✓ Трудова книжка</div>
                <div className="document">✓ Заява-анкета</div>
              </div>
            </div>
          )}

          {activeTab === 'bank' && bank && (
            <div className="bank-section">
              <h2>Про банк {bank.name}</h2>
              <div className="bank-info-card">
                <div className="bank-header-mini">
                  <div className="bank-logo-mini">{bank.logo}</div>
                  <div className="bank-info-mini">
                    <h3>{bank.name}</h3>
                    <div className="bank-stats-mini">
                      <span>⭐ {bank.rating.toFixed(1)}</span>
                      <span>👥 {bank.clients?.toLocaleString()} клієнтів</span>
                    </div>
                  </div>
                </div>
                <p className="bank-description">{bank.description}</p>
                <Link to={`/bank/${bank.id}`} className="btn-details">
                  Детальніше про банк →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-content">
            <h2>Готові подати заявку?</h2>
            <p>Залиште заявку і наш менеджер зв'яжеться з вами протягом 15 хвилин</p>
            <div className="cta-buttons">
              <button className="btn-apply">Подати заявку</button>
              <Link to={`/bank/${loan.bankId}`} className="btn-bank">
                Перейти до банку
              </Link>
            </div>
          </div>
        </div>

        {/* Similar Loans */}
        <div className="similar-section">
          <h2>Схожі кредити</h2>
          <div className="similar-loans">
            <Link to="/loan/2" className="similar-loan">
              <div className="similar-icon">🏠</div>
              <div className="similar-info">
                <div className="similar-name">Іпотека "Молода сім'я"</div>
                <div className="similar-rate">12.0%</div>
              </div>
            </Link>
            <Link to="/loan/3" className="similar-loan">
              <div className="similar-icon">🚗</div>
              <div className="similar-info">
                <div className="similar-name">Автокредит "Комфорт+"</div>
                <div className="similar-rate">13.5%</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanItem;