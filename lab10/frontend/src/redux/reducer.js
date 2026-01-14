import { ADD_TO_CART, REMOVE_FROM_CART, DECREMENT_ITEM, CLEAR_CART } from './types';

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Перевіряємо, чи є вже такий товар у кошику
      const existItem = state.cartItems.find((x) => x.id === action.payload.id);

      if (existItem) {
        // Якщо є - збільшуємо кількість (quantity)
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === existItem.id ? { ...x, quantity: x.quantity + 1 } : x
          ),
        };
      } else {
        // Якщо немає - додаємо новий з quantity: 1
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }

    case DECREMENT_ITEM:
      const itemToDec = state.cartItems.find((x) => x.id === action.payload);
      if (itemToDec.quantity === 1) {
        // Якщо кількість 1, то видаляємо товар повністю
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x.id !== action.payload),
        };
      } else {
        // Інакше зменшуємо кількість на 1
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === action.payload ? { ...x, quantity: x.quantity - 1 } : x
          ),
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };



    default:
      return state;
  }
};

export default cartReducer;