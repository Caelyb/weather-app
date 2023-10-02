import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

export default function Search({ onCitySelect }) {
  const [City, setCity] = useState(null);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (City !== null) {
      onCitySelect(City);
    }
  }, [City, onCitySelect]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleUpdateCity = () => {
    if (userInput) {
      setCity(userInput); // Update the city state with user input
      console.log("handleUpdateCity in Search fires with", City);
    }
  };

  const handleCityChange = (event, newValue) => {
    setCity(newValue);
  };

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="Search"
        freeSolo
        options={Cities.map((option) => option.label)}
        value={City}
        onChange={handleCityChange}
        renderInput={(params) => <TextField {...params} label="Select from list" />}
      />
      <TextField
        id="UserInput"
        label="User Specified City Name"
        value={userInput}
        onChange={handleInputChange}
      />
      <Button variant="outlined" onClick={handleUpdateCity}>
        Update City
      </Button>
    </Stack>
  );
}

// 100 major cities
const Cities = [
    { id: 1, label: 'Tokyo' },
    { id: 2, label: 'Delhi' },
    { id: 3, label: 'Shanghai' },
    { id: 4, label: 'Beijing' },
    { id: 5, label: 'Mumbai' },
    { id: 6, label: 'Istanbul' },
    { id: 7, label: 'Lahore' },
    { id: 8, label: 'Bangkok' },
    { id: 9, label: 'Kolkata' },
    { id: 10, label: 'Kinshasa' },
    { id: 11, label: 'Manila' },
    { id: 12, label: 'Cairo' },
    { id: 13, label: 'Jakarta' },
    { id: 14, label: 'Seoul' },
    { id: 15, label: 'Wuhan' },
    { id: 16, label: 'Lima' },
    { id: 17, label: 'Bangalore' },
    { id: 18, label: 'New York City' },
    { id: 19, label: 'London' },
    { id: 20, label: 'Bogotá' },
    { id: 21, label: 'Tehran' },
    { id: 22, label: 'Ho Chi Minh City' },
    { id: 23, label: 'Hong Kong' },
    { id: 24, label: 'Bangkok' },
    { id: 25, label: 'Kuala Lumpur' },
    { id: 26, label: 'Rio de Janeiro' },
    { id: 27, label: 'Lisbon' },
    { id: 28, label: 'Sydney' },
    { id: 29, label: 'Singapore' },
    { id: 30, label: 'Amsterdam' },
    { id: 31, label: 'Los Angeles' },
    { id: 32, label: 'Chicago' },
    { id: 33, label: 'Toronto' },
    { id: 34, label: 'Berlin' },
    { id: 35, label: 'Madrid' },
    { id: 36, label: 'Rome' },
    { id: 37, label: 'Paris' },
    { id: 38, label: 'Vienna' },
    { id: 39, label: 'Zurich' },
    { id: 40, label: 'Stockholm' },
    { id: 41, label: 'Oslo' },
    { id: 42, label: 'Helsinki' },
    { id: 43, label: 'Copenhagen' },
    { id: 44, label: 'Warsaw' },
    { id: 45, label: 'Moscow' },
    { id: 46, label: 'St. Petersburg' },
    { id: 47, label: 'Athens' },
    { id: 48, label: 'Istanbul' },
    { id: 49, label: 'Cairo' },
    { id: 50, label: 'Tel Aviv' },
    { id: 51, label: 'Dubai' },
    { id: 52, label: 'Mumbai' },
    { id: 53, label: 'Kolkata' },
    { id: 54, label: 'Nairobi' },
    { id: 55, label: 'Cape Town' },
    { id: 56, label: 'Johannesburg' },
    { id: 57, label: 'Sydney' },
    { id: 58, label: 'Auckland' },
    { id: 59, label: 'Wellington' },
    { id: 60, label: 'Brisbane' },
    { id: 61, label: 'Melbourne' },
    { id: 62, label: 'Perth' },
    { id: 63, label: 'Adelaide' },
    { id: 64, label: 'Sydney' },
    { id: 65, label: 'Brisbane' },
    { id: 66, label: 'Melbourne' },
    { id: 67, label: 'Perth' },
    { id: 68, label: 'Adelaide' },
    { id: 69, label: 'Auckland' },
    { id: 70, label: 'Wellington' },
    { id: 71, label: 'Queenstown' },
    { id: 72, label: 'Singapore' },
    { id: 73, label: 'Kuala Lumpur' },
    { id: 74, label: 'Bangkok' },
    { id: 75, label: 'Phuket' },
    { id: 76, label: 'Seoul' },
    { id: 77, label: 'Busan' },
    { id: 78, label: 'Tokyo' },
    { id: 79, label: 'Kyoto' },
    { id: 80, label: 'Osaka' },
    { id: 81, label: 'Beijing' },
    { id: 82, label: 'Shanghai' },
    { id: 83, label: 'Shenzhen' },
    { id: 84, label: 'Guangzhou' },
    { id: 85, label: 'Hong Kong' },
    { id: 86, label: 'Macao' },
    { id: 87, label: 'Taipei' },
    { id: 88, label: 'Bangalore' },
    { id: 89, label: 'Mumbai' },
    { id: 90, label: 'Kolkata' },
    { id: 91, label: 'New Delhi' },
    { id: 92, label: 'Lahore' },
    { id: 93, label: 'Karachi' },
    { id: 94, label: 'Islamabad' },
    { id: 95, label: 'Dhaka' },
    { id: 96, label: 'Colombo' },
    { id: 97, label: 'Kathmandu' },
    { id: 98, label: 'Thimphu' },
    { id: 99, label: 'Male' },
    { id: 100, label: 'Kabul' },
  ];
