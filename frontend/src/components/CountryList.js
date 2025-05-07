// src/components/CountryList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import './CountryList.css';

const CountryList = ({ searchTerm, selectedRegion }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        let url = 'https://restcountries.com/v3.1/all';
        
        if (selectedRegion) {
          url = `https://restcountries.com/v3.1/region/${selectedRegion}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch countries');
        
        const data = await response.json();
        setCountries(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [selectedRegion]);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFavoriteClick = (e, country) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(country.cca3)) {
      removeFromFavorites(country.cca3);
    } else {
      addToFavorites(country);
    }
  };

  if (loading) return <div className="loading">Loading countries...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="country-grid">
      {filteredCountries.map(country => (
        <Link 
          to={`/country/${country.cca3}`} 
          key={country.cca3}
          className="country-card"
        >
          <div className="country-flag">
            <img src={country.flags.svg} alt={`${country.name.common} flag`} />
          </div>
          <div className="country-info">
            <h2>{country.name.common}</h2>
            <div className="country-details">
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            </div>
          </div>
          <button
            className={`favorite-btn ${isFavorite(country.cca3) ? 'active' : ''}`}
            onClick={(e) => handleFavoriteClick(e, country)}
            aria-label={`${isFavorite(country.cca3) ? 'Remove from' : 'Add to'} favorites`}
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default CountryList;
