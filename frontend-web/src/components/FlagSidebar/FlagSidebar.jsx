import React from 'react';
import './FlagSidebar.css';

const FlagSidebar = ({ countries, selectedCountry, onSelect }) => {
  return (
    <div className="sidebar">
      {countries.map((c) => (
        <img
          key={c.slug}                            
          src={c.flag}
          alt={`${c.name} flag`}
          className={`flag-img ${selectedCountry === c.slug ? 'active' : ''}`}
          onClick={() => onSelect(c.slug)}             
        />
      ))}
    </div>
  );
};

export default FlagSidebar;