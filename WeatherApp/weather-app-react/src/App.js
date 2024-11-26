import React, { useState } from 'react';
import './App.css';
import { API_KEY } from './config'; // Import API key from config
import cloudyWeather from './images/cloudy_weather.jpg';
import sunnyWeather from './images/sunny_weather.jpg';
import rainyWeather from './images/rainy_weather.jpg';
import snowyWeather from './images/snowy_weather.jpg';
import thunderstormWeather from './images/thunderstorm.jpg';
import defaultWeather from './images/default_weather.jpg';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    try {
      setError('');
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
        return;
      }

      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data');
      setWeather(null);
    }
  };

  // Function to determine the weather icon
  const getWeatherIcon = (main) => {
    switch (main.toLowerCase()) {
      case 'clouds':
        return '☁️'; // Cloudy
      case 'clear':
        return '☀️'; // Sunny
      case 'rain':
      case 'drizzle':
        return '🌧️'; // Rainy
      case 'snow':
        return '❄️'; // Snowy
      case 'thunderstorm':
        return '⛈️'; // Thunderstorm
      case 'wind':
        return '💨'; // Windy
      default:
        return '🌈'; // Default icon
    }
  };

  // Function to determine background image based on weather condition
  const getBackgroundStyle = (main) => {
    switch (main.toLowerCase()) {
      case 'clouds':
        return { backgroundImage: `url(${cloudyWeather})` };
      case 'clear':
        return { backgroundImage: `url(${sunnyWeather})` };
      case 'rain':
      case 'drizzle':
        return { backgroundImage: `url(${rainyWeather})` };
      case 'snow':
        return { backgroundImage: `url(${snowyWeather})` };
      case 'thunderstorm':
        return { backgroundImage: `url(${thunderstormWeather})` };
      default:
        return { backgroundImage: `url(${defaultWeather})` };
    }
  };



  return (
    <div className="App">
    <div className="container">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
    </div>

    {error && <p className="error">{error}</p>}

    {weather && (
      <div
        className="weather-info"
        style={getBackgroundStyle(weather.weather[0].main)}
      >
        <div className="weather-icon">
          {getWeatherIcon(weather.weather[0].main)}
        </div>
        <h2>{weather.name}</h2>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Condition: {weather.weather[0].description}</p>
      </div>
    )}
  </div>
  );
};

export default App;
