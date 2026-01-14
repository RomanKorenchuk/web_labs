import React from 'react';
import './PrimaryButton.css';

const PrimaryButton = ({ children, onClick, disabled = false, type = 'button' }) => {
  return (
    <button 
      className={`primary-button ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;