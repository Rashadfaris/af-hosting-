// src/__tests__/CountryCard.test.js
import { render, screen } from '@testing-library/react';
import CountryCard from './CountryCard'; 

// Mock data for a country
const mockCountry = {
  flags: { png: 'https://example.com/flag.png' },
  name: { common: 'Canada' },
  capital: 'Ottawa',
};

describe('CountryCard', () => {
  test('renders country name, capital, and flag', () => {
    // Render the component with mock data
    render(<CountryCard country={mockCountry} />);

    // Check if the country name is in the document
    expect(screen.getByText(/Canada/i)).toBeInTheDocument();
    
    // Check if the capital is in the document
    expect(screen.getByText(/Ottawa/i)).toBeInTheDocument();

    // Check if the flag image is in the document
    const flagImage = screen.getByAltText(/Canada/i); 
    expect(flagImage).toHaveAttribute('src', 'https://example.com/flag.png');
  });
});
