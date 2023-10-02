import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

function Weather({ city }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState("metric");
  const apiKey = 'ab7ee426a59eef9ea5407da9c2f6b0ba'; // unique user key
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null); // Clear any previous errors when fetching new data

    // Define the API endpoint to fetch data from, using chosen city and unit variables
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

    // Make the API call using the fetch function
    fetch(apiUrl)
      .then((response) => {
        // Check if the response status is OK (200)
        if (!response.ok) {
          throw new Error('City not found or network response was not ok');
        }
        // Parse the JSON response into JavaScript data
        return response.json();
      })
      .then((result) => {
        // Update the state with the fetched data
        setData(result);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message);
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false in case of an error
      });
  }, [city, unit]); // Re-run effect when the selected city changes

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  }

  const getWeatherIcon = () => {
    const description = data.weather && data.weather[0] && data.weather[0].main.toLowerCase();
    const iconSize = '20px'; // Adjust the size as needed
  
    if (description && description.includes('clear')) {
      return <WbSunnyIcon style={{ fontSize: iconSize }} />;
    } else if (description && description.includes('clouds')) {
      return <CloudIcon style={{ fontSize: iconSize }} />;
    } else if (description && description.includes('rain')) {
      return <BeachAccessIcon style={{ fontSize: iconSize }} />;
    }
    // Add more conditions and icons as needed
    return null; // Return null if no matching icon is found
  };

  return (
    <div className="App">
      <h1>Weather Data for {city}</h1>
      {error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <ul>
          <li>
            <strong>Weather Description:</strong> {data.weather[0].description} {getWeatherIcon()}
          </li>
          <li>
            <strong>Temperature:</strong> {data.main.temp} {unit === 'metric' ? 'Celsius' : 'Fahrenheit'}
          </li>
          <li>
            <strong>Humidity:</strong> {data.main.humidity} %
          </li>
          <li>
            <strong>Wind Speed:</strong> {data.wind.speed} {unit === 'metric' ? 'metres per second' : 'miles per hour'}
          </li>
        </ul>
        <Button onClick={toggleUnit}>Change Units</Button>
        </>
      )}
    </div>
  );
}

export default Weather;
