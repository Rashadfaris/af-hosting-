import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import './Favorites.css';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No Favorite Countries Yet</h2>
        <p>Start adding countries to your favorites to see them here!</p>
        <Link to="/" className="browse-countries-btn">Browse Countries</Link>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h2>Favorite Countries</h2>
      <div className="favorites-grid">
        {favorites.map(country => (
          <div key={country.cca3} className="favorite-card">
            <Link to={`/country/${country.cca3}`} className="favorite-link">
              <div className="favorite-flag">
                <img src={country.flags.svg} alt={`${country.name.common} flag`} />
              </div>
              <div className="favorite-info">
                <h3>{country.name.common}</h3>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
              </div>
            </Link>
            <button
              className="remove-favorite-btn"
              onClick={() => removeFromFavorites(country.cca3)}
              aria-label={`Remove ${country.name.common} from favorites`}
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites; 