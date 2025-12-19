# Project 2: Weather Dashboard

**Difficulty:** ⭐⭐⭐ Intermediate
**Estimated Time:** 35-45 hours
**Perfect for:** API integration and async JavaScript

---

## 🎯 Project Overview

Build a comprehensive weather dashboard that displays current conditions, forecasts, and allows users to save favorite locations. This project demonstrates your ability to work with third-party APIs and handle asynchronous data.

---

## ✅ Required Features

### Core Functionality
- [ ] Search for any city worldwide
- [ ] Display current weather conditions
- [ ] Show 7-day forecast
- [ ] Show hourly forecast (24 hours)
- [ ] Geolocation support (get user's current location)
- [ ] Save favorite locations
- [ ] Toggle between Celsius/Fahrenheit
- [ ] Toggle between light/dark mode

### Weather Data Displayed
**Current Conditions:**
- Temperature (current, feels like)
- Weather description and icon
- Humidity percentage
- Wind speed and direction
- Pressure
- Visibility
- UV index
- Sunrise/sunset times

**Forecast:**
- Daily high/low temperatures
- Weather conditions
- Chance of precipitation
- Wind speed
- Weather icon

---

## 🌐 API Setup

### Recommended API: OpenWeatherMap
1. Sign up at [OpenWeatherMap.org](https://openweathermap.org/api)
2. Get free API key
3. Use these endpoints:
   - Current Weather: `api.openweathermap.org/data/2.5/weather`
   - 5 Day Forecast: `api.openweathermap.org/data/2.5/forecast`
   - One Call API: `api.openweathermap.org/data/2.5/onecall`

### API Best Practices
- Store API key securely (not in frontend code for production!)
- Implement error handling for failed requests
- Show loading states while fetching
- Cache responses (localStorage)
- Respect rate limits

---

## 💻 Technical Requirements

### JavaScript Features to Use
```javascript
// Async/await for API calls
async function getWeather(city) {
  try {
    const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}`);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    return data;
  } catch (error) {
    displayError(error.message);
  }
}

// Geolocation API
navigator.geolocation.getCurrentPosition(success, error);

// LocalStorage for favorites
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
```

### Code Organization
```
weather-dashboard/
├── index.html
├── css/
│   ├── styles.css
│   └── themes.css
├── js/
│   ├── app.js           # Main entry point
│   ├── api.js           # API calls
│   ├── ui.js            # DOM manipulation
│   ├── storage.js       # localStorage
│   ├── utils.js         # Helper functions
│   └── config.js        # API keys, constants
└── assets/
    └── weather-icons/   # Custom icons (optional)
```

---

## 🎨 Design Requirements

### Layout Sections
1. **Search Bar** (top)
   - Input field
   - Search button
   - Current location button (geolocation)

2. **Current Weather** (main section)
   - Large temperature display
   - Weather icon/animation
   - Location name and time
   - Key metrics (humidity, wind, etc.)

3. **Forecast Section**
   - Hourly forecast (scrollable)
   - Daily forecast (cards)

4. **Favorites Sidebar**
   - Quick access to saved locations
   - Add/remove favorites

### Visual Design
- Weather-appropriate colors (sunny = warm, rainy = cool)
- Large, readable temperature display
- Weather icons or animations
- Smooth transitions between views
- Responsive design
- Dark mode option

---

## 📱 Responsive Design

### Mobile
- Vertical layout
- Collapsible sections
- Touch-friendly buttons
- Simplified forecast view

### Tablet
- 2-column layout
- More detailed forecast

### Desktop
- Full dashboard layout
- Sidebar for favorites
- All data visible at once

---

## 🧪 Feature Implementation Guide

### 1. City Search
```javascript
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = searchInput.value.trim();
  if (city) {
    await fetchAndDisplayWeather(city);
  }
});
```

### 2. Geolocation
```javascript
function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to get your location');
      }
    );
  }
}
```

### 3. Temperature Unit Toggle
```javascript
let isCelsius = true;

function toggleUnits() {
  isCelsius = !isCelsius;
  updateTemperatureDisplay();
  localStorage.setItem('tempUnit', isCelsius ? 'C' : 'F');
}

function convertTemp(temp) {
  return isCelsius ? temp : (temp * 9/5) + 32;
}
```

### 4. Favorites System
```javascript
class FavoritesManager {
  constructor() {
    this.favorites = this.load();
  }

  load() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  }

  save() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  add(city) {
    if (!this.favorites.includes(city)) {
      this.favorites.push(city);
      this.save();
    }
  }

  remove(city) {
    this.favorites = this.favorites.filter(fav => fav !== city);
    this.save();
  }
}
```

---

## 🎯 User Experience Requirements

### Loading States
- Show spinner while fetching data
- Disable search during loading
- "Loading..." text

### Error Handling
- City not found
- Network error
- Geolocation denied
- API rate limit exceeded
- Helpful error messages

### Empty States
- No city selected yet
- No favorites saved
- Search for a city message

---

## 📊 Testing Checklist

- [ ] Search for valid city
- [ ] Search for invalid city (shows error)
- [ ] Use current location button
- [ ] Add city to favorites
- [ ] Remove city from favorites
- [ ] Click favorite to load weather
- [ ] Toggle C/F units
- [ ] Toggle dark mode
- [ ] Refresh page (data persists)
- [ ] Test offline (shows appropriate message)
- [ ] Test on slow connection
- [ ] Works on mobile devices
- [ ] Keyboard navigation

---

## 🌟 Bonus Features

- [ ] Weather alerts/warnings
- [ ] Air quality index
- [ ] Weather maps (radar)
- [ ] Historical weather data
- [ ] Weather graphs (temperature, humidity trends)
- [ ] Weather animations (rain, snow, sun)
- [ ] Multiple cities side-by-side comparison
- [ ] Share weather button (social media)
- [ ] Background changes based on weather
- [ ] Voice search integration
- [ ] PWA (Progressive Web App) features

---

## 📚 Skills Demonstrated

✅ Fetch API and async/await
✅ Working with third-party APIs
✅ Error handling
✅ Geolocation API
✅ LocalStorage for persistence
✅ Dynamic DOM manipulation
✅ Data transformation
✅ Loading states and UX
✅ Responsive design

---

## 🔗 Resources

- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Weather Icons](https://erikflowers.github.io/weather-icons/)

---

**Ready to build a weather app?** Start in the `starter/` folder! 🌤️

