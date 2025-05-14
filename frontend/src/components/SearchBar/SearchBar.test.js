// src/__tests__/SearchBar.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar'; 

describe('SearchBar Component', () => {

  // Test for rendering the SearchBar component
  test('should render search input and region select', () => {
    render(<SearchBar onSearch={jest.fn()} onRegionChange={jest.fn()} />);

    // Check if the search input and region select are rendered
    expect(screen.getByPlaceholderText('Search for a country...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();  // Region select is a combobox
  });

  // Test for the search input functionality
  test('should call onSearch when typing in the search input', () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} onRegionChange={jest.fn()} />);

    const input = screen.getByPlaceholderText('Search for a country...');
    
    // Simulate typing 'Canada' in the search input
    fireEvent.change(input, { target: { value: 'Canada' } });

    // Check if onSearch was called with the correct value
    expect(onSearch).toHaveBeenCalledWith('Canada');
  });

  // Test for the region select dropdown functionality
  test('should call onRegionChange when a region is selected', () => {
    const onRegionChange = jest.fn();
    render(<SearchBar onSearch={jest.fn()} onRegionChange={onRegionChange} />);

    const regionSelect = screen.getByRole('combobox');

    // Simulate selecting 'Africa'
    fireEvent.change(regionSelect, { target: { value: 'Africa' } });

    // Check if onRegionChange was called with the correct region
    expect(onRegionChange).toHaveBeenCalledWith('Africa');
  });

  // Test for the default selection being 'All Regions'
  test('should have "All Regions" selected by default', () => {
    render(<SearchBar onSearch={jest.fn()} onRegionChange={jest.fn()} />);

    const regionSelect = screen.getByRole('combobox');
    
    // Check if 'All Regions' is the default value
    expect(regionSelect.value).toBe('All Regions');
  });
});
