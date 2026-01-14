import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import PrimaryButton from '../../components/UI/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton/SecondaryButton';
import Select from '../../components/UI/Select/Select';
import './Loans.css';

const Loans = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    sortBy: 'rate'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loansResponse = await fetch('http://localhost:5000/api/all-loans');
        const loansData = await loansResponse.json();
        setProducts(loansData);
        setFilteredProducts(loansData);
      } catch (error) {
        console.error('Помилка завантаження:', error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Фільтрація та пошук
  useEffect(() => {
    const applyFilters = () => {
      let filteredList = [...products];

      // Пошук
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredList = filteredList.filter(product => {
          const nameMatch = product.name.toLowerCase().includes(term);
          const bankMatch = product.bankName.toLowerCase().includes(term);
          return nameMatch || bankMatch;
        });
      }

      // Фільтрація за категорією
      if (filters.category !== 'all') {
        filteredList = filteredList.filter(product => 
          product.category === filters.category
        );
      }

      // Сортування
      if (filters.sortBy === 'rate') {
        filteredList.sort((a, b) => a.interestRate - b.interestRate);
      } else if (filters.sortBy === 'name') {
        filteredList.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filters.sortBy === 'popularity') {
        filteredList.sort((a, b) => b.popularity - a.popularity);
      }

      setFilteredProducts(filteredList);
    };

    applyFilters();
  }, [products, searchTerm, filters]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      category: 'all',
      sortBy: 'rate'
    });
  };

  const categories = [
    { value: 'all', label: 'Всі кредити' },
    { value: 'consumer', label: 'Споживчі кредити' },
    { value: 'mortgage', label: 'Іпотечні кредити' },
    { value: 'auto', label: 'Автокредити' },
    { value: 'cards', label: 'Кредитні картки' },
    { value: 'business', label: 'Бізнес-кредити' },
    { value: 'agriculture', label: 'Агрокредити' },
    { value: 'education', label: 'Освітні кредити' }
  ];

  const sortOptions = [
    { value: 'rate', label: 'За процентною ставкою' },
    { value: 'name', label: 'За назвою' },
    { value: 'popularity', label: 'За популярністю' }
  ];

  if (loading) {
    return (
      <div className="loans-page">
        <div className="container">
          <div className="loading-state">
            <h2>Завантаження кредитів...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="loans-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="breadcrumb">
            <Link to="/">Головна</Link> / <span>Кредитні пропозиції</span>
          </div>
          <h1>Кредитні пропозиції</h1>
          <p>Обирайте серед {products.length} кредитних програм від партнерських банків</p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Пошук кредитів або банків..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="filters-bar">
          <div className="filters-left">
            <div className="filter-group">
              <label>Тип кредиту:</label>
              <Select 
                options={categories}
                value={filters.category}
                onChange={(value) => handleFilterChange('category', value)}
              />
            </div>
            <div className="filter-group">
              <label>Сортування:</label>
              <Select 
                options={sortOptions}
                value={filters.sortBy}
                onChange={(value) => handleFilterChange('sortBy', value)}
              />
            </div>
          </div>
          <div className="filters-right">
            <SecondaryButton onClick={resetFilters}>
              🔄 Скинути фільтри
            </SecondaryButton>
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <p>Знайдено {filteredProducts.length} кредитів</p>
        </div>

        {/* Products Grid */}
        <div className="loans-content">
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onDetailsClick={() => window.location.href = `/loan/${product.id}`}
                  onApplyClick={() => console.log('Apply:', product.id)}
                />
              ))
            ) : (
              <div className="no-results">
                <h3>Кредитів не знайдено</h3>
                <p>Спробуйте змінити критерії пошуку або фільтрації</p>
              </div>
            )}
          </div>
        </div>

        {/* Load More */}
        <div className="load-more-section">
          <PrimaryButton>
            Завантажити ще кредити
          </PrimaryButton>
        </div>

      </div>
    </div>
  );
};

export default Loans;