import { legacy_createStore as createStore } from 'redux';
import cartReducer from './reducer';

// 1. Функція завантаження стану з localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return undefined; 
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// 2. Функція збереження стану в localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
    console.error("Не вдалося зберегти стан", err);
  }
};

// 3. Створюємо Store, передаючи завантажений стан другим аргументом
const persistedState = loadState();

const store = createStore(
  cartReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// 4. Підписуємось на зміни Store
store.subscribe(() => {
  saveState({
    cartItems: store.getState().cartItems
  });
});

export default store;