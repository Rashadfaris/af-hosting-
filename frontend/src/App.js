// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CountryList from './components/CountryList';
import CountryDetails from './pages/CountryDetails';
import Favorites from './pages/Favorites';
import SearchBar from './components/SearchBar';
import { FavoritesProvider } from './context/FavoritesContext';
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
    <FavoritesProvider>
      <Router>
        <div className="App">
          <header className="app-header">
            <div className="header-content">
              <div className="header-main">
                <h1>Global Explorer</h1>
                <p>Discover countries around the world</p>
              </div>
              <nav className="header-nav">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">
                  <i className="fas fa-heart"></i> Favorites
                </Link>
              </nav>
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
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>© 2024 Global Explorer - Your Window to the World</p>
          </footer>
        </div>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
