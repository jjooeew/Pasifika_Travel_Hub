import React from 'react';
import './FlagSidebar.css';

const FlagSidebar = ({ countries, selectedCountry, onSelect }) => {
  return (
    <div className="sidebar">
      {countries.map((country) => (
        <img
          key={country.name}
          src={country.flag}
          alt={`${country.name} flag`}
          className={`flag-img ${selectedCountry === country.name ? 'active' : ''}`}
          onClick={() => onSelect(country.name)}
        />
      ))}
    </div>
  );
};

export default FlagSidebar;