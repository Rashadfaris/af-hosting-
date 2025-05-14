import { render, screen, fireEvent } from '@testing-library/react';
import CountryList from '../CountryList/CountryList';  // Use the correct path based on the actual folder structure

import { MemoryRouter } from 'react-router-dom'; 
import { FavoritesProvider } from '../context/FavoritesContext'; 

// Mock the fetch call
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { cca3: 'CAN', name: { common: 'Canada' }, flags: { svg: 'https://flagcdn.com/ca.svg' }, population: 38005238, region: 'Americas', capital: ['Ottawa'] },
      { cca3: 'USA', name: { common: 'United States' }, flags: { svg: 'https://flagcdn.com/us.svg' }, population: 331002651, region: 'Americas', capital: ['Washington, D.C.'] },
    ])
  })
);

describe('CountryList Component', () => {
  test('should render countries', async () => {
    render(
      <FavoritesProvider>
        <MemoryRouter>
          <CountryList searchTerm="" selectedRegion="" />
        </MemoryRouter>
      </FavoritesProvider>
    );

    // Replace waitFor + getByText with findByText
    const canadaText = await screen.findByText('Canada');
    expect(canadaText).toBeInTheDocument();
    
    const usaText = await screen.findByText('United States');
    expect(usaText).toBeInTheDocument();
  });

  test('should show error if fetch fails', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch countries'))
    );

    render(
      <FavoritesProvider>
        <MemoryRouter>
          <CountryList searchTerm="" selectedRegion="" />
        </MemoryRouter>
      </FavoritesProvider>
    );

    // Replace waitFor + getByText with findByText
    const errorText = await screen.findByText(/Error: Failed to fetch countries/i);
    expect(errorText).toBeInTheDocument();
  });

  test('should filter countries based on search term', async () => {
    render(
      <FavoritesProvider>
        <MemoryRouter>
          <CountryList searchTerm="Canada" selectedRegion="" />
        </MemoryRouter>
      </FavoritesProvider>
    );

    // Replace waitFor + getByText with findByText
    const canadaText = await screen.findByText('Canada');
    expect(canadaText).toBeInTheDocument();

    // Check if United States is not displayed since it doesn't match search term
    const usaText = screen.queryByText('United States');
    expect(usaText).not.toBeInTheDocument();
  });

  test('should toggle favorite on click', async () => {
    render(
      <FavoritesProvider>
        <MemoryRouter>
          <CountryList searchTerm="" selectedRegion="" />
        </MemoryRouter>
      </FavoritesProvider>
    );

    // Find the favorite button for Canada
    const favoriteButton = screen.getAllByLabelText(/Add to favorites/)[0];

    // Simulate a click to add to favorites
    fireEvent.click(favoriteButton);

    // Check if the button is now marked as active (it will have the 'active' class)
    expect(favoriteButton).toHaveClass('active');

    // Simulate a click to remove from favorites
    fireEvent.click(favoriteButton);

    // Check if the button is no longer active
    expect(favoriteButton).not.toHaveClass('active');
  });
});
