import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Slider, Box } from "@mui/material";

const WasteTab = ({ onDataUpdate }) => {
  const [recycle, setRecycle] = useState("");
  const [plasticWaste, setPlasticWaste] = useState(0);
  const [organicWaste, setOrganicWaste] = useState(0);

  const [prevData, setPrevData] = useState({
    recycle,
    plasticWaste,
    organicWaste,
  });

  const recycleOptions = ["yes", "no", "sometimes"];

  // Update the parent only if any data changes
  useEffect(() => {
    if (
      recycle !== prevData.recycle ||
      plasticWaste !== prevData.plasticWaste ||
      organicWaste !== prevData.organicWaste
    ) {
      onDataUpdate({
        recycle,
        plasticWaste,
        organicWaste,
      });
      setPrevData({ recycle, plasticWaste, organicWaste }); // Update previous data
    }
  }, [recycle, plasticWaste, organicWaste, prevData, onDataUpdate]);

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        label="Do you recycle?"
        select
        value={recycle}
        onChange={(e) => setRecycle(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        {recycleOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <Slider
        value={plasticWaste}
        onChange={(e, newValue) => setPlasticWaste(newValue)}
        min={0}
        max={50}
        step={1}
        valueLabelDisplay="auto"
        sx={{ mb: 2 }}
        marks
      />
      <TextField
        label="Plastic Waste (kg per month)"
        value={plasticWaste}
        fullWidth
        disabled
        sx={{ mb: 2 }}
      />

      <Slider
        value={organicWaste}
        onChange={(e, newValue) => setOrganicWaste(newValue)}
        min={0}
        max={50}
        step={1}
        valueLabelDisplay="auto"
        sx={{ mb: 2 }}
        marks
      />
      <TextField
        label="Organic Waste (kg per month)"
        value={organicWaste}
        fullWidth
        disabled
      />
    </Box>
  );
};

export default WasteTab;
