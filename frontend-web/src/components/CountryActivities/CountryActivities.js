import { useState, useEffect } from "react";
import "./CountryActivities.css"; // keep your original styles
import { Link } from "react-router-dom";

export default function CountryActivities({
  activities,
  editMode = false, // when true, show delete icons
  onDelete = () => {}, // callback(id)  <- parent handles DELETE API
}) {
  /* ---------- local 'heart' state --------------------------------- */
  const [favorites, setFavorites] = useState([]);

  /* reset hearts if activities array changes */
  useEffect(() => {
    setFavorites(activities.map((a) => a.liked ?? false));
  }, [activities]);

  const toggleFavorite = (idx) =>
    setFavorites((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });

  return (
    <div className="cards-container">
      {activities.map((a, i) => (
        <Link key={a._id} to={`/activities/${a._id}`} className="block">
          <div className="card" key={a._id || i}>
            {a.imageUrl && (
              <img src={a.imageUrl} alt={a.title} className="card-img" />
            )}

            <h2 className="card-title">{a.title}</h2>
            <p className="card-text">{a.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
