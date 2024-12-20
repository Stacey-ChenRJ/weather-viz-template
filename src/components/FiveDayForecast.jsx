import React from "react";

const cityName = {
  textAlign: "left",
  fontSize: "1.5rem",
  fontWeight: "light",
  color: "#333",
};

function FiveDayForecast({ forecast }) {
  if (!forecast || forecast.length === 0) {
    return <div>Loading forecast...</div>;
  }

  const iconUrl = "http://openweathermap.org/img/wn/"; // Base URL for OpenWeatherMap icons

  return (
    <div className="container five-day-forecast" style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
      {forecast.map((day, index) => (
        <div key={index} style={styles.ovalContainer}>
          <div>
            <p style={styles.weekday}>
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`${iconUrl}${day.weather[0].icon}@2x.png`}  // Construct the image URL using icon code
              alt={day.weather[0].description}  // Alt text for the icon
              style={styles.icon}
            />
            <p style={styles.temperature}>{day.main.temp.toFixed()}°F</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  ovalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
    borderRadius: "50%", // Makes it oval
    padding: "10px",
    width: "100px", // Shorter width
    height: "90px", // Shorter height
    textAlign: "center",
    border: "1px solid rgba(0, 0, 0, 0)" // Optional: to add a transparent border if desired
  },
  
  weekday: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#FFFFFF", // White text for weekday
    marginBottom: "5px", 
  },
  
  icon: {
    width: "40px", // Adjust size of the icon
    height: "40px", // Adjust size of the icon
    margin: "5px 0", // Space between weekday and temperature
  },
  
  temperature: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#FFFFFF", // White text for temperature
    marginTop: "0",
  },
};

export default FiveDayForecast;
