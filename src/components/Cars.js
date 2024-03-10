import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";

export default function CarInfo() {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [models, setModels] = useState([]);
  const [data, setData] = useState({ recalls: [], ratings: [] });
  const [errorMessage, setErrorMessage] = useState("");
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [activeRecallTab, setActiveRecallTab] = useState(0);
  const years = [2017, 2018, 2019, 2020, 2021, 2022];
  const makes = ["Honda", "BMW", "Toyota", "Ford", "Audi"];

  const makeModelMapping = {
    Honda: ["Civic", "Accord", "Pilot"],
    BMW: ["X5", "X3", "M3"],
    Toyota: ["Corolla", "Camry", "RAV4"],
    Ford: ["F-150", "Taurus", "Mustang"],
    Audi: ["A5", "A6", "RS5"],
  };

  const handleMakeChange = (event) => {
    const selectedMake = event.target.value;
    setMake(selectedMake);
    setModel("");
    setModels(makeModelMapping[selectedMake]);
    setActiveRecallTab(0);
  };

  const fetchData = async () => {
    try {
      const endpoint =
        "https://mnnsrewy70.execute-api.us-east-1.amazonaws.com/prod/data";
      const response = await axios.get(
        `${endpoint}?year=${year}&make=${make}&model=${model}`
      );
      setData({
        recalls: response.data.recalls,
        ratings: response.data.ratings,
      });
      setErrorMessage("");
      setHasFetchedData(true);
    } catch (error) {
      setErrorMessage("Error fetching data. Please try again.");
      setHasFetchedData(false);
    }
  };

  const handleRecallTabChange = (event, newValue) => {
    setActiveRecallTab(newValue);
  };

  const RecallInfoBox = ({ recallItem }) => (
    <Box border={1} borderRadius={5} p={2} my={2}>
      <Typography variant="h6">Component: {recallItem.Component}</Typography>
      <Typography variant="body1">Summary: {recallItem.Summary}</Typography>
      <Typography variant="body2">
        Consequence: {recallItem.Consequence}
      </Typography>
      <Typography variant="body2">Remedy: {recallItem.Remedy}</Typography>
    </Box>
  );

  const RatingInfoBox = ({ ratingItem }) => (
    <Box border={1} borderRadius={5} p={2} my={2}>
      <Typography variant="h6">
        Vehicle: {ratingItem.VehicleDescription}
      </Typography>
      <Typography variant="body1">
        Overall Rating: {ratingItem.OverallRating}
      </Typography>
      <Typography variant="body2">
        Front Crash Rating: {ratingItem.OverallFrontCrashRating}
      </Typography>
      <Typography variant="body2">
        Side Crash Rating: {ratingItem.OverallSideCrashRating}
      </Typography>
      <Typography variant="body2">
        Rollover Rating: {ratingItem.RolloverRating}
      </Typography>
      <Typography variant="body2">
        Electronic Stability Control:{" "}
        {ratingItem.NHTSAElectronicStabilityControl}
      </Typography>
      <Typography variant="body2">
        Forward Collision Warning: {ratingItem.NHTSAForwardCollisionWarning}
      </Typography>
      <Typography variant="body2">
        Lane Departure Warning: {ratingItem.NHTSALaneDepartureWarning}
      </Typography>
    </Box>
  );

  return (
    <Container>
      <Paper
        elevation={3}
        style={{ padding: "50px 20px", width: "auto", margin: "20px auto" }}
      >
        <Typography variant="h6" style={{ color: "red", marginBottom: "20px" }}>
          Get Vehicle Information
        </Typography>

        <Select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>
            Select Year
          </MenuItem>
          {years.map((y) => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </Select>

        <Select value={make} onChange={handleMakeChange} displayEmpty fullWidth>
          <MenuItem value="" disabled>
            Select Make
          </MenuItem>
          {makes.map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          displayEmpty
          fullWidth
          disabled={!models.length}
        >
          <MenuItem value="" disabled>
            Select Model
          </MenuItem>
          {models.map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant="contained"
          onClick={fetchData}
          style={{ marginTop: "20px", display: "block", width: "100%" }}
        >
          Fetch Data
        </Button>

        {errorMessage && (
          <Typography
            color="error"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            {errorMessage}
          </Typography>
        )}

        {hasFetchedData && (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            mt={2}
          >
            <Box width="50%" pr={2}>
              <Typography variant="h6">Rating Information</Typography>
              {data.ratings.map((ratingItem, index) => (
                <RatingInfoBox key={index} ratingItem={ratingItem} />
              ))}
            </Box>

            <Box width="50%" pl={2}>
              {data.recalls.length > 0 ? (
                <>
                  <Tabs
                    value={activeRecallTab}
                    onChange={handleRecallTabChange}
                    orientation="vertical"
                    variant="scrollable"
                    style={{ overflow: "auto" }}
                  >
                    {data.recalls.map((recall, index) => (
                      <Tab
                        key={index}
                        label={
                          <Typography style={{ fontSize: "12px" }}>
                            {recall.Component}
                          </Typography>
                        }
                      />
                    ))}
                  </Tabs>
                  <Box sx={{ pt: 3 }}>
                    <Typography variant="h6">
                      Recall Details for{" "}
                      {data.recalls[activeRecallTab].Component}
                    </Typography>
                    <RecallInfoBox recallItem={data.recalls[activeRecallTab]} />
                  </Box>
                </>
              ) : (
                <Typography>No recall information available.</Typography>
              )}
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
