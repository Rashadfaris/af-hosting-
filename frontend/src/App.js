// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './components/CountryList';
import CountryDetails from './pages/CountryDetails';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedRegion, setSelectedRegion] = React.useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <h1>Global Explorer</h1>
            <p>Discover countries around the world</p>
          </div>
        </header>
        <main className="app-main">
          <div className="search-container">
            <SearchBar onSearch={handleSearch} onRegionChange={handleRegionChange} />
          </div>
          <Routes>
            <Route 
              path="/" 
              element={
                <CountryList 
                  searchTerm={searchTerm} 
                  selectedRegion={selectedRegion}
                />
              } 
            />
            <Route path="/country/:id" element={<CountryDetails />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>© 2024 Global Explorer - Your Window to the World</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
