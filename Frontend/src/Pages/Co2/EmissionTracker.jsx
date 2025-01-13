import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement, // Added to fix the error
} from "chart.js";

// Register all required chart components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

function EmissionTracker() {
  const [emissionData, setEmissionData] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  // Function to fetch emission data
  const fetchEmissionData = async () => {
    setLoading(true);
    setError(null); // Reset the error state before each request
    try {
      const response = await axios.get(
        `http://localhost:8080/api/emissions/get-emissions/${userId}`
      );
      setEmissionData(response.data || []);
    } catch (err) {
      console.error("Failed to fetch emissions data", err);
      setError("Unable to fetch emission data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Function to process raw emission data into chart-friendly format
  const processChartData = (data) => {
    const labels = data.map((entry) =>
      new Date(entry.date).toLocaleDateString()
    );
    const emissions = data.map((entry) => entry.emission);

    return {
      labels,
      datasets: [
        {
          label: "Daily CO₂ Emission (kg)",
          data: emissions,
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          tension: 0.1,
        },
      ],
    };
  };

  // Fetch data on mount and whenever the userId changes
  useEffect(() => {
    if (userId) {
      fetchEmissionData();
    }
  }, [userId]);

  // Update chartData when emissionData changes
  useEffect(() => {
    if (emissionData.length > 0) {
      const processedData = processChartData(emissionData);
      setChartData(processedData);
    }
  }, [emissionData]);

  return (
    <div
      className="container mt-3 flex items-center justify-center"
      style={{ maxWidth: "100vw", height: "100vh", padding: "10px" }}
    >
      <div className="text-center" style={{ width: "100%" }}>
        <h2 className="mb-3" style={{ fontSize: "1.5rem" }}>
          Daily CO₂ Emission Tracker
        </h2>
        {loading ? (
          <div style={{ fontSize: "1rem" }}>Loading...</div>
        ) : error ? (
          <div className="text-danger" style={{ fontSize: "1rem" }}>
            {error}
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default EmissionTracker;
