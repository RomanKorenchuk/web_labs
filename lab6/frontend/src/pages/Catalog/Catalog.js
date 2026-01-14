import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import BankCard from '../../components/BankCard/BankCard';
import PrimaryButton from '../../components/UI/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton/SecondaryButton';
import Select from '../../components/UI/Select/Select';
import './Catalog.css';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [banks, setBanks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('banks');
  const [loading, setLoading] = useState(true);

  // Встановлюємо активну вкладку з query параметрів
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl === 'loans') {
      setActiveTab('loans');
    } else {
      setActiveTab('banks');
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [banksResponse, loansResponse] = await Promise.all([
          fetch('http://localhost:5000/api/all-banks'),
          fetch('http://localhost:5000/api/all-loans')
        ]);
        
        const banksData = await banksResponse.json();
        const loansData = await loansResponse.json();
        
        setBanks(banksData);
        setProducts(loansData);
      } catch (error) {
        console.error('Помилка завантаження:', error);
        setBanks([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const categories = [
    { value: 'all', label: 'Всі категорії' },
    { value: 'consumer', label: 'Споживчі кредити' },
    { value: 'mortgage', label: 'Іпотечні кредити' },
    { value: 'auto', label: 'Автокредити' },
    { value: 'cards', label: 'Кредитні картки' }
  ];

  if (loading) {
    return (
      <div className="catalog-page">
        <div className="container">
          <div className="loading-state">
            <h2>Завантаження каталогу...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="catalog-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="breadcrumb">
            <Link to="/">Головна</Link> / <span>Каталог</span>
          </div>
          <h1>Каталог банківських послуг</h1>
          <p>Обирайте серед {banks.length} банків та {products.length} кредитних програм</p>
        </div>

        {/* Tabs */}
        <div className="catalog-tabs">
          <button 
            className={`tab-button ${activeTab === 'banks' ? 'active' : ''}`}
            onClick={() => handleTabChange('banks')}
          >
            🏦 Банки ({banks.length})
          </button>
          <button 
            className={`tab-button ${activeTab === 'loans' ? 'active' : ''}`}
            onClick={() => handleTabChange('loans')}
          >
            💳 Кредити ({products.length})
          </button>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters">
            <div className="filter-group">
              <label>Категорія:</label>
              <Select 
                options={categories}
                defaultValue="all"
                onChange={(value) => console.log('Category:', value)}
              />
            </div>
            <div className="filter-group">
              <label>Сортування:</label>
              <Select 
                options={[
                  { value: 'rating', label: 'За рейтингом' },
                  { value: 'name', label: 'За назвою' }
                ]}
                defaultValue="rating"
                onChange={(value) => console.log('Sort:', value)}
              />
            </div>
          </div>
          <div className="filter-actions">
            <SecondaryButton>
              🔄 Скинути
            </SecondaryButton>
          </div>
        </div>

        {/* Content */}
        <div className="catalog-content">
          {activeTab === 'banks' && (
            <div className="items-grid">
              {banks.map(bank => (
                <BankCard 
                  key={bank.id}
                  bank={bank}
                  onDetailsClick={() => console.log('Details:', bank.id)}
                  onCompareClick={() => console.log('Compare:', bank.id)}
                />
              ))}
            </div>
          )}

          {activeTab === 'loans' && (
            <div className="items-grid">
              {products.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onDetailsClick={() => console.log('Product details:', product.id)}
                  onApplyClick={() => console.log('Apply:', product.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Load More */}
        <div className="load-more-section">
          <PrimaryButton>
            Завантажити ще
          </PrimaryButton>
        </div>

      </div>
    </div>
  );
};

export default Catalog;