// src/components/CountryList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CountryList.css';

const CountryList = ({ searchTerm, selectedRegion }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        </Link>
      ))}
    </div>
  );
};

export default CountryList;
