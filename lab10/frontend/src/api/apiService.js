import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const bankApi = {
  // Пошук банків з параметрами
  searchBanks: (params = {}) => api.get('/banks/search', { params }),
  
  // Отримати всі банки
  getAllBanks: () => api.get('/banks'),
  
  // Отримати банк по ID
  getBankById: (id) => api.get(`/banks/${id}`),
  
  // Отримати кредити банку
  getBankLoans: (bankId) => api.get(`/banks/${bankId}/loans`),
  
  // Отримати топ банки
  getTopBanks: () => api.get('/top-banks')
};

export const loanApi = {
  // Пошук кредитів з параметрами
  searchLoans: (params = {}) => api.get('/loans/search', { params }),
  
  // Отримати всі кредити
  getAllLoans: () => api.get('/loans'),
  
  // Отримати кредит по ID
  getLoanById: (id) => api.get(`/loans/${id}`),
  
  // Отримати топ кредити
  getTopLoans: () => api.get('/top-loans')
};

export const categoryApi = {
  // Отримати всі категорії
  getCategories: () => api.get('/categories')
};

// Експортуємо axios для використання в компонентах напряму при потребі
export { api as axiosInstance };