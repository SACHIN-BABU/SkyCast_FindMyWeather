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
