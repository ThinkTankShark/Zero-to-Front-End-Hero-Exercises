/**
 * api.js - API Integration
 * All API calls to OpenWeatherMap
 */

const API = {
  /**
   * Build API URL with parameters
   */
  buildUrl(endpoint, params) {
    const url = new URL(`${CONFIG.BASE_URL}${endpoint}`);
    url.searchParams.append('appid', CONFIG.API_KEY);
    url.searchParams.append('units', 'metric');

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    return url.toString();
  },

  /**
   * Fetch current weather by city name
   */
  async fetchCurrentWeather(city) {
    try {
      const url = this.buildUrl(CONFIG.ENDPOINTS.CURRENT, { q: city });
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else if (response.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.');
        } else if (response.status === 429) {
          throw new Error('Too many requests. Please try again in a minute.');
        } else {
          throw new Error('Failed to fetch weather data. Please try again.');
        }
      }

      const data = await response.json();
      return data;

    } catch (error) {
      if (error.message === 'Failed to fetch') {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw error;
    }
  },

  /**
   * Fetch current weather by coordinates
   */
  async fetchWeatherByCoords(lat, lon) {
    try {
      const url = this.buildUrl(CONFIG.ENDPOINTS.CURRENT, { lat, lon });
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch weather for your location.');
      }

      const data = await response.json();
      return data;

    } catch (error) {
      if (error.message === 'Failed to fetch') {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw error;
    }
  },

  /**
   * Fetch 5-day forecast
   */
  async fetch5DayForecast(city) {
    try {
      const url = this.buildUrl(CONFIG.ENDPOINTS.FORECAST_5DAY, { q: city });
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch forecast data.');
      }

      const data = await response.json();
      return data;

    } catch (error) {
      if (error.message === 'Failed to fetch') {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw error;
    }
  },

  /**
   * Fetch both current weather and forecast
   * Uses Promise.all for parallel fetching
   */
  async fetchAllWeatherData(city) {
    try {
      const [currentData, forecastData] = await Promise.all([
        this.fetchCurrentWeather(city),
        this.fetch5DayForecast(city)
      ]);

      return {
        current: Weather.transformCurrent(currentData),
        forecast: Weather.transform5Day(forecastData)
      };

    } catch (error) {
      throw error;
    }
  },

  /**
   * Fetch weather data by coordinates
   */
  async fetchAllWeatherByCoords(lat, lon) {
    try {
      const currentData = await this.fetchWeatherByCoords(lat, lon);
      const city = currentData.name;
      const forecastData = await this.fetch5DayForecast(city);

      return {
        current: Weather.transformCurrent(currentData),
        forecast: Weather.transform5Day(forecastData)
      };

    } catch (error) {
      throw error;
    }
  }
};

