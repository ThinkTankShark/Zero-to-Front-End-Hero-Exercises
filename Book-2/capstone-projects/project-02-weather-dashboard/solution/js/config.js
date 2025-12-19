/**
 * config.js - Configuration
 * API keys and settings
 *
 * IMPORTANT: Get your own API key from https://openweathermap.org/
 * Sign up for free and replace 'YOUR_API_KEY_HERE' with your actual key
 */

const CONFIG = {
  // OpenWeatherMap API Key
  // Replace with your own key!
  API_KEY: 'YOUR_API_KEY_HERE',

  // Base URLs
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  ICON_URL: 'https://openweathermap.org/img/wn',

  // Default settings
  DEFAULT_CITY: 'London',
  UNITS: 'metric', // metric (Celsius) or imperial (Fahrenheit)

  // localStorage keys
  STORAGE_KEYS: {
    FAVORITES: 'weatherFavorites',
    RECENT: 'recentSearches',
    TEMP_UNIT: 'tempUnit',
    LAST_CITY: 'lastCity'
  },

  // Limits
  MAX_RECENT: 5,
  MAX_FAVORITES: 10,

  // API endpoints
  ENDPOINTS: {
    CURRENT: '/weather',
    FORECAST: '/forecast',
    FORECAST_5DAY: '/forecast'
  }
};

// Check if API key is set
if (CONFIG.API_KEY === 'YOUR_API_KEY_HERE') {
  console.warn('⚠️ Please set your API key in config.js');
  console.warn('Get a free API key at: https://openweathermap.org/api');
}

