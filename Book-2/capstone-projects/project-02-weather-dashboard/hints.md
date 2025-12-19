# Weather Dashboard - Implementation Hints

Common challenges and solutions for building a weather app.

---

## 🎯 Challenge 1: Fetching Weather Data

### The Problem
Making API calls and handling responses.

### The Solution

**Basic Fetch Pattern:**
```javascript
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function fetchWeather(city) {
  try {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    // Check if request was successful
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found');
      } else if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else {
        throw new Error('Failed to fetch weather data');
      }
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error; // Re-throw to handle in calling function
  }
}
```

**Using the Function:**
```javascript
async function searchWeather() {
  const city = document.getElementById('city-input').value.trim();

  if (!city) {
    showError('Please enter a city name');
    return;
  }

  showLoading();

  try {
    const weatherData = await fetchWeather(city);
    displayWeather(weatherData);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
}
```

---

## 🎯 Challenge 2: Fetching Multiple Data (Current + Forecast)

### The Problem
Need both current weather and forecast data.

### The Solution
Use `Promise.all()` to fetch in parallel:

```javascript
async function fetchAllWeatherData(city) {
  try {
    // Fetch both in parallel
    const [currentData, forecastData] = await Promise.all([
      fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`),
      fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    ]);

    // Check both responses
    if (!currentData.ok || !forecastData.ok) {
      throw new Error('Failed to fetch weather data');
    }

    // Parse JSON
    const current = await currentData.json();
    const forecast = await forecastData.json();

    return { current, forecast };

  } catch (error) {
    throw error;
  }
}
```

---

## 🎯 Challenge 3: Transforming API Response

### The Problem
API response has too much data, needs simplification.

### The Solution
Create transformation functions:

```javascript
function transformCurrentWeather(apiData) {
  return {
    city: apiData.name,
    country: apiData.sys.country,
    temp: Math.round(apiData.main.temp),
    feelsLike: Math.round(apiData.main.feels_like),
    condition: apiData.weather[0].main,
    description: apiData.weather[0].description,
    icon: apiData.weather[0].icon,
    humidity: apiData.main.humidity,
    windSpeed: Math.round(apiData.wind.speed * 3.6), // m/s to km/h
    pressure: apiData.main.pressure,
    visibility: (apiData.visibility / 1000).toFixed(1), // meters to km
    sunrise: new Date(apiData.sys.sunrise * 1000),
    sunset: new Date(apiData.sys.sunset * 1000)
  };
}

function transform5DayForecast(apiData) {
  // API returns 3-hour intervals, we need daily forecast
  const dailyForecasts = {};

  apiData.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0]; // Get date part

    if (!dailyForecasts[date]) {
      dailyForecasts[date] = {
        temps: [],
        conditions: [],
        icons: []
      };
    }

    dailyForecasts[date].temps.push(item.main.temp);
    dailyForecasts[date].conditions.push(item.weather[0].main);
    dailyForecasts[date].icons.push(item.weather[0].icon);
  });

  // Convert to array and get daily high/low
  return Object.entries(dailyForecasts).slice(0, 5).map(([date, data]) => {
    return {
      date,
      dayName: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      tempHigh: Math.round(Math.max(...data.temps)),
      tempLow: Math.round(Math.min(...data.temps)),
      condition: data.conditions[0], // Most common
      icon: data.icons[0]
    };
  });
}
```

---

## 🎯 Challenge 4: Geolocation

### The Problem
Getting user's location and fetching weather for it.

### The Solution

```javascript
function requestGeolocation() {
  // Check if geolocation is supported
  if (!navigator.geolocation) {
    showError('Geolocation is not supported by your browser');
    return;
  }

  showLoading('Getting your location...');

  navigator.geolocation.getCurrentPosition(
    // Success callback
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const url = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch weather');
        }

        const data = await response.json();
        displayWeather(data);
      } catch (error) {
        showError('Failed to get weather for your location');
      } finally {
        hideLoading();
      }
    },
    // Error callback
    (error) => {
      hideLoading();

      switch(error.code) {
        case error.PERMISSION_DENIED:
          showError('Location permission denied. Please enter a city manually.');
          break;
        case error.POSITION_UNAVAILABLE:
          showError('Location information unavailable.');
          break;
        case error.TIMEOUT:
          showError('Location request timed out.');
          break;
        default:
          showError('An unknown error occurred.');
      }
    }
  );
}
```

---

## 🎯 Challenge 5: Temperature Unit Toggle

### The Problem
Converting between Celsius and Fahrenheit.

### The Solution

```javascript
let currentUnit = 'C'; // or load from localStorage

function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9/5) + 32);
}

function fahrenheitToCelsius(fahrenheit) {
  return Math.round((fahrenheit - 32) * 5/9);
}

