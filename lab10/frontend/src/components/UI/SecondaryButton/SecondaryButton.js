import React from 'react';
import './SecondaryButton.css';

const SecondaryButton = ({ children, onClick, disabled = false, type = 'button' }) => {
  return (
    <button 
      className={`secondary-button ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;