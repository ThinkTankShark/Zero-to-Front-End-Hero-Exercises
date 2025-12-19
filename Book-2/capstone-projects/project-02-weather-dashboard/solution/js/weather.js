/**
 * weather.js - Weather Data Transformation
 * Functions to transform API responses into usable data
 */

const Weather = {
  /**
   * Transform current weather API response
   */
  transformCurrent(apiData) {
    return {
      location: {
        city: apiData.name,
        country: apiData.sys.country,
        coordinates: {
          lat: apiData.coord.lat,
          lon: apiData.coord.lon
        }
      },
      current: {
        temp: Math.round(apiData.main.temp),
        feelsLike: Math.round(apiData.main.feels_like),
        tempMin: Math.round(apiData.main.temp_min),
        tempMax: Math.round(apiData.main.temp_max),
        condition: apiData.weather[0].main,
        description: apiData.weather[0].description,
        icon: apiData.weather[0].icon,
        humidity: apiData.main.humidity,
        pressure: apiData.main.pressure,
        windSpeed: Math.round(apiData.wind.speed * 3.6), // m/s to km/h
        windDeg: apiData.wind.deg,
        visibility: (apiData.visibility / 1000).toFixed(1), // meters to km
        clouds: apiData.clouds.all,
        sunrise: apiData.sys.sunrise,
        sunset: apiData.sys.sunset,
        timezone: apiData.timezone,
        dt: apiData.dt
      }
    };
  },

  /**
   * Transform 5-day forecast API response
   * Groups 3-hour intervals into daily forecasts
   */
  transform5Day(apiData) {
    const dailyData = {};

    // Group by date
    apiData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          temps: [],
          conditions: [],
          icons: [],
          descriptions: [],
          humidity: [],
          wind: [],
          precipitation: []
        };
      }

      dailyData[dateKey].temps.push(item.main.temp);
      dailyData[dateKey].conditions.push(item.weather[0].main);
      dailyData[dateKey].icons.push(item.weather[0].icon);
      dailyData[dateKey].descriptions.push(item.weather[0].description);
      dailyData[dateKey].humidity.push(item.main.humidity);
      dailyData[dateKey].wind.push(item.wind.speed);

      // Precipitation (rain or snow)
      const precip = (item.rain?.['3h'] || 0) + (item.snow?.['3h'] || 0);
      dailyData[dateKey].precipitation.push(precip);
    });

    // Convert to array and process
    const forecast = Object.entries(dailyData)
      .slice(0, 5) // Take first 5 days
      .map(([date, data]) => {
        const dateObj = new Date(date);

        // Get most common condition
        const conditionCounts = {};
        data.conditions.forEach(cond => {
          conditionCounts[cond] = (conditionCounts[cond] || 0) + 1;
        });
        const mostCommonCondition = Object.keys(conditionCounts)
          .reduce((a, b) => conditionCounts[a] > conditionCounts[b] ? a : b);

        // Get corresponding icon
        const conditionIndex = data.conditions.indexOf(mostCommonCondition);
        const icon = data.icons[conditionIndex];

        return {
          date: date,
          dayName: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
          dayFull: dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
          tempHigh: Math.round(Math.max(...data.temps)),
          tempLow: Math.round(Math.min(...data.temps)),
          condition: mostCommonCondition,
          description: data.descriptions[conditionIndex],
          icon: icon,
          humidity: Math.round(data.humidity.reduce((a, b) => a + b, 0) / data.humidity.length),
          windSpeed: Math.round((data.wind.reduce((a, b) => a + b, 0) / data.wind.length) * 3.6),
          precipitation: data.precipitation.reduce((a, b) => a + b, 0)
        };
      });

    return forecast;
  },

  /**
   * Convert Celsius to Fahrenheit
   */
  celsiusToFahrenheit(celsius) {
    return Math.round((celsius * 9/5) + 32);
  },

  /**
   * Convert Fahrenheit to Celsius
   */
  fahrenheitToCelsius(fahrenheit) {
    return Math.round((fahrenheit - 32) * 5/9);
  },

  /**
   * Format temperature based on unit
   */
  formatTemp(tempCelsius, unit = 'C') {
    if (unit === 'F') {
      return `${this.celsiusToFahrenheit(tempCelsius)}°F`;
    }
    return `${tempCelsius}°C`;
  },

  /**
   * Get weather icon URL
   */
  getIconUrl(iconCode) {
    return `${CONFIG.ICON_URL}/${iconCode}@2x.png`;
  },

  /**
   * Format time from Unix timestamp
   */
  formatTime(timestamp, timezone = 0) {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    });
  },

  /**
   * Get wind direction from degrees
   */
  getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  },

  /**
   * Get weather condition emoji
   */
  getConditionEmoji(condition) {
    const emojiMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️',
      'Haze': '🌫️',
      'Smoke': '💨'
    };
    return emojiMap[condition] || '🌤️';
  }
};

