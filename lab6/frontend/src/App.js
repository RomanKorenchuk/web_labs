import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/banks" element={<Catalog />} />
            <Route path="/loans" element={<Catalog />} />
            <Route path="/compare" element={<Catalog />} />
            <Route path="/calculator" element={<Catalog />} />
            <Route path="/help" element={<Catalog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;