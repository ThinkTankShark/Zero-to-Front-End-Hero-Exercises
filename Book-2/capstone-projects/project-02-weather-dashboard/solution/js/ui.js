/**
 * ui.js - User Interface / DOM Manipulation
 * All UI updates and rendering
 */

const UI = {
  // DOM elements (cached for performance)
  elements: {},

  /**
   * Initialize and cache DOM elements
   */
  init() {
    this.elements = {
      // States
      loading: document.getElementById('loading'),
      errorMessage: document.getElementById('error-message'),
      errorText: document.getElementById('error-text'),
      welcomeState: document.getElementById('welcome-state'),
      weatherDisplay: document.getElementById('weather-display'),

      // Current weather
      cityName: document.getElementById('city-name'),
      currentDate: document.getElementById('current-date'),
      temperature: document.getElementById('temperature'),
      feelsLike: document.getElementById('feels-like'),
      condition: document.getElementById('condition'),
      description: document.getElementById('description'),
      weatherIcon: document.getElementById('weather-icon'),
      humidity: document.getElementById('humidity'),
      windSpeed: document.getElementById('wind-speed'),
      pressure: document.getElementById('pressure'),
      visibility: document.getElementById('visibility'),
      sunrise: document.getElementById('sunrise'),
      sunset: document.getElementById('sunset'),

      // Forecast
      forecastContainer: document.getElementById('forecast-container'),

      // Favorites
      favoriteBtn: document.getElementById('add-favorite-btn'),
      favoritesSidebar: document.getElementById('favorites-sidebar'),
      favoritesList: document.getElementById('favorites-list'),

      // Recent
      recentSearches: document.getElementById('recent-searches'),
      recentList: document.getElementById('recent-list')
    };
  },

  /**
   * Show loading state
   */
  showLoading() {
    this.elements.loading.style.display = 'flex';
    this.elements.errorMessage.style.display = 'none';
    this.elements.welcomeState.style.display = 'none';
    this.elements.weatherDisplay.style.display = 'none';
  },

  /**
   * Hide loading state
   */
  hideLoading() {
    this.elements.loading.style.display = 'none';
  },

  /**
   * Show error message
   */
  showError(message) {
    this.elements.errorText.textContent = message;
    this.elements.errorMessage.style.display = 'flex';
    this.elements.loading.style.display = 'none';
    this.elements.welcomeState.style.display = 'none';
    this.elements.weatherDisplay.style.display = 'none';
  },

  /**
   * Hide error message
   */
  hideError() {
    this.elements.errorMessage.style.display = 'none';
  },

  /**
   * Display weather data
   */
  displayWeather(weatherData, currentUnit) {
    // Hide other states
    this.hideLoading();
    this.hideError();
    this.elements.welcomeState.style.display = 'none';
    this.elements.weatherDisplay.style.display = 'block';

    const { current, location } = weatherData.current;

    // Location and date
    this.elements.cityName.textContent = `${location.city}, ${location.country}`;
    this.elements.currentDate.textContent = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Temperature
    this.elements.temperature.textContent = Weather.formatTemp(current.temp, currentUnit);
    this.elements.temperature.dataset.temp = current.temp;

    const feelsLikeSpan = this.elements.feelsLike.querySelector('[data-temp]');
    feelsLikeSpan.textContent = Weather.formatTemp(current.feelsLike, currentUnit);
    feelsLikeSpan.dataset.temp = current.feelsLike;

    // Condition
    this.elements.condition.textContent = current.condition;
    this.elements.description.textContent = current.description;

    // Weather icon
    this.elements.weatherIcon.src = Weather.getIconUrl(current.icon);
    this.elements.weatherIcon.alt = current.description;

    // Details
    this.elements.humidity.textContent = `${current.humidity}%`;
    this.elements.windSpeed.textContent = `${current.windSpeed} km/h`;
    this.elements.pressure.textContent = `${current.pressure} hPa`;
    this.elements.visibility.textContent = `${current.visibility} km`;
    this.elements.sunrise.textContent = Weather.formatTime(current.sunrise, current.timezone);
    this.elements.sunset.textContent = Weather.formatTime(current.sunset, current.timezone);

    // Display forecast
    this.displayForecast(weatherData.forecast, currentUnit);
  },

  /**
   * Display 5-day forecast
   */
  displayForecast(forecast, currentUnit) {
    this.elements.forecastContainer.innerHTML = '';

    forecast.forEach(day => {
      const card = document.createElement('div');
      card.className = 'forecast-card';

      card.innerHTML = `
        <p class="forecast-day">${day.dayName}</p>
        <img src="${Weather.getIconUrl(day.icon)}" alt="${day.description}" class="forecast-icon">
        <p class="forecast-condition">${day.condition}</p>
        <div class="forecast-temps">
          <span class="forecast-high" data-temp="${day.tempHigh}">
            ${Weather.formatTemp(day.tempHigh, currentUnit)}
          </span>
          <span class="forecast-low" data-temp="${day.tempLow}">
            ${Weather.formatTemp(day.tempLow, currentUnit)}
          </span>
        </div>
        <p class="forecast-humidity">💧 ${day.humidity}%</p>
      `;

      this.elements.forecastContainer.appendChild(card);
    });
  },

  /**
   * Update all temperature displays when unit changes
   */
  updateTemperatureDisplays(unit) {
    document.querySelectorAll('[data-temp]').forEach(el => {
      const tempC = parseFloat(el.dataset.temp);
      el.textContent = Weather.formatTemp(tempC, unit);
    });
  },

  /**
   * Update favorites button state
   */
  updateFavoriteButton(isFavorite) {
    this.elements.favoriteBtn.textContent = isFavorite ? '⭐' : '☆';
    this.elements.favoriteBtn.setAttribute('aria-label',
      isFavorite ? 'Remove from favorites' : 'Add to favorites'
    );
  },

  /**
   * Render favorites list
   */
  renderFavorites(favorites, onCityClick, onRemoveClick) {
    if (favorites.length === 0) {
      this.elements.favoritesList.innerHTML =
        '<p class="empty-message">No favorites yet. Add cities to quickly access them!</p>';
      return;
    }

    this.elements.favoritesList.innerHTML = favorites.map(city => `
      <div class="favorite-item">
        <button class="favorite-city" data-city="${city}">${city}</button>
        <button class="favorite-remove" data-city="${city}" aria-label="Remove ${city}">×</button>
      </div>
    `).join('');

    // Add event listeners
    this.elements.favoritesList.querySelectorAll('.favorite-city').forEach(btn => {
      btn.addEventListener('click', () => onCityClick(btn.dataset.city));
    });

    this.elements.favoritesList.querySelectorAll('.favorite-remove').forEach(btn => {
      btn.addEventListener('click', () => onRemoveClick(btn.dataset.city));
    });
  },

  /**
   * Render recent searches
   */
  renderRecentSearches(recent, onClick) {
    if (recent.length === 0) {
      this.elements.recentSearches.style.display = 'none';
      return;
    }

    this.elements.recentSearches.style.display = 'flex';
    this.elements.recentList.innerHTML = recent.map(city => `
      <button class="recent-item" data-city="${city}">${city}</button>
    `).join('');

    this.elements.recentList.querySelectorAll('.recent-item').forEach(btn => {
      btn.addEventListener('click', () => onClick(btn.dataset.city));
    });
  },

  /**
   * Toggle favorites sidebar
   */
  toggleFavoritesSidebar() {
    this.elements.favoritesSidebar.classList.toggle('open');
  },

  /**
   * Close favorites sidebar
   */
  closeFavoritesSidebar() {
    this.elements.favoritesSidebar.classList.remove('open');
  }
};

