# Weather Dashboard - Detailed Requirements

Build a weather application that fetches real-time weather data from APIs and displays it beautifully.

---

## 🎯 Project Goal

Create a weather dashboard that demonstrates mastery of async JavaScript, API integration, error handling, and dynamic data display.

---

## 📋 Core Features (MVP)

### 1. Current Weather Display
**Required Data:**
- City name and country
- Current temperature (°F and °C toggle)
- Weather condition (Clear, Cloudy, Rain, etc.)
- Weather icon/illustration
- "Feels like" temperature
- Humidity percentage
- Wind speed and direction
- Pressure
- Visibility
- Sunrise/sunset times

**Layout:**
- Large, prominent temperature display
- Weather icon matching condition
- City name clearly visible
- Grid layout for weather details
- Visually appealing cards

### 2. Search Functionality
**Requirements:**
- Search bar for city names
- Search by city name (e.g., "London", "New York")
- Search validation (not empty)
- Error handling for invalid cities
- Loading state while fetching
- Clear previous results

**User Experience:**
- Press Enter to search
- Button click to search
- Clear error messages
- Helpful feedback

### 3. 5-Day Forecast
**Display:**
- Next 5 days weather
- Day name (Mon, Tue, Wed, etc.)
- High/low temperatures
- Weather condition icon
- Brief description
- Precipitation chance (if available)

**Layout:**
- Horizontal scrollable cards OR
- Grid layout (responsive)
- Clear visual hierarchy
- Easy to scan

### 4. Geolocation
**Requirements:**
- "Use My Location" button
- Request browser geolocation permission
- Fetch weather for current location
- Handle permission denied
- Show loading state
- Error handling

**Flow:**
1. User clicks "Use My Location"
2. Browser requests permission
3. If allowed: Get coordinates
4. Fetch weather for coordinates
5. Display results

### 5. Favorites/Recent Searches
**Requirements:**
- Save favorite cities (localStorage)
- Quick access buttons for favorites
- Add/remove favorites
- Recent searches history (last 5)
- Click to quickly search again

**UI Elements:**
- "Add to Favorites" button
- List of favorite cities
- Remove favorite option
- Recent searches dropdown/list

### 6. Error Handling
**Required Error States:**
- City not found
- Network error (no internet)
- API rate limit exceeded
- Permission denied (geolocation)
- Invalid API key
- Timeout errors

**Display:**
- Clear error messages
- Helpful suggestions
- Retry button
- Fallback UI

### 7. Loading States
**Requirements:**
- Show loading indicator while fetching
- Disable inputs during load
- Skeleton screens (bonus)
- Progress indication
- Smooth transitions

---

## 🎨 UI/UX Requirements

### Visual Design
- Modern, clean interface
- Weather condition backgrounds (bonus)
- Smooth animations
- Responsive cards
- Readable typography
- Appropriate color scheme

### Temperature Toggle
- Switch between °F and °C
- Remember user preference (localStorage)
- Update all temperatures on toggle
- Clear indication of current unit

### Responsive Design
- **Mobile (320px+):** Stacked layout
- **Tablet (768px+):** 2-column grid
- **Desktop (1024px+):** Full dashboard layout
- Touch-friendly buttons
- Readable on all devices

### Accessibility
- Keyboard navigation
- ARIA labels
- Alt text for images
- Focus indicators
- Screen reader friendly

---

## 💻 Technical Requirements

### API Integration

**Weather API Options:**
1. **OpenWeatherMap API** (Recommended)
   - Free tier: 1000 calls/day
   - Current weather + 5-day forecast
   - URL: `https://openweathermap.org/api`

2. **WeatherAPI.com**
   - Free tier: 1M calls/month
   - Current + forecast
   - URL: `https://www.weatherapi.com/`

3. **Visual Crossing**
   - Free tier available
   - Historical + forecast
   - URL: `https://www.visualcrossing.com/`

**API Calls Required:**
```javascript
// Current Weather
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric

// 5-Day Forecast
GET https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric

// By Coordinates (Geolocation)
GET https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric
```

### Async JavaScript

**Required Patterns:**
```javascript
// Fetch with async/await
async function fetchWeather(city) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
  }
}

// Promise.all for multiple requests
const [current, forecast] = await Promise.all([
  fetchCurrentWeather(city),
  fetchForecast(city)
]);
```

### Data Transformation

