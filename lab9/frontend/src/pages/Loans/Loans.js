import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import PrimaryButton from '../../components/UI/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton/SecondaryButton';
import Select from '../../components/UI/Select/Select';
import Spinner from '../../components/Spinner/Spinner';
import { loanApi } from '../../api/apiService';
import './Loans.css';

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    sortBy: 'rate'
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Завантаження всіх кредитів при першому рендері
  useEffect(() => {
    const fetchInitialLoans = async () => {
      try {
        setLoading(true);
        const response = await loanApi.getAllLoans();
        setLoans(response.data);
        setSearchResults(response.data);
        setSearchError(null);
      } catch (error) {
        console.error('Помилка завантаження:', error);
        setSearchError('Не вдалося завантажити кредити. Спробуйте ще раз.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialLoans();
  }, []);

  // Функція пошуку кредитів
  const searchLoans = useCallback(async (searchParams) => {
    try {
      setIsSearching(true);
      setSearchError(null);
      const response = await loanApi.searchLoans(searchParams);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Помилка пошуку:', error);
      setSearchError('Помилка пошуку. Спробуйте ще раз.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Обробка зміни пошукового запиту з debounce
useEffect(() => {
    const params = {
      ...(searchTerm.trim() && { q: searchTerm.trim() }),
      ...(filters.category !== 'all' && { category: filters.category }),
      sortBy: filters.sortBy
    };

    // Миттєвий запит без затримок
    searchLoans(params);

  }, [searchTerm, filters, searchLoans]);

  // Обробка зміни фільтрів
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Скидання всіх фільтрів
  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      category: 'all',
      sortBy: 'rate'
    });
    setSearchResults(loans);
    setSearchError(null);
  };

  // Обробка відправки форми пошуку
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = {
      ...(searchTerm && { q: searchTerm }),
      ...(filters.category !== 'all' && { category: filters.category }),
      ...(filters.sortBy && { sortBy: filters.sortBy })
    };
    searchLoans(params);
  };

  // Опції для фільтрів
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
    { value: 'popularity', label: 'За популярністю' },
    { value: 'amount', label: 'За сумою кредиту' }
  ];

  if (loading) {
    return (
      <div className="loans-page">
        <div className="container">
          <Spinner text="Завантаження кредитів..." />
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
          <h1>Пошук кредитних пропозицій</h1>
          <p>Знайдено {searchResults.length} кредитів серед {loans.length} доступних</p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <form onSubmit={handleSearchSubmit}>
            <div className="search-box">
              <input
                type="text"
                placeholder="Пошук кредитів, банків, опису..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-btn">
                {isSearching ? '⏳' : '🔍'}
              </button>
            </div>
          </form>
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
              Скинути фільтри
            </SecondaryButton>
          </div>
        </div>

        {/* Search Status */}
        <div className="search-status">
          {isSearching ? (
            <div className="searching-indicator">
              <span className="spinner-small"></span>
              Пошук кредитів...
            </div>
          ) : searchError ? (
            <div className="search-error">
              ⚠️ {searchError}
            </div>
          ) : searchTerm || filters.category !== 'all' ? (
            <p>
              Результати пошуку: {searchResults.length} кредитів
              {searchTerm && <> для "<strong>{searchTerm}</strong>"</>}
            </p>
          ) : (
            <p>Всі доступні кредити</p>
          )}
        </div>

        {/* Products Grid */}
        <div className="loans-content">
          {searchResults.length > 0 ? (
            <div className="products-grid">
              {searchResults.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onDetailsClick={() => window.location.href = `/loan/${product.id}`}
                  onApplyClick={() => console.log('Apply:', product.id)}
                />
              ))}
            </div>
          ) : !isSearching && !searchError ? (
            <div className="no-results">
              <h3>Кредитів не знайдено</h3>
              <p>Спробуйте змінити критерії пошуку або фільтрації</p>
              <PrimaryButton onClick={resetFilters}>
                Показати всі кредити
              </PrimaryButton>
            </div>
          ) : null}
        </div>

        {/* Load More */}
        <div className="load-more-section">
          <PrimaryButton onClick={() => console.log('Load more')}>
            Завантажити ще кредити
          </PrimaryButton>
        </div>

      </div>
    </div>
  );
};

export default Loans;