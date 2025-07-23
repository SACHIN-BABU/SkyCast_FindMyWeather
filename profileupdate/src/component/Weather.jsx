import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const city = localStorage.getItem('city') || '';
  const navigate = useNavigate();

  useEffect(() => {
    if (!city) {
      navigate('/');
      return;
    }

    const API_KEY = 'b2397675e951aa226fe123b570b005b6';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    axios
      .get(URL)
      .then(res => {
        setWeather(res.data);
        setLoading(false);
      })
      .catch(err => {
        setWeather(null);
        setLoading(false);
      });
  }, [city, navigate]);

  const tempFahrenheit = useMemo(() => {
    if (!weather) return null;
    return ((weather.main.temp * 9) / 5 + 32).toFixed(2);
  }, [weather]);

  if (loading) return <p>Loading...</p>;
  if (!weather) return <p>Error loading weather. Please check the city name.</p>;

  return (
    <div className="weather-card">
      <h2>Weather in {weather.name}</h2>
      <p>Temperature: {weather.main.temp}°C / {tempFahrenheit}°F</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
      <p>Condition: {weather.weather[0].main}</p>
      <button onClick={() => navigate('/')}>Search Again</button>
    </div>
  );
}

export default Weather;
