import React, { useState } from 'react';
import axios from 'axios';
import { Container, Paper, Button, Select, MenuItem } from '@mui/material';

export default function CarInfo() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [year, setYear] = useState('');
  const [model, setModel] = useState('');
  const [make, setMake] = useState('');
  const [models, setModels] = useState([]);
  const [recallData, setRecallData] = useState(null);
  const years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]; // Example years
  const makes = ['Acura', 'BMW', 'Toyota']; // Example makes

  // Example mapping of makes to models
  const makeModelMapping = {
    'Acura': ['MDX', 'RDX', 'TLX'],
    'BMW': ['X5', 'X3', 'M3'],
    'Toyota': ['Corolla', 'Camry', 'RAV4']
  };

  const handleMakeChange = (selectedMake) => {
    setMake(selectedMake);
    setModels(makeModelMapping[selectedMake] || []);
    setModel(''); // Reset model selection when make changes
  };

  const fetchRecallData = async () => {
    try {
      const response = await axios.get(`Your_API_Endpoint?year=${year}&model=${model}&make=${make}`);
      setRecallData(response.data);
    } catch (error) {
      console.error('Error fetching recall data:', error);
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}><u>Car Information</u></h1>

        {/* Dropdown for Year */}
        <Select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>Select Year</MenuItem>
          {years.map(y => (
            <MenuItem key={y} value={y}>{y}</MenuItem>
          ))}
        </Select>

        {/* Dropdown for Make */}
        <Select
          value={make}
          onChange={(e) => handleMakeChange(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>Select Make</MenuItem>
          {makes.map(m => (
            <MenuItem key={m} value={m}>{m}</MenuItem>
          ))}
        </Select>

        {/* Dropdown for Model */}
        <Select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          displayEmpty
          fullWidth
          disabled={!models.length}
        >
          <MenuItem value="" disabled>Select Model</MenuItem>
          {models.map(m => (
            <MenuItem key={m} value={m}>{m}</MenuItem>
          ))}
        </Select>

        <Button variant="contained" color="secondary" onClick={fetchRecallData}>
          Fetch Recall Data
        </Button>

        {/* Display Recall Data */}
        {recallData && (
          <div>
            <h3>Recall Information:</h3>
            <p>{JSON.stringify(recallData)}</p>
          </div>
        )}
      </Paper>
    </Container>
  );
}
