import React from 'react';
import './Spinner.css';

const Spinner = ({ fullScreen = false, text = 'Завантаження...' }) => {
  if (fullScreen) {
    return (
      <div className="spinner-overlay">
        <div className="spinner-container">
          <div className="spinner"></div>
          <div className="spinner-text">{text}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      {text && <div className="spinner-text">{text}</div>}
    </div>
  );
};

export default Spinner;