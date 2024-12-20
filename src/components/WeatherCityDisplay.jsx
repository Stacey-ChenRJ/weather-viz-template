import React from "react";

function WeatherCityDisplay({ data }) {
  // Define a maximum precipitation threshold for calculating percentage
  const maxPrecipitation = 10; // 10mm of precipitation represents 100%

  // Check for precipitation data, including rain or snow
  const precipitation = data.rain
    ? data.rain["1h"] || data.rain["3h"]
    : data.snow
    ? data.snow["1h"] || data.snow["3h"]
    : 0;

  // Calculate precipitation percentage
  const precipitationPercentage = (precipitation / maxPrecipitation) * 100;

  // Function to get the weather icon URL from OpenWeatherMap
  const getWeatherIcon = (iconCode) => {
    const baseURL = "http://openweathermap.org/img/wn/";
    return `${baseURL}${iconCode}@2x.png`; // Construct the URL using the icon code
  };

  return (
    <div className="container weather-city-display">
      <div className="top">
        {data.main && (
          <div style={{ textAlign: "center" }}>
            {/* Temperature */}
            <h1
              style={{
                fontSize: "120px", 
                marginBottom: "5px", 
                fontWeight: "normal"  // Make the font weight lighter
              }}
            >
              {data.main.temp.toFixed()}°F
            </h1>
            
            
            
            {/* Weather description */}
            <p style={{ marginTop: "0px", marginBottom: "10px" }}>
              {data.weather ? data.weather[0].main : null}
            </p>
            

            {/* Weather Icon moved below temperature */}
            {data.weather && data.weather[0] && (
              <img
                src={getWeatherIcon(data.weather[0].icon)} // Use icon code from the API
                alt="weather icon"
                style={{ width: "100px", height: "100px", marginBottom: "10px" }}
              />
            )}

            
            {/* Weather stats */}
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div style={{ textAlign: "center" }}>
                <p>Precipitation</p>
                <p>{Math.min(100, precipitationPercentage.toFixed(2))}%</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p>Humidity</p>
                <p>{data.main.humidity}%</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p>Wind Speed</p>
                <p>{data.wind ? data.wind.speed.toFixed() : 0} MPH</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherCityDisplay;
