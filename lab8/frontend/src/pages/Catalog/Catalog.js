import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BankCard from '../../components/BankCard/BankCard';
import PrimaryButton from '../../components/UI/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton/SecondaryButton';
import Select from '../../components/UI/Select/Select';
import './Catalog.css';

const Catalog = () => {
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    rating: 'all',
    sortBy: 'rating'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const banksResponse = await fetch('http://localhost:5000/api/all-banks');
        const banksData = await banksResponse.json();
        setBanks(banksData);
        setFilteredBanks(banksData);
      } catch (error) {
        console.error('Помилка завантаження:', error);
        setBanks([]);
        setFilteredBanks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Фільтрація та пошук
  useEffect(() => {
    const applyFilters = () => {
      let filteredList = [...banks];

      // Пошук
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredList = filteredList.filter(bank => {
          const nameMatch = bank.name.toLowerCase().includes(term);
          const productsMatch = bank.products.some(product => 
            product.toLowerCase().includes(term)
          );
          return nameMatch || productsMatch;
        });
      }

      // Фільтрація за рейтингом
      if (filters.rating !== 'all') {
        filteredList = filteredList.filter(bank => {
          if (filters.rating === '4+') return bank.rating >= 4;
          if (filters.rating === '3+') return bank.rating >= 3;
          return true;
        });
      }

      // Сортування
      if (filters.sortBy === 'rating') {
        filteredList.sort((a, b) => b.rating - a.rating);
      } else if (filters.sortBy === 'name') {
        filteredList.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filters.sortBy === 'clients') {
        filteredList.sort((a, b) => b.clients - a.clients);
      }

      setFilteredBanks(filteredList);
    };

    applyFilters();
  }, [banks, searchTerm, filters]);

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
      rating: 'all',
      sortBy: 'rating'
    });
  };

  const ratingFilters = [
    { value: 'all', label: 'Всі рейтинги' },
    { value: '4+', label: '4+ зірок' },
    { value: '3+', label: '3+ зірок' }
  ];

  const sortOptions = [
    { value: 'rating', label: 'За рейтингом' },
    { value: 'name', label: 'За назвою' },
    { value: 'clients', label: 'За кількістю клієнтів' }
  ];

  if (loading) {
    return (
      <div className="catalog-page">
        <div className="container">
          <div className="loading-state">
            <h2>Завантаження банків...</h2>
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
            <Link to="/">Головна</Link> / <span>Усі банки</span>
          </div>
          <h1>Усі банки України</h1>
          <p>Обирайте серед {banks.length} перевірених фінансових установ</p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Пошук банків або послуг..."
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
              🔄 Скинути фільтри
            </SecondaryButton>
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <p>Знайдено {filteredBanks.length} банків</p>
        </div>

        {/* Banks Grid */}
        <div className="catalog-content">
          <div className="banks-grid">
            {filteredBanks.length > 0 ? (
              filteredBanks.map(bank => (
                <BankCard 
                  key={bank.id}
                  bank={bank}
                  onDetailsClick={() => window.location.href = `/bank/${bank.id}`}
                  onCompareClick={() => console.log('Compare:', bank.id)}
                />
              ))
            ) : (
              <div className="no-results">
                <h3>Банків не знайдено</h3>
                <p>Спробуйте змінити критерії пошуку або фільтрації</p>
              </div>
            )}
          </div>
        </div>

        {/* Load More */}
        <div className="load-more-section">
          <PrimaryButton>
            Завантажити ще банки
          </PrimaryButton>
        </div>

      </div>
    </div>
  );
};

export default Catalog;