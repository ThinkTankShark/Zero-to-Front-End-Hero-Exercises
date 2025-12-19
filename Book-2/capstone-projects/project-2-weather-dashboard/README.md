# Project 2: Weather Dashboard

## Overview

Create a multi-city weather dashboard using the OpenWeather API. This project builds on Task Manager patterns while introducing async JavaScript, API integration, and ES modules.

**What you'll build:**
- Real-time weather data display
- 5-day forecast
- Multi-city management
- Responsive dashboard UI

## Learning Objectives

- ✅ Async/await and Promises
- ✅ Fetch API and HTTP requests
- ✅ API key management
- ✅ Error handling for network requests
- ✅ ES modules (import/export)
- ✅ Loading states and UX
- ✅ Working with external data

## Requirements

### Core Features

1. **City Search**
   - [ ] Search input for city names
   - [ ] Search button
   - [ ] Search by city name or coordinates
   - [ ] Autocomplete suggestions (stretch)

2. **Current Weather Display**
   - [ ] City name and country
   - [ ] Current temperature
   - [ ] Weather description
   - [ ] Weather icon
   - [ ] "Feels like" temperature
   - [ ] Humidity, wind speed, pressure

3. **5-Day Forecast**
   - [ ] Display forecast cards
   - [ ] Date, temperature, conditions
   - [ ] Icons for each day
   - [ ] High/low temperatures

4. **Multiple Cities**
   - [ ] Add multiple cities to dashboard
   - [ ] Display weather for each
   - [ ] Remove cities
   - [ ] Save cities to localStorage

5. **UI/UX Features**
   - [ ] Loading spinner while fetching
   - [ ] Error messages for failed requests
   - [ ] Empty state (no cities added)
   - [ ] Responsive layout

### Technical Requirements

- ES modules for code organization
- Async/await for API calls
- Error handling and user feedback
- Environment variables for API key
- Proper HTTP request handling
- Loading and error states

## Checkpoints

### Checkpoint 1: API Setup & Current Weather
- [ ] Get OpenWeather API key
- [ ] Set up module structure
- [ ] Create API service module
- [ ] Fetch current weather for one city
- [ ] Display basic weather data

### Checkpoint 2: Full Weather Display
- [ ] Display all weather details
- [ ] Add weather icons
- [ ] Format temperature units
- [ ] Style weather card
- [ ] Handle different weather conditions

### Checkpoint 3: Forecast & Error Handling
- [ ] Fetch 5-day forecast
- [ ] Display forecast cards
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Handle network failures

### Checkpoint 4: Multi-City & Persistence
- [ ] Add multiple cities
- [ ] Save to localStorage
- [ ] Load saved cities on startup
- [ ] Remove cities
- [ ] Manage city list

### Checkpoint 5: Polish & Responsive
- [ ] Responsive design
- [ ] Animations and transitions
- [ ] Better error messages
- [ ] Temperature unit toggle (°C/°F)
- [ ] Last updated timestamp

## API Information

**OpenWeather API**: https://openweathermap.org/api

**Endpoints to use:**
- Current weather: `/weather`
- 5-day forecast: `/forecast`

**Get your free API key:**
1. Sign up at OpenWeatherMap
2. Navigate to API keys
3. Copy your key
4. Never commit it to Git!

## Stretch Goals

1. **Geolocation** - Auto-detect user's location
2. **Weather Alerts** - Display weather warnings
3. **Hourly Forecast** - 24-hour forecast
4. **Charts** - Visualize temperature trends
5. **Weather Maps** - Integrate weather map layers
6. **Units Toggle** - Switch between metric/imperial
7. **Offline Mode** - Cache recent data
8. **Voice Search** - Search cities by voice

