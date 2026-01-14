import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import Loans from './pages/Loans/Loans';
import BankItem from './pages/BankItem/BankItem';
import LoanItem from './pages/LoanItem/LoanItem';
import Cart from './pages/Cart/Cart';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/bank/:id" element={<BankItem />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/loan/:id" element={<LoanItem />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* Сторінка 404 для неіснуючих маршрутів */}
          <Route path="*" element={
            <div style={{textAlign: 'center', padding: '5rem'}}>
              <h2>404 - Сторінку не знайдено</h2>
            </div>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;