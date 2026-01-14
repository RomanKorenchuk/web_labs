import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import BankCard from '../../components/BankCard/BankCard';
import PrimaryButton from '../../components/UI/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton/SecondaryButton';
import Select from '../../components/UI/Select/Select';
import Spinner from '../../components/Spinner/Spinner';
import { bankApi } from '../../api/apiService';
import './Catalog.css';

const Catalog = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    rating: 'all',
    sortBy: 'rating'
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Завантаження всіх банків при першому рендері
  useEffect(() => {
    const fetchInitialBanks = async () => {
      try {
        setLoading(true);
        const response = await bankApi.getAllBanks();
        setBanks(response.data);
        setSearchResults(response.data);
        setSearchError(null);
      } catch (error) {
        console.error('Помилка завантаження:', error);
        setSearchError('Не вдалося завантажити банки. Спробуйте ще раз.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialBanks();
  }, []);

  // Функція пошуку банків
  const searchBanks = useCallback(async (searchParams) => {
    try {
      setIsSearching(true);
      setSearchError(null);
      const response = await bankApi.searchBanks(searchParams);
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
    // Формуємо параметри
    const params = {
      // Якщо рядок пошуку не пустий - додаємо його
      ...(searchTerm.trim() && { q: searchTerm.trim() }),
      
      // Якщо рейтинг не 'all' - додаємо фільтр
      ...(filters.rating !== 'all' && { 
        minRating: filters.rating === '4+' ? 4 : 3 
      }),
      
      // Сортування відправляємо ЗАВЖДИ
      sortBy: filters.sortBy
    };

    // Відправляємо запит миттєво, без таймерів
    searchBanks(params);

  }, [searchTerm, filters, searchBanks]);
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
      rating: 'all',
      sortBy: 'rating'
    });
    setSearchResults(banks);
    setSearchError(null);
  };

  // Обробка відправки форми пошуку
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = {
      ...(searchTerm && { q: searchTerm }),
      ...(filters.rating !== 'all' && { 
        minRating: filters.rating === '4+' ? 4 : 3 
      }),
      ...(filters.sortBy && { sortBy: filters.sortBy })
    };
    searchBanks(params);
  };

  const ratingFilters = [
    { value: 'all', label: 'Всі рейтинги' },
    { value: '4+', label: '4+ ⭐' },
    { value: '3+', label: '3+ ⭐' }
  ];

  const sortOptions = [
    { value: 'rating', label: 'За рейтингом' },
    { value: 'name', label: 'За назвою' },
    { value: 'clients', label: 'За клієнтами' },
    { value: 'loans', label: 'За кредитами' }
  ];

  if (loading) {
    return (
      <div className="catalog-page">
        <div className="container">
          <Spinner text="Завантаження банків..." />
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
            <Link to="/">Головна</Link> / <span>Усі банки</span>
          </div>
          <h1>Пошук банків України</h1>
          <p>Знайдено {searchResults.length} банків серед {banks.length} доступних</p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <form onSubmit={handleSearchSubmit}>
            <div className="search-box">
              <input
                type="text"
                placeholder="Пошук банків, послуг, опису..."
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
              <label>Рейтинг:</label>
              <Select 
                options={ratingFilters}
                value={filters.rating}
                onChange={(value) => handleFilterChange('rating', value)}
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
              Пошук банків...
            </div>
          ) : searchError ? (
            <div className="search-error">
              ⚠️ {searchError}
            </div>
          ) : searchTerm || filters.rating !== 'all' ? (
            <p>
              Результати пошуку: {searchResults.length} банків
              {searchTerm && <> для "<strong>{searchTerm}</strong>"</>}
            </p>
          ) : (
            <p>Всі доступні банки</p>
          )}
        </div>

        {/* Banks Grid */}
        <div className="catalog-content">
          {searchResults.length > 0 ? (
            <div className="banks-grid">
              {searchResults.map(bank => (
                <BankCard 
                  key={bank.id}
                  bank={bank}
                  onDetailsClick={() => window.location.href = `/bank/${bank.id}`}
                  onCompareClick={() => console.log('Compare:', bank.id)}
                />
              ))}
            </div>
          ) : !isSearching && !searchError ? (
            <div className="no-results">
              <h3>Банків не знайдено</h3>
              <p>Спробуйте інший пошуковий запит або змініть фільтри</p>
              <PrimaryButton onClick={resetFilters}>
                Показати всі банки
              </PrimaryButton>
            </div>
          ) : null}
        </div>

        {/* Load More */}
        <div className="load-more-section">
          <PrimaryButton onClick={() => console.log('Load more')}>
            Завантажити ще банки
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Catalog;