import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Box } from "@mui/material";

const PersonalTab = ({ onDataUpdate }) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [diet, setDiet] = useState("");
  const [social, setSocial] = useState("");

  const [prevData, setPrevData] = useState({ height, weight, gender, diet, social });

  const diets = ["omnivore", "pescatarian", "vegetarian", "vegan"];
  const socialOptions = ["never", "often", "sometimes"];

  // This will be called to update the parent component only if a change occurs
  useEffect(() => {
    if (
      height !== prevData.height ||
      weight !== prevData.weight ||
      gender !== prevData.gender ||
      diet !== prevData.diet ||
      social !== prevData.social
    ) {
      onDataUpdate({
        height,
        weight,
        gender,
        diet,
        social,
      });
      setPrevData({ height, weight, gender, diet, social }); // Update previous values to the current ones
    }
  }, [height, weight, gender, diet, social, prevData, onDataUpdate]);

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        label="Height (cm)"
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Weight (kg)"
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Gender"
        select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="male">Male</MenuItem>
      </TextField>
      <TextField
        label="Diet"
        select
        value={diet}
        onChange={(e) => setDiet(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        {diets.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Social Activity"
        select
        value={social}
        onChange={(e) => setSocial(e.target.value)}
        fullWidth
      >
        {socialOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default PersonalTab;
