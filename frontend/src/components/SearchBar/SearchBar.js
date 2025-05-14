// src/components/SearchBar.js
import React from 'react';
import './SearchBar.css';

const regions = [
  'All Regions',
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania'
];

const SearchBar = ({ onSearch, onRegionChange }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleRegionSelect = (e) => {
    const region = e.target.value;
    onRegionChange(region === 'All Regions' ? '' : region);
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search for a country..."
          onChange={handleSearchChange}
          className="search-input"
        />
        <i className="fas fa-search search-icon"></i>
      </div>
      <select 
        onChange={handleRegionSelect}
        className="region-select"
        defaultValue="All Regions"
      >
        {regions.map(region => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
