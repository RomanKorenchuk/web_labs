import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, decrementItem, removeFromCart, clearCart } from '../../redux/actions';
import PrimaryButton from '../../components/UI/PrimaryButton/PrimaryButton';
import './Cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.maxAmount * item.quantity), 0);

  const handleCheckout = () => {
    alert(' Дякуємо! Ваші заявки успішно відправлено на обробку.');
    dispatch(clearCart());
  };

  return (
    <div className="cart-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Головна</Link> / <span>Кошик</span>
        </div>

        <h1 className="cart-title">Ваш кошик заявок ({cartItems.length})</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <span className="empty-cart-icon">🛒</span>
            <h2>Кошик порожній</h2>
            <p>Перегляньте каталог кредитів, щоб додати цікаві пропозиції</p>
            <Link to="/loans" style={{display: 'inline-block', marginTop: '1rem', textDecoration: 'none'}}>
               <PrimaryButton>Перейти до кредитів</PrimaryButton>
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <div className="item-image">{item.image || '📄'}</div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-bank">{item.bankName}</p>
                      
                      {item.selectedBenefit && (
                        <div style={{ 
                          marginTop: '0.5rem', 
                          display: 'inline-block',
                          background: '#e8f5e9', 
                          color: '#2e7d32', 
                          padding: '0.2rem 0.6rem', 
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          border: '1px solid #c8e6c9'
                        }}>
                          {item.selectedBenefit}
                        </div>
                      )}

                      <p style={{fontSize: '0.8rem', color: '#7f8c8d', marginTop: '0.3rem'}}>
                        Ставка: {item.interestRate}%
                      </p>
                    </div>
                  </div>

                  <div className="item-quantity">
                    <button className="qty-btn" onClick={() => dispatch(decrementItem(item.id))}>-</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => dispatch(addToCart(item))}>+</button>
                  </div>

                  <div className="item-actions">
                    <div className="item-price">
                      {(item.maxAmount * item.quantity).toLocaleString()} грн
                    </div>
                    <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))} title="Видалити">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Загальна сума кредитів:</span>
                <strong>{totalAmount.toLocaleString()} грн</strong>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Оформити всі заявки
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;