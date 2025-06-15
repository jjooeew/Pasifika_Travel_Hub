import React, { useState, useEffect } from 'react';
import './CountryActivities.css';

export default function CountryActivities({ countryName, description, activities }) {
 
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(activities.map(a => a.liked ?? false));
  }, [activities]);

 
  const toggleFavorite = index => {
    setFavorites(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };


  return (
    <div className="country-section">
      <div className="activities-header">
        <h1>{countryName}</h1>
        <p className="activities-description">{description}</p>
      </div>

      <div className="cards-container">
        {activities.map((a, i) => (
          <div className="card" key={i}>
            {a.imageURL && (
              <img
                src={a.imageURL}
                alt={a.title}
                className="card-img"
              />
            )}

            <h2 className="card-title">{a.title}</h2>
            <p className="card-text">{a.description}</p>

            <button
              className="favorite-icon"
              onClick={() => toggleFavorite(i)}
              aria-label={favorites[i] ? 'Un-favourite' : 'Favourite'}
            >
              {favorites[i] ? '❤️' : '♡'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
