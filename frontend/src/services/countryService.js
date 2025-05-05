// src/services/countryService.js
import axios from 'axios';

export const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
};

export const fetchCountryByName = async (name) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    return response.data[0];
  } catch (error) {
    console.error(`Error fetching country by name: ${name}`, error);
  }
};
