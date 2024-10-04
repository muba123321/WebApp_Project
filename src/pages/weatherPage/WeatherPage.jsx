import React, { useState } from "react";
import axios from "axios";

export default function WeatherPage() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "AMLEYU2M4VF3AGMNYKQDBWLUP";

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("Unable to fetch weather data. Please try again.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIconUrl = (iconName) => {
    // Assuming Visual Crossing hosts icons at the following base URL
    return `https://www.visualcrossing.com/img/icons/${iconName}.png`;
  };

  return (
    <div className="weather-container">
      <h1 className="title">Weather Forecast</h1>
      <div className="input-container">
        <input
          type="text"
          value={location}
          onChange={handleInputChange}
          placeholder="Enter city"
          className="input-box"
        />
        <button onClick={fetchWeather} className="fetch-button">
          Get Weather
        </button>
      </div>
      {loading && <div className="loader">Loading...</div>}
      {error && <p className="error-message">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          {/* Current Weather Section */}
          <h2 className="city-name">{weatherData.resolvedAddress}</h2>
          <img
            src={weatherData.currentConditions.icon}
            alt="weather icon"
            className="weather-icon"
          />
          <p className="description">
            {weatherData.currentConditions.conditions}
          </p>
          <p className="temperature">
            Temperature: {weatherData.currentConditions.temp}°C
          </p>
          <p className="feels-like">
            Feels like: {weatherData.currentConditions.feelslike}°C
          </p>
          <p className="humidity">
            Humidity: {weatherData.currentConditions.humidity}%
          </p>
          <p className="wind">
            Wind speed: {weatherData.currentConditions.windspeed} km/h
          </p>
          <p className="visibility">
            Visibility: {weatherData.currentConditions.visibility} km
          </p>

          {/* Weather Alerts Section */}
          {weatherData.alerts?.length > 0 && (
            <div className="alert-section">
              <h3>Weather Alerts</h3>
              {weatherData.alerts.map((alert, index) => (
                <div key={index} className="alert">
                  <h4>{alert.event}</h4>
                  <p>{alert.description}</p>
                  <p>
                    Start: {new Date(alert.onsetEpoch * 1000).toLocaleString()}
                  </p>
                  <p>
                    End: {new Date(alert.endsEpoch * 1000).toLocaleString()}
                  </p>
                  <a
                    href={alert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    More info
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Daily Forecast Section */}
          <h3>Daily Forecast (Next 7 Days)</h3>
          <div className="daily-forecast">
            {weatherData.days.slice(0, 7).map((day, index) => (
              <div key={index} className="day-card">
                <p>{new Date(day.datetimeEpoch * 1000).toLocaleDateString()}</p>
                <p>High: {day.tempmax}°C</p>
                <p>Low: {day.tempmin}°C</p>
                <img src={getWeatherIconUrl(day.icon)} alt="weather icon" />
                <p>{day.conditions}</p>
              </div>
            ))}
          </div>

          {/* Hourly Forecast Section */}
          <h3>Hourly Forecast (Next 24 Hours)</h3>
          <div className="hourly-forecast">
            {weatherData.days[0].hours.slice(0, 24).map((hour, index) => (
              <div key={index} className="hour-card">
                <p>
                  {new Date(hour.datetimeEpoch * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>{hour.temp}°C</p>
                <img src={getWeatherIconUrl(hour.icon)} alt="weather icon" />
                <p>{hour.conditions}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