**Convert API Response:**
```javascript
function transformWeatherData(apiData) {
  return {
    city: apiData.name,
    country: apiData.sys.country,
    temp: Math.round(apiData.main.temp),
    feelsLike: Math.round(apiData.main.feels_like),
    condition: apiData.weather[0].main,
    description: apiData.weather[0].description,
    icon: apiData.weather[0].icon,
    humidity: apiData.main.humidity,
    windSpeed: apiData.wind.speed,
    pressure: apiData.main.pressure,
    // ... more transformations
  };
}
```

### localStorage

**Store:**
- Favorite cities (array)
- Recent searches (array, max 5)
- Temperature unit preference (F/C)
- Last searched city

```javascript
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
localStorage.setItem('favorites', JSON.stringify(favorites));
```

### Geolocation API

```javascript
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoords(latitude, longitude);
    },
    (error) => {
      handleGeolocationError(error);
    }
  );
}
```

---

## 📊 Data Structure

### Weather Object
```javascript
{
  location: {
    city: "London",
    country: "GB",
    coordinates: { lat: 51.5074, lon: -0.1278 }
  },
  current: {
    temp: 18,
    feelsLike: 16,
    condition: "Clouds",
    description: "scattered clouds",
    icon: "03d",
    humidity: 65,
    pressure: 1015,
    windSpeed: 5.5,
    windDirection: 230,
    visibility: 10000,
    sunrise: 1634533200,
    sunset: 1634574600
  },
  forecast: [
    {
      date: "2025-12-20",
      dayName: "Friday",
      tempHigh: 20,
      tempLow: 15,
      condition: "Clear",
      icon: "01d",
      precipitation: 10
    },
    // ... 4 more days
  ]
}
```

---

## ✅ Acceptance Criteria

### Minimum Pass (60%):
- Search city by name works
- Display current weather
- Show basic forecast
- Error messages appear
- Basic styling

### Portfolio-Ready (85%):
- All features work
- 5-day forecast displayed
- Geolocation works
- Favorites functionality
- Professional UI
- Fully responsive
- Good error handling

### Exceptional (95%):
- All features + bonuses
- Excellent UI/UX
- Smooth animations
- Perfect responsive
- Comprehensive error handling
- Loading states everywhere
- Skeleton screens
- Weather-based backgrounds

---

## 🐛 Edge Cases to Handle

1. **Empty search** - Show validation message
2. **City not found** - Clear error message
3. **Network offline** - Offline message
4. **API rate limit** - Explain limit, suggest retry later
5. **Geolocation denied** - Explain, suggest manual search
6. **Very long city names** - Truncate or wrap
7. **Special characters in search** - Handle properly
8. **Slow network** - Show loading state
9. **API timeout** - Retry option
10. **Invalid API response** - Graceful fallback

---

## 🎯 Bonus Features (Optional)

1. **Hourly Forecast** - Next 24 hours
2. **Weather Alerts** - Severe weather warnings
3. **Air Quality Index** - Pollution data
4. **UV Index** - Sun safety info
5. **Weather Maps** - Interactive maps
6. **Multiple Locations** - Compare cities
7. **Weather Graphs** - Temperature trends
8. **Notifications** - Daily weather alerts
9. **Dark Mode** - Theme toggle
10. **Background Changes** - Match weather condition

---

## 📚 Skills Assessment

This project tests:
- ✅ Fetch API
- ✅ Async/await
- ✅ Promise handling
- ✅ API integration
- ✅ Error handling
- ✅ Data transformation
- ✅ Geolocation API
- ✅ localStorage
- ✅ Dynamic UI updates
- ✅ Responsive design

---

## 🚀 Recommended Approach

### Phase 1: Basic Setup (Week 1)
1. Get API key
2. Create HTML structure
3. Build search functionality
4. Display current weather
5. Basic styling

### Phase 2: Forecast & Features (Week 2)
6. Add 5-day forecast
7. Implement geolocation
8. Add favorites functionality
9. Temperature toggle (F/C)
10. Improve UI

### Phase 3: Polish & Error Handling (Week 3)
11. Comprehensive error handling
12. Loading states
13. Responsive design
14. Animations
15. Accessibility

### Phase 4: Advanced Features (Week 4)
16. Skeleton screens
17. Weather backgrounds
18. Advanced features (hourly, alerts, etc.)
19. Performance optimization
20. Final polish

---

## 🔑 API Key Setup

### Getting Started:

1. **Sign up** at https://openweathermap.org/
2. **Get free API key** (verify email)
3. **Store securely** - Don't commit to GitHub!
4. **Use environment variable** or config file

**Important:**
- Never commit API keys to GitHub
- Use `.env` file or config.js (add to .gitignore)
- For portfolio, provide instructions to add own key

---

**Target:** Build a weather app you'd actually use! Make it beautiful and reliable! 🌤️✨

