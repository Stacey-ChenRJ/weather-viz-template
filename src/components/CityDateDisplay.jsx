const cityName = {
  textAlign: "center",
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#333",
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100px", // Adjust height as needed
};

function CityDateDisplay({ data }) {
  // Convert the current date to a more readable format
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container city-date-display" style={containerStyle}>
      <div className="location">
        <p style={cityName}>{data.name}</p> {/* Display city name */}
        <p>{date}</p> {/* Display formatted date */}
      </div>
    </div>
  );
}

export default CityDateDisplay;
