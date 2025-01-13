import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";

const ResultsTab = ({ predictionResult, onReset }) => {
  const { predicted_carbon_emission, suggestions } = predictionResult || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  // Function to format and remove unnecessary symbols like "*"
  const formatSuggestions = (suggestionsText) => {
    if (!suggestionsText) return "";

    const formattedText = suggestionsText
      .replace(/\*/g, "") // Remove "*" symbols
      .replace(/\n/g, "<br/>"); // Handle line breaks for better display in the UI

    return formattedText;
  };

  // Function to save the emission data to the backend
  const saveEmissionData = async () => {
    if (!predicted_carbon_emission) return;

    setLoading(true);
    setError(null);

    try {
      // Send POST request to backend to save the emission data
      const response = await axios.post("http://localhost:8080/api/emissions/save-emission", {
        userId, // Use actual user ID here
        emission: predicted_carbon_emission, // Send the predicted emission value
      });
      
      if (response.status === 201) {
        console.log("Emission data saved successfully.");
      }
    } catch (err) {
      console.error("Error saving emission data:", err);
      setError("Failed to save emission data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Call saveEmissionData when emission data is available
  useEffect(() => {
    if (predicted_carbon_emission) {
      saveEmissionData();
    }
  }, [predicted_carbon_emission]);

  return (
    <Box className="p-6 text-center">
      <Typography variant="h4" gutterBottom className="text-xl font-bold mb-4">
        Your Carbon Footprint
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom className="text-lg text-gray-600">
        Total CO₂ Emissions:{" "}
        {predicted_carbon_emission ? predicted_carbon_emission : "N/A"} kg/year
      </Typography>
      <Typography variant="body1" gutterBottom className="text-sm mb-4">
        This is an estimate of your carbon footprint based on the data you
        provided.
      </Typography>

      {/* Suggestions */}
      {suggestions && (
        <Box className="mt-6">
          <Typography variant="body2" color="text.secondary" className="font-medium text-gray-700 mb-2">
            Suggestions for Reducing CO₂ Emissions:
          </Typography>
          {/* Render the formatted suggestions */}
          <Typography
            variant="body2"
            className="text-gray-800 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: formatSuggestions(suggestions),
            }}
          />
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          onReset(); // Call onReset when button is clicked
        }}
        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Saving..." : "Reset Form"}
      </Button>

      {error && <Typography color="error" className="mt-4">{error}</Typography>}
    </Box>
  );
};

export default ResultsTab;
