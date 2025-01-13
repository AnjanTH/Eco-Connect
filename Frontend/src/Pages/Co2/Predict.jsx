import React, { useState } from "react";
import { Button, Box, Grid, Tabs, Tab } from "@mui/material";
import axios from "axios";
import PersonalTab from "../Co2/PersonalTab";
import TravelTab from "../Co2/TravelTab";
import WasteTab from "../Co2/WasteTab";
import EnergyTab from "../Co2/EnergyTab";
import ConsumptionTab from "../Co2/ConsumptionTab";
import ResultsTab from "../Co2/ResultsTab";
import EmissionTracker from "./EmissionTracker";

const PredictCo2 = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    personal: {},
    travel: {},
    waste: {},
    energy: {},
    consumption: {},
  });
  const [predictionResult, setPredictionResult] = useState(null); // State to store prediction result
  const [loading, setLoading] = useState(false); // New state for button loading
  const userId = localStorage.getItem("userId");

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleNext = () => {
    if (tabIndex < 5) setTabIndex(tabIndex + 1);
  };

  const handlePrevious = () => {
    if (tabIndex > 0) setTabIndex(tabIndex - 1);
  };

  const handleDataUpdate = (tabName, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [tabName]: data,
    }));
    console.log(formData); // Log the updated formData after each tab's data is updated.
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true
    const heightInMeters = formData.personal.height / 100; // Convert height from cm to meters
    const weightInKg = formData.personal.weight;

    let bodyType = "unknown"; // Default to "unknown" if no values are provided

    if (heightInMeters && weightInKg) {
      const bmi = weightInKg / (heightInMeters * heightInMeters);

      if (bmi < 18.5) {
        bodyType = "underweight";
      } else if (bmi >= 18.5 && bmi < 24.9) {
        bodyType = "normal";
      } else if (bmi >= 25 && bmi < 29.9) {
        bodyType = "overweight";
      } else if (bmi >= 30) {
        bodyType = "obese";
      }
    }

    const Data = {
      'Body Type': bodyType,
      'Sex': formData.personal.gender || "male",
      'Diet': formData.personal.diet || "vegetarian",
      'How Often Shower': formData.personal.showerFrequency || "unknown",
      'Heating Energy Source': formData.energy.heatingSource || "electric",
      'Transport': formData.travel.transport || "public",
      'Vehicle Type': formData.travel.vehicleType || "electric",
      'Social Activity': formData.personal.social || "sometimes",
      'Monthly Grocery Bill': formData.consumption.groceryBill || "0",
      'Frequency of Traveling by Air': formData.travel.frequencyOfAirTravel || "unknown",
      'Vehicle Monthly Distance Km': formData.travel.vehicleKm || "0",
      'Waste Bag Size': formData.waste.wasteBagSize || "unknown",
      'Waste Bag Weekly Count': formData.waste.wasteBagCount || "0",
      'How Long TV PC Daily Hour': formData.personal.tvPcHours || "0",
      'How Many New Clothes Monthly': formData.consumption.howManyNewClothes || "0",
      'How Long Internet Daily Hour': formData.personal.internetHours || "0",
      'Energy efficiency': formData.energy.energyEfficiency || "unknown",
      'Recycling': formData.energy.recycle || "no",
      'Cooking_With': formData.energy.cookingMethod || "unknown",
    };

    console.log("Data to send:", Data);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", Data);
      console.log("Prediction Result:", response.data);
      setPredictionResult(response.data);
      setTabIndex(5); // Navigate to Results tab
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false); // Set loading to false after response
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "60%",
          typography: "body1",
          margin: "auto",
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        <Tabs value={tabIndex} onChange={handleChange} centered>
          <Tab label="👴 Personal" />
          <Tab label="🚗 Travel" />
          <Tab label="🗑️ Waste" />
          <Tab label="⚡ Energy" />
          <Tab label="💸 Consumption" />
          <Tab label="📊 Results" />
        </Tabs>

        <Box sx={{ marginTop: "20px" }}>
          {tabIndex === 0 && <PersonalTab onDataUpdate={(data) => handleDataUpdate("personal", data)} />}
          {tabIndex === 1 && <TravelTab onDataUpdate={(data) => handleDataUpdate("travel", data)} />}
          {tabIndex === 2 && <WasteTab onDataUpdate={(data) => handleDataUpdate("waste", data)} />}
          {tabIndex === 3 && <EnergyTab onDataUpdate={(data) => handleDataUpdate("energy", data)} />}
          {tabIndex === 4 && (
            <>
              <ConsumptionTab onDataUpdate={(data) => handleDataUpdate("consumption", data)} />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ marginTop: "20px" }}
                disabled={loading} // Disable button while loading
              >
                {loading ? "Predicting..." : "Check Result"}
              </Button>
            </>
          )}
          {tabIndex === 5 && <ResultsTab predictionResult={predictionResult} />}
        </Box>

        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePrevious}
              disabled={tabIndex === 0}
              fullWidth
            >
              Previous
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={tabIndex === 5}
              fullWidth
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>

      <EmissionTracker />
    </>
  );
};

export default PredictCo2;
