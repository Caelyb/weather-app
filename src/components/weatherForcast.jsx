import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

function WeatherForecast({ city }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState(null);
  const apiKey = '346f771d0bddc5f17262e6f1894289d8'; // unique user API Key

  useEffect(() => {
    setError(null); // clear previous errors when fetching new data
    // Define the API endpoint to fetch data from, using the chosen city and unit variables
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;

    // Make the API call using the fetch function
    fetch(apiUrl)
      .then((response) => {
        // Check if the response status is OK (200)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the JSON response into JavaScript data
        return response.json();
      })
      .then((result) => {
        // Group forecast data by day and calculate daily averages
        const dailyData = groupByDay(result.list);
        // Limit to a maximum of 5 days
        const limitedData = dailyData.slice(0, 5);
        // Update the state with the limited daily data
        setData(limitedData);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false in case of an error
      });
  }, [city, unit]); // Re-run the effect when the selected city or unit changes

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  // Function to group forecast data by day and calculate daily averages
  const groupByDay = (forecastList) => {
    const dailyData = {};
    forecastList.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000);
      const dayName = getDayName(date);
      if (!dailyData[dayName]) {
        dailyData[dayName] = {
          date: dayName,
          tempSum: forecast.main.temp,
          humiditySum: forecast.main.humidity,
          windSpeedSum: forecast.wind.speed,
          weatherDescription: forecast.weather[0].description,
          weatherClearDescription: forecast.weather[0].main,
        };
      } else {
        dailyData[dayName].tempSum += forecast.main.temp;
        dailyData[dayName].humiditySum += forecast.main.humidity;
        dailyData[dayName].windSpeedSum += forecast.wind.speed;
      }
    });
    // Calculate daily averages
    for (const dayName in dailyData) {
      const count = forecastList.filter(
        (forecast) => getDayName(new Date(forecast.dt * 1000)) === dayName
      ).length;
      dailyData[dayName].tempAvg = (dailyData[dayName].tempSum / count).toFixed(2);
      dailyData[dayName].humidityAvg = (dailyData[dayName].humiditySum / count).toFixed(2);
      dailyData[dayName].windSpeedAvg = (dailyData[dayName].windSpeedSum / count).toFixed(2);
    }
    return Object.values(dailyData);
  };

  // Function to get the day name from a date
  const getDayName = (date) => {
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const getWeatherIcon = (desc) => {
    const iconSize = '20px'; // Adjust the size as needed
    const description = desc.toLowerCase();

    if (description.includes('clear')) {
      return <WbSunnyIcon style={{ fontSize: iconSize }} />;
    } else if (description.includes('clouds')) {
      return <CloudIcon style={{ fontSize: iconSize }} />;
    } else if (description.includes('rain')) {
      return <BeachAccessIcon style={{ fontSize: iconSize }} />;
    }
    // Add more conditions and icons as needed
    return null; // Return null if no matching icon is found
  };

  return (
    <div className="App">
      <h1>5-Day Weather Forecast for {city}</h1>
      {error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <Grid container spacing={1}>
          {data.map((day, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h7" component="div">
                    {day.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <ul>
                      <li>
                        <strong>Weather:</strong> {day.weatherClearDescription}{' '}
                        {getWeatherIcon(day.weatherClearDescription)}
                      </li>
                      <li>
                        <strong>Temperature:</strong> {day.tempAvg}{' '}
                        {unit === 'metric' ? 'C' : 'F'}
                      </li>
                      <li>
                        <strong>Humidity:</strong> {day.humidityAvg} %
                      </li>
                      <li>
                        <strong>Wind Speed:</strong> {day.windSpeedAvg}{' '}
                        {unit === 'metric' ? 'mps' : 'mph'}
                      </li>
                    </ul>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={toggleUnit}>
                    Change units
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default WeatherForecast;
