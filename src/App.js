import React, { useState, useEffect } from "react";
import axios from "axios";
import LocationField from "./components/LocationField";
import CityDateDisplay from "./components/CityDateDisplay";
import WeatherCityDisplay from "./components/WeatherCityDisplay";
import FiveDayForecast from "./components/FiveDayForecast";
import "./index.css";

function App() {
  const API = "bc0d0b017b94f6d25977609eb2aa9a13";
  const [currentData, setCurrentData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        const { latitude, longitude } = success.coords;
        axios
          .get(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API}`
          )
          .then((response) => {
            const city = response.data[0].name;
            setLocation(city);
          });
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      // Fetch current weather
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API}`
        )
        .then((response) => setCurrentData(response.data))
        .catch((error) => console.log(error));

      // Fetch 5-day forecast
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${API}`
        )
        .then((response) => {
          const dailyForecasts = response.data.list
            .filter((f) => f.dt_txt.includes("12:00:00"))
            .slice(0, 5);
          setForecastData(dailyForecasts);
        })
        .catch((error) => console.log(error));
    }
  }, [location]);

  return (
    <div className="app">
      {console.log("all", currentData)}
      <CityDateDisplay data={currentData} />
      <WeatherCityDisplay data={currentData} />
      <FiveDayForecast forecast={forecastData} />
      <LocationField location={location} setLocation={setLocation} />
    </div>
  );
}

export default App;
