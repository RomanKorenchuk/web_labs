import React from 'react';
import './Select.css';

const Select = ({ options, defaultValue, onChange, label }) => {
  return (
    <div className="select-container">
      {label && <label className="select-label">{label}</label>}
      <select 
        className="select"
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;