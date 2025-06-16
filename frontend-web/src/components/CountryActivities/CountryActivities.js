import React, { useState } from 'react';
import './CountryActivities.css';

const CountryActivities = ({ countryName, description, activities }) => {
  const [favorites, setFavorites] = useState(Array(activities.length).fill(false));

  const toggleFavorite = (index) => {
    const updated = [...favorites];
    updated[index] = !updated[index];
    setFavorites(updated);
  };

  return (
    <div className="country-section">
      <div className="activities-header">
        <h1>{countryName}</h1>
        <p className="activities-description">{description}</p>
      </div>

      <div className="cards-container">
        {activities.map((activity, index) => (
          <div className="card" key={index}>
            <img src={activity.img} alt={activity.title} />
            <h2 className="card-title">{activity.title}</h2>
            <p className="card-text">{activity.text}</p>
            <div className="favorite-icon" onClick={() => toggleFavorite(index)}>
              {favorites[index] ? '❤️' : '♡'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryActivities;

