import { ADD_TO_CART, REMOVE_FROM_CART, DECREMENT_ITEM, CLEAR_CART } from './types';

// Додати товар (або збільшити кількість)
export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

// Видалити товар повністю
export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

// Зменшити кількість на 1
export const decrementItem = (productId) => {
  return {
    type: DECREMENT_ITEM,
    payload: productId,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};