import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">🏦</span>
              <div className="logo-text">
                <h3>BankCompare</h3>
                <p>Найкращий вибір банківських послуг</p>
              </div>
            </div>
            <p className="footer-description">
              Порівнюйте банки України за реальними показниками: кількість клієнтів, 
              видані кредити, рейтинги та відгуки. Знаходьте найвигідніші пропозиції.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">💼</a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Банки</h4>
              <ul>
                <li><a href="#">Усі банки</a></li>
                <li><a href="#">Топ-10 банків</a></li>
                <li><a href="#">Нові банки</a></li>
                <li><a href="#">Рейтинги</a></li>
                <li><a href="#">Відгуки</a></li>
              </ul>
            </div>
            
            <div className="link-group">
              <h4>Кредити</h4>
              <ul>
                <li><a href="#">Споживчі кредити</a></li>
                <li><a href="#">Іпотечні кредити</a></li>
                <li><a href="#">Автокредити</a></li>
                <li><a href="#">Кредитні картки</a></li>
                <li><a href="#">Рефінансування</a></li>
              </ul>
            </div>
            
            <div className="link-group">
              <h4>Інформація</h4>
              <ul>
                <li><a href="#">Про нас</a></li>
                <li><a href="#">Контакти</a></li>
                <li><a href="#">Допомога</a></li>
                <li><a href="#">Блог</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            
            <div className="link-group">
              <h4>Контакти</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>0-800-123-456</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span>info@bankcompare.ua</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🏢</span>
                  <span>Київ, вул. Банківська, 1</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🕒</span>
                  <span>Пн-Пт: 9:00-18:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2024 BankCompare. Всі права захищені.</p>
            </div>
            <div className="footer-bottom-links">
              <a href="#">Політика конфіденційності</a>
              <a href="#">Умови використання</a>
              <a href="#">Cookie</a>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;