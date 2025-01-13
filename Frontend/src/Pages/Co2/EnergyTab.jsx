import React, { useState } from "react";
import { TextField, Slider, Box, MenuItem } from "@mui/material";

const EnergyTab = ({ onDataUpdate }) => {
  const [electricityUsage, setElectricityUsage] = useState(0);
  const [renewableEnergy, setRenewableEnergy] = useState("");
  const [gasUsage, setGasUsage] = useState(0);

  const renewableOptions = ["none", "partial", "full"];

  // Call this function when any input is changed to send data to parent
  const handleInputChange = () => {
    onDataUpdate({
      electricityUsage,
      renewableEnergy,
      gasUsage,
    });
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Electricity Usage Slider */}
      <Slider
        value={electricityUsage}
        onChange={(e, newValue) => {
          setElectricityUsage(newValue);
          handleInputChange(); // Send updated data to parent
        }}
        min={0}
        max={1000}
        step={10}
        valueLabelDisplay="auto"
        sx={{ mb: 2 }}
        marks
      />
      <TextField
        label="Electricity Usage (kWh per month)"
        value={electricityUsage}
        fullWidth
        disabled
        sx={{ mb: 2 }}
      />

      {/* Renewable Energy Dropdown */}
      <TextField
        label="Renewable Energy Usage"
        select
        value={renewableEnergy}
        onChange={(e) => {
          setRenewableEnergy(e.target.value);
          handleInputChange(); // Send updated data to parent
        }}
        fullWidth
        sx={{ mb: 2 }}
      >
        {renewableOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {/* Gas Usage Slider */}
      <Slider
        value={gasUsage}
        onChange={(e, newValue) => {
          setGasUsage(newValue);
          handleInputChange(); // Send updated data to parent
        }}
        min={0}
        max={1000}
        step={10}
        valueLabelDisplay="auto"
        sx={{ mb: 2 }}
        marks
      />
      <TextField
        label="Gas Usage (kg per month)"
        value={gasUsage}
        fullWidth
        disabled
      />
    </Box>
  );
};

export default EnergyTab;
