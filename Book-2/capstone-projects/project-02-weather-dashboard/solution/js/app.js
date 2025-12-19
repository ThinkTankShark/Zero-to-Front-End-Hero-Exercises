/**
 * app.js - Main Application
 * Coordinates all modules and handles user interactions
 */

// Application state
const AppState = {
  currentWeatherData: null,
  currentCity: null,
  currentUnit: 'C', // C or F
  favorites: [],
  recentSearches: []
};

/**
 * Initialize application
 */
function init() {
  // Initialize UI
  UI.init();

  // Load saved preferences
  loadPreferences();

  // Setup event listeners
  setupEventListeners();

  // Load last searched city or show welcome
  const lastCity = localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_CITY);
  if (lastCity) {
    searchWeather(lastCity);
  }

  console.log('Weather Dashboard initialized');
}

/**
 * Load saved preferences from localStorage
 */
function loadPreferences() {
  // Load temperature unit
  const savedUnit = localStorage.getItem(CONFIG.STORAGE_KEYS.TEMP_UNIT);
  if (savedUnit) {
    AppState.currentUnit = savedUnit;
  }

  // Load favorites
  const savedFavorites = localStorage.getItem(CONFIG.STORAGE_KEYS.FAVORITES);
  if (savedFavorites) {
    AppState.favorites = JSON.parse(savedFavorites);
  }

  // Load recent searches
  const savedRecent = localStorage.getItem(CONFIG.STORAGE_KEYS.RECENT);
  if (savedRecent) {
    AppState.recentSearches = JSON.parse(savedRecent);
  }

  // Update UI
  updateUnitToggleButton();
  UI.renderFavorites(AppState.favorites, searchWeather, removeFavorite);
  UI.renderRecentSearches(AppState.recentSearches, searchWeather);
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // Search button
  document.getElementById('search-btn').addEventListener('click', handleSearch);

  // Enter key in search input
  document.getElementById('city-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });

  // Geolocation button
  document.getElementById('location-btn').addEventListener('click', handleGeolocation);

  // Unit toggle
  document.getElementById('unit-toggle').addEventListener('click', toggleTemperatureUnit);

  // Favorites toggle
  document.getElementById('favorites-toggle').addEventListener('click', () => {
    UI.toggleFavoritesSidebar();
  });

  // Close favorites
  document.getElementById('close-favorites').addEventListener('click', () => {
    UI.closeFavoritesSidebar();
  });

  // Add to favorites
  document.getElementById('add-favorite-btn').addEventListener('click', toggleFavorite);

  // Retry button
  document.getElementById('retry-btn').addEventListener('click', () => {
    if (AppState.currentCity) {
      searchWeather(AppState.currentCity);
    }
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('favorites-sidebar');
    const toggle = document.getElementById('favorites-toggle');

    if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
      UI.closeFavoritesSidebar();
    }
  });
}

/**
 * Handle search button click
 */
function handleSearch() {
  const input = document.getElementById('city-input');
  const city = input.value.trim();

  if (!city) {
    UI.showError('Please enter a city name');
    return;
  }

  searchWeather(city);
  input.value = '';
}

/**
 * Search for weather by city name
 */
async function searchWeather(city) {
  UI.showLoading();

  try {
    // Fetch weather data
    const weatherData = await API.fetchAllWeatherData(city);

    // Update state
    AppState.currentWeatherData = weatherData;
    AppState.currentCity = weatherData.current.location.city;

    // Save to localStorage
    localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_CITY, AppState.currentCity);

    // Add to recent searches
    addToRecentSearches(AppState.currentCity);

    // Display weather
    UI.displayWeather(weatherData, AppState.currentUnit);

    // Update favorite button
    updateFavoriteButton();

  } catch (error) {
    UI.showError(error.message);
    console.error('Error fetching weather:', error);
  }
}

/**
 * Handle geolocation button click
 */
function handleGeolocation() {
  if (!navigator.geolocation) {
    UI.showError('Geolocation is not supported by your browser');
    return;
  }

  UI.showLoading();

  navigator.geolocation.getCurrentPosition(
    // Success
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const weatherData = await API.fetchAllWeatherByCoords(latitude, longitude);

        // Update state
        AppState.currentWeatherData = weatherData;
        AppState.currentCity = weatherData.current.location.city;

        // Save to localStorage
        localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_CITY, AppState.currentCity);

        // Add to recent searches
        addToRecentSearches(AppState.currentCity);

        // Display weather
        UI.displayWeather(weatherData, AppState.currentUnit);

        // Update favorite button
        updateFavoriteButton();

      } catch (error) {
        UI.showError('Failed to get weather for your location');
        console.error('Error:', error);
      }
    },
    // Error
    (error) => {
      let message = 'Failed to get your location';

      switch(error.code) {
        case error.PERMISSION_DENIED:
          message = 'Location permission denied. Please enter a city manually.';
          break;
        case error.POSITION_UNAVAILABLE:
          message = 'Location information unavailable.';
          break;
        case error.TIMEOUT:
          message = 'Location request timed out.';
          break;
      }

      UI.showError(message);
    }
  );
}

/**
 * Toggle temperature unit
 */
function toggleTemperatureUnit() {
  AppState.currentUnit = AppState.currentUnit === 'C' ? 'F' : 'C';

  // Save preference
  localStorage.setItem(CONFIG.STORAGE_KEYS.TEMP_UNIT, AppState.currentUnit);

  // Update all temperature displays
  UI.updateTemperatureDisplays(AppState.currentUnit);

  // Update button text
  updateUnitToggleButton();
}

/**
 * Update unit toggle button text
 */
function updateUnitToggleButton() {
  const btn = document.getElementById('unit-toggle');
  btn.textContent = AppState.currentUnit === 'C' ? '°F' : '°C';
}

/**
 * Toggle favorite (add/remove)
 */
function toggleFavorite() {
  if (!AppState.currentCity) return;

  const index = AppState.favorites.indexOf(AppState.currentCity);

  if (index === -1) {
    // Add to favorites
    if (AppState.favorites.length >= CONFIG.MAX_FAVORITES) {
      UI.showError(`Maximum ${CONFIG.MAX_FAVORITES} favorites allowed`);
      return;
    }
    AppState.favorites.push(AppState.currentCity);
  } else {
    // Remove from favorites
    AppState.favorites.splice(index, 1);
  }

  // Save to localStorage
  localStorage.setItem(CONFIG.STORAGE_KEYS.FAVORITES, JSON.stringify(AppState.favorites));

  // Update UI
  updateFavoriteButton();
  UI.renderFavorites(AppState.favorites, searchWeather, removeFavorite);
}

/**
 * Remove city from favorites
 */
function removeFavorite(city) {
  AppState.favorites = AppState.favorites.filter(fav => fav !== city);

  // Save to localStorage
  localStorage.setItem(CONFIG.STORAGE_KEYS.FAVORITES, JSON.stringify(AppState.favorites));

  // Update UI
  updateFavoriteButton();
  UI.renderFavorites(AppState.favorites, searchWeather, removeFavorite);
}

/**
 * Update favorite button state
 */
function updateFavoriteButton() {
  const isFavorite = AppState.favorites.includes(AppState.currentCity);
  UI.updateFavoriteButton(isFavorite);
}

/**
 * Add city to recent searches
 */
function addToRecentSearches(city) {
  // Remove if already exists (to move to front)
  AppState.recentSearches = AppState.recentSearches.filter(c => c !== city);

  // Add to beginning
  AppState.recentSearches.unshift(city);

  // Keep only last 5
  AppState.recentSearches = AppState.recentSearches.slice(0, CONFIG.MAX_RECENT);

  // Save to localStorage
  localStorage.setItem(CONFIG.STORAGE_KEYS.RECENT, JSON.stringify(AppState.recentSearches));

  // Update UI
  UI.renderRecentSearches(AppState.recentSearches, searchWeather);
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

