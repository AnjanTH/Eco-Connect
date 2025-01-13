import React, { useState, useEffect } from "react";
import { TextField, Slider, Box } from "@mui/material";

const ConsumptionTab = ({ onDataUpdate }) => {
  const [clothingItems, setClothingItems] = useState(0);
  const [electronics, setElectronics] = useState(0);
  const [meals, setMeals] = useState(0);
  
  const [prevData, setPrevData] = useState({
    clothingItems,
    electronics,
    meals
  });

  // Only update parent if data changes
  useEffect(() => {
    if (
      clothingItems !== prevData.clothingItems ||
      electronics !== prevData.electronics ||
      meals !== prevData.meals
    ) {
      onDataUpdate({
        clothingItems,
        electronics,
        meals,
      });
      setPrevData({ clothingItems, electronics, meals }); // Update previous data
    }
  }, [clothingItems, electronics, meals, prevData, onDataUpdate]);

  return (
    <Box sx={{ padding: 2 }}>
      {/* Clothing Items Slider */}
      <Slider
        value={clothingItems}
        onChange={(e, newValue) => setClothingItems(newValue)}
        min={0}
        max={20}
        step={1}
        valueLabelDisplay="auto"
        sx={{ mb: 2 }}
        marks
      />
      <TextField
        label="Clothing Items Purchased (per month)"
        value={clothingItems}
        fullWidth
        disabled
        sx={{ mb: 2 }}
      />

      {/* Electronics Slider */}
      <Slider
        value={electronics}
        onChange={(e, newValue) => setElectronics(newValue)}
        min={0}
        max={10}
        step={1}
        valueLabelDisplay="auto"
        sx={{ mb: 2 }}
        marks
      />
      <TextField
        label="Electronics Purchased (per year)"
        value={electronics}
        fullWidth
        disabled
        sx={{ mb: 2 }}
      />

      {/* Meals Slider */}
      <Slider
        value={meals}
        onChange={(e, newValue) => setMeals(newValue)}
        min={0}
        max={50}
        step={1}
        valueLabelDisplay="auto"
        sx={{ mb: 2 }}
        marks
      />
      <TextField
        label="Meals Eaten Out (per month)"
        value={meals}
        fullWidth
        disabled
      />
    </Box>
  );
};

export default ConsumptionTab;
