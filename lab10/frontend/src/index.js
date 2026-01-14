import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Імпорт Provider
import store from './redux/store';      // Імпорт нашого Store
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Передаємо store у Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);