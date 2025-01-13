import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Box } from "@mui/material";

const TravelTab = ({ onDataUpdate }) => {
  const [transport, setTransport] = useState("public");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleKm, setVehicleKm] = useState(0);
  const [airTravel, setAirTravel] = useState("");

  const [prevData, setPrevData] = useState({
    transport,
    vehicleType,
    vehicleKm,
    airTravel,
  });

  const transportOptions = ["public", "car", "bike", "bus"];
  const vehicleTypeOptions = ["electric", "gas", "hybrid"];

  // Update the parent only if there is a change
  useEffect(() => {
    if (
      transport !== prevData.transport ||
      vehicleType !== prevData.vehicleType ||
      vehicleKm !== prevData.vehicleKm ||
      airTravel !== prevData.airTravel
    ) {
      onDataUpdate({
        transport,
        vehicleType,
        vehicleKm,
        airTravel,
      });
      setPrevData({ transport, vehicleType, vehicleKm, airTravel }); // Update previous data
    }
  }, [transport, vehicleType, vehicleKm, airTravel, prevData, onDataUpdate]);

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        label="Transport"
        select
        value={transport}
        onChange={(e) => setTransport(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        {transportOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      {transport !== "public" && (
        <>
          <TextField
            label="Vehicle Type"
            select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          >
            {vehicleTypeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Vehicle Km (per month)"
            type="number"
            value={vehicleKm}
            onChange={(e) => setVehicleKm(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        </>
      )}
      <TextField
        label="Air Travel"
        type="number"
        value={airTravel}
        onChange={(e) => setAirTravel(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default TravelTab;
