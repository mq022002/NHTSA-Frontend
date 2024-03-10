import React, { useState } from 'react';
import axios from 'axios';
import { Container, Paper, Button, Select, MenuItem, Box, Typography } from '@mui/material';

export default function CarInfo() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [models, setModels] = useState([]); // Correctly defined here
    const [recallData, setRecallData] = useState(null);
    const [ratingData, setRatingData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [hasFetchedRecall, setHasFetchedRecall] = useState(false);
    const [hasFetchedRating, setHasFetchedRating] = useState(false);
    const years = [2017, 2018, 2019, 2020, 2021, 2022];
    const makes = ['Honda', 'BMW', 'Toyota', 'Ford', 'Audi'];

    const makeModelMapping = {
        'Honda': ['Civic', 'Accord', 'Pilot'],
        'BMW': ['X5', 'X3', 'M3'],
        'Toyota': ['Corolla', 'Camry', 'RAV4'],
        'Ford': ['F-150', 'Taurus', 'Mustang'],
        'Audi': ['A5', 'A6', 'RS5']
    };

    const handleMakeChange = (selectedMake) => {
        setMake(selectedMake);
        setModel('');
        setModels(makeModelMapping[selectedMake] || []);
    };

    const fetchRecallData = async () => {
        try {
            const response = await axios.get(`/api/recall?year=${year}&make=${make}&model=${model}`);
            setRecallData(response.data);
            setErrorMessage('');
            setHasFetchedRecall(true);
        } catch (error) {
            handleFetchError(error);
        }
    };

    const fetchRatingData = async () => {
        try {
            const response = await axios.get(`/api/rating?year=${year}&make=${make}&model=${model}`);
            setRatingData(response.data);
            setErrorMessage('');
            setHasFetchedRating(true);
        } catch (error) {
            handleFetchError(error);
        }
    };

    const handleFetchError = (error) => {
        setRecallData(null);
        setRatingData(null);
        setErrorMessage('Error fetching data. Please try again.');
    };

    const RecallInfoBox = ({ recallItem }) => (
        <Box border={1} borderRadius={5} p={2} my={2}>
            <Typography variant="h6">Component: {recallItem.Component}</Typography>
            <Typography variant="body1">Summary: {recallItem.Summary}</Typography>
            <Typography variant="body2">Consequence: {recallItem.Consequence}</Typography>
            <Typography variant="body2">Remedy: {recallItem.Remedy}</Typography>
        </Box>
    );

    const RatingInfoBox = ({ ratingItem }) => {
        return (
            <Box border={1} borderRadius={5} p={2} my={2}>
                <Typography variant="h6">Vehicle: {ratingItem.VehicleDescription}</Typography>
                <Typography variant="body1">Overall Rating: {ratingItem.OverallRating}</Typography>
                <Typography variant="body2">Front Crash Rating: {ratingItem.OverallFrontCrashRating}</Typography>
                <Typography variant="body2">Side Crash Rating: {ratingItem.OverallSideCrashRating}</Typography>
                <Typography variant="body2">Rollover Rating: {ratingItem.RolloverRating}</Typography>
                <Typography variant="body2">Electronic Stability Control: {ratingItem.NHTSAElectronicStabilityControl}</Typography>
                <Typography variant="body2">Forward Collision Warning: {ratingItem.NHTSAForwardCollisionWarning}</Typography>
                <Typography variant="body2">Lane Departure Warning: {ratingItem.NHTSALaneDepartureWarning}</Typography>
            </Box>
        );
    };

    return (
        <Container>
            <Paper elevation={3} style={{ padding: '50px 20px', margin: '20px auto', maxWidth: '1200px' }}>
                <Typography variant="h6" style={{ color: "red", marginBottom: '20px' }}>
                    Get Vehicle Information
                </Typography>
                
                {/* Dropdowns and Buttons */}
    
                <Select value={year} onChange={(e) => setYear(e.target.value)} displayEmpty fullWidth>
                    <MenuItem value="" disabled>Select Year</MenuItem>
                    {years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                </Select>
    
                <Select value={make} onChange={(e) => handleMakeChange(e.target.value)} displayEmpty fullWidth>
                    <MenuItem value="" disabled>Select Make</MenuItem>
                    {makes.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </Select>
    
                <Select value={model} onChange={(e) => setModel(e.target.value)} displayEmpty fullWidth disabled={!models.length}>
                    <MenuItem value="" disabled>Select Model</MenuItem>
                    {models && models.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </Select>
    
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                <Button
                    variant="contained"
                    style={{ backgroundColor: 'rgba(1, 1, 1, 0.1)', color: '#ff0000', border: '1px solid #757575' }}
                    onClick={fetchRecallData}>
                    Fetch Recall Data
                </Button>
                <Button
                    variant="contained"
                    style={{ backgroundColor: 'rgba(1, 1, 1, 0.1)', color: '#ff0000', border: '1px solid #757575' }}
                    onClick={fetchRatingData}>
                    Fetch Rating Data
                </Button>


                </div>
    
                {errorMessage && (
                    <Typography color="error" style={{ marginTop: '20px', textAlign: 'center' }}>{errorMessage}</Typography>
                )}
    
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: '20px' }}>
                    {/* Column for Displaying Recall Data */}
                    <div style={{ flexBasis: '48%', maxWidth: '48%', marginTop: '20px' }}>
                        <Typography variant="h6">Recall Information</Typography>
                        {hasFetchedRecall ? (
                            recallData && recallData.length ? (
                                recallData.map((item, index) => (
                                    <Box key={index} border={1} borderRadius={5} p={2} my={2}>
                                        <Typography variant="h6">Component: {item.Component}</Typography>
                                        <Typography variant="body1">Summary: {item.Summary}</Typography>
                                        <Typography variant="body1">Consequence: {item.Consequence}</Typography>
                                        <Typography variant="body1">Remedy: {item.Remedy}</Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography>No recall information available.</Typography>
                            )
                        ) : (
                            <Typography>Select to fetch recall information.</Typography>
                        )}
                    </div>
    
                    {/* Column for Displaying Rating Data */}
                    <div style={{ flexBasis: '48%', maxWidth: '48%', marginTop: '20px' }}>
                        <Typography variant="h6">Rating Information</Typography>
                        {hasFetchedRating ? (
                            ratingData && ratingData.length ? (
                                ratingData.map((item, index) => (
                                    <Box key={index} border={1} borderRadius={5} p={2} my={2}>
                                        <Typography variant="h6">Vehicle Description: {item.VehicleDescription}</Typography>
                                        <Typography variant="body1">Overall Rating: {item.OverallRating}</Typography>
                                        <Typography variant="body1">Front Crash Rating: {item.OverallFrontCrashRating}</Typography>
                                        <Typography variant="body1">Side Crash Rating: {item.OverallSideCrashRating}</Typography>
                                        <Typography variant="body1">Rollover Rating: {item.RolloverRating}</Typography>
                                        <Typography variant="body1">Electronic Stability Control: {item.NHTSAElectronicStabilityControl}</Typography>
                                        <Typography variant="body1">Forward Collision Warning: {item.NHTSAForwardCollisionWarning}</Typography>
                                        <Typography variant="body1">Lane Departure Warning: {item.NHTSALaneDepartureWarning}</Typography>

                                        {/* Add more fields as necessary */}
                                    </Box>
                                ))
                            ) : (
                                <Typography>No rating information available.</Typography>
                            )
                        ) : (
                            <Typography>Select to fetch rating information.</Typography>
                        )}
                    </div>
                </div>
            </Paper>
        </Container>
    );
                        }    