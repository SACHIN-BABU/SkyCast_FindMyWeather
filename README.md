# SkyCast - Find My Weather
## Date: 21-07-2025
## Sachin B
## 212222060207

## Objective:
To build a responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API. This project demonstrates the use of Axios for API calls, React Router for navigation, React Hooks for state management, controlled components with validation, and basic styling with CSS.
## Tasks:

#### 1. Project Setup
Initialize React app.

Install necessary dependencies: npm install axios react-router-dom

#### 2. Routing
Set up BrowserRouter in App.js.

Create two routes:

/ – Home page with input form.

/weather – Page to display weather results.

#### 3. Home Page (City Input)
Create a controlled input field for the city name.

Add validation to ensure the input is not empty.

On valid form submission, navigate to /weather and store the city name.

#### 4. Weather Page (API Integration)
Use Axios to fetch data from the OpenWeatherMap API using the city name.

Show temperature, humidity, wind speed, and weather condition.

Convert and display temperature in both Celsius and Fahrenheit using useMemo.

#### 5. React Hooks
Use useState for managing city, weather data, and loading state.

Use useEffect to trigger the Axios call on page load.

Use useCallback to optimize form submit handler.

Use useMemo for temperature conversion logic.

#### 6. UI Styling (CSS)
Create a responsive and clean layout using CSS.

Style form, buttons, weather display cards, and navigation links.

## Programs:

### Home.jsx
```
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('City name is required');
      return;
    }
    setError('');
    localStorage.setItem('city', city.trim());
    navigate('/weather');
  }, [city, navigate]);

  return (
    <div className="container">
      <h2>SkyCast - Find My Weather</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={city}
          placeholder="Enter city name..."
          onChange={e => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Home;
```

### Weather.jsx
```
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

```

### App.jsx
```
import { Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Weather from './component/Weather';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </div>
  );
}

export default App;

```
### App.css
```
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: linear-gradient(to bottom, #d0eafc, #fbfdff);
}

.container {
  text-align: center;
  margin-top: 100px;
}

.form {
  margin-top: 20px;
}

input {
  padding: 10px;
  font-size: 16px;
  width: 250px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  margin-left: 10px;
  font-size: 16px;
  background-color: royalblue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.weather-card {
  max-width: 400px;
  margin: 60px auto;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

```


## Output:

<img width="1920" height="1080" alt="Screenshot 2025-07-23 152203" src="https://github.com/user-attachments/assets/71f3dad6-dd67-45ac-9fb7-f7d14d372ce8" />
<img width="1920" height="1080" alt="Screenshot 2025-07-23 152212" src="https://github.com/user-attachments/assets/60ad06a5-1857-4cb7-b6ff-80730149b5ed" />





## Result:
A responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API has been built successfully. 