function toggleTemperatureUnit() {
  currentUnit = currentUnit === 'C' ? 'F' : 'C';

  // Save preference
  localStorage.setItem('tempUnit', currentUnit);

  // Update all temperature displays
  updateTemperatureDisplays();
}

function formatTemperature(tempCelsius) {
  if (currentUnit === 'F') {
    return `${celsiusToFahrenheit(tempCelsius)}°F`;
  }
  return `${tempCelsius}°C`;
}

function updateTemperatureDisplays() {
  // Update all temp elements
  document.querySelectorAll('[data-temp]').forEach(el => {
    const tempC = parseFloat(el.dataset.temp);
    el.textContent = formatTemperature(tempC);
  });

  // Update toggle button
  document.getElementById('unit-toggle').textContent =
    currentUnit === 'C' ? 'Show °F' : 'Show °C';
}
```

---

## 🎯 Challenge 6: Favorites/localStorage

### The Problem
Saving and loading favorite cities.

### The Solution

```javascript
const FAVORITES_KEY = 'weatherFavorites';
const RECENT_KEY = 'recentSearches';

const Favorites = {
  get() {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  },

  add(city) {
    const favorites = this.get();

    // Prevent duplicates
    if (!favorites.includes(city)) {
      favorites.push(city);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }

    this.render();
  },

  remove(city) {
    let favorites = this.get();
    favorites = favorites.filter(fav => fav !== city);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    this.render();
  },

  render() {
    const favorites = this.get();
    const container = document.getElementById('favorites-list');

    if (favorites.length === 0) {
      container.innerHTML = '<p class="empty">No favorites yet</p>';
      return;
    }

    container.innerHTML = favorites.map(city => `
      <div class="favorite-item">
        <button onclick="searchWeatherByCity('${city}')">${city}</button>
        <button onclick="Favorites.remove('${city}')" class="remove-btn">×</button>
      </div>
    `).join('');
  }
};

const RecentSearches = {
  add(city) {
    let recent = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];

    // Remove if already exists (to move to front)
    recent = recent.filter(item => item !== city);

    // Add to beginning
    recent.unshift(city);

    // Keep only last 5
    recent = recent.slice(0, 5);

    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  },

  get() {
    return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
  }
};
```

---

## 🎯 Challenge 7: Loading States

### The Problem
Showing user that data is being fetched.

### The Solution

```javascript
function showLoading(message = 'Loading...') {
  const loadingEl = document.getElementById('loading');
  loadingEl.textContent = message;
  loadingEl.style.display = 'flex';

  // Disable search button
  document.getElementById('search-btn').disabled = true;
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('search-btn').disabled = false;
}

// Skeleton Screen (Bonus)
function showSkeleton() {
  const weatherContainer = document.getElementById('weather-display');
  weatherContainer.innerHTML = `
    <div class="skeleton">
      <div class="skeleton-city"></div>
      <div class="skeleton-temp"></div>
      <div class="skeleton-details"></div>
    </div>
  `;
  weatherContainer.classList.add('loading');
}
```

---

## 🎯 Challenge 8: Error Handling

### The Problem
Displaying user-friendly error messages.

### The Solution

```javascript
function showError(message) {
  const errorContainer = document.getElementById('error-message');
  errorContainer.textContent = message;
  errorContainer.style.display = 'block';

  // Auto-hide after 5 seconds
  setTimeout(() => {
    errorContainer.style.display = 'none';
  }, 5000);
}

function getErrorMessage(error) {
  // Network errors
  if (error.message === 'Failed to fetch') {
    return 'Network error. Please check your internet connection.';
  }

  // API errors
  if (error.message.includes('404')) {
    return 'City not found. Please check the spelling.';
  }

  if (error.message.includes('429')) {
    return 'Too many requests. Please try again in a minute.';
  }

  // Default
  return 'Something went wrong. Please try again.';
}
```

---

## 💡 General Tips

### API Key Security
```javascript
// DON'T commit this file to GitHub!
// config.js (add to .gitignore)
const CONFIG = {
  API_KEY: 'your_api_key_here',
  BASE_URL: 'https://api.openweathermap.org/data/2.5'
};

// For portfolio deployment
// Add instructions for users to get their own key
```

### Debouncing Search (Bonus)
```javascript
let searchTimeout;

function handleSearchInput(e) {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    searchWeather(e.target.value);
  }, 500); // Wait 500ms after user stops typing
}
```

### Weather Icons
```javascript
function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Or use custom icon mapping
const iconMap = {
  '01d': '☀️',
  '01n': '🌙',
  '02d': '⛅',
  '03d': '☁️',
  '09d': '🌧️',
  '10d': '🌦️',
  '11d': '⛈️',
  '13d': '❄️',
  '50d': '🌫️'
};
```

---

**You've got the patterns! Now build your weather app!** 🌤️✨

