import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CountryDetails.css';

const CountryDetails = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
        if (!response.ok) throw new Error('Failed to fetch country details');
        
        const data = await response.json();
        setCountry(data[0]);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading country details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!country) return <div className="error">Country not found</div>;

  const formatLanguages = (languages) => {
    return languages ? Object.values(languages).join(', ') : 'N/A';
  };

  const formatCurrencies = (currencies) => {
    if (!currencies) return 'N/A';
    return Object.values(currencies)
      .map(currency => `${currency.name} (${currency.symbol})`)
      .join(', ');
  };

  return (
    <div className="country-details-container">
      <Link to="/" className="back-button">
        <i className="fas fa-arrow-left"></i> Back
      </Link>
      
      <div className="country-details-content">
        <div className="country-flag-large">
          <img src={country.flags.svg} alt={`${country.name.common} flag`} />
        </div>
        
        <div className="country-info-detailed">
          <h1>{country.name.common}</h1>
          
          <div className="country-info-grid">
            <div className="info-section">
              <p><strong>Native Name:</strong> {Object.values(country.name.nativeName || {})[0]?.common || country.name.common}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Sub Region:</strong> {country.subregion || 'N/A'}</p>
              <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            </div>
            
            <div className="info-section">
              <p><strong>Top Level Domain:</strong> {country.tld?.join(', ') || 'N/A'}</p>
              <p><strong>Currencies:</strong> {formatCurrencies(country.currencies)}</p>
              <p><strong>Languages:</strong> {formatLanguages(country.languages)}</p>
            </div>
          </div>
          
          {country.borders && (
            <div className="border-countries">
              <h3>Border Countries:</h3>
              <div className="border-buttons">
                {country.borders.map(border => (
                  <Link 
                    key={border} 
                    to={`/country/${border}`}
                    className="border-button"
                  >
                    {border}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
