import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const EnvironmentalImpactChart = () => {
  // Real data for the pie chart (will be used for donut as well)
  const pieData = {
    labels: ['Carbon Emissions (40%)', 'Plastic Usage (25%)', 'Water Consumption (15%)', 'Deforestation (10%)', 'Other (10%)'],
    datasets: [
      {
        label: 'Environmental Impact Breakdown',
        data: [40, 25, 15, 10, 10], // Realistic data
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFDB33'], // Different colors for each segment
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: ['Carbon Emissions', 'Plastic Usage', 'Water Consumption', 'Deforestation', 'Other'],
    datasets: [
      {
        label: 'Impact in Percentage',
        data: [40, 25, 15, 10, 10],
        backgroundColor: '#33A1FF', // Blue color for bars
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  // Stacked Bar Chart data
  const stackedBarData = {
    labels: ['Carbon Emissions', 'Plastic Usage', 'Water Consumption', 'Deforestation', 'Other'],
    datasets: [
      {
        label: 'Impact in Percentage',
        data: [40, 25, 15, 10, 10],
        backgroundColor: '#FF5733',
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  // Options for the charts
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`, // Display percentage in tooltip
        },
      },
    },
  };

  // Options for Stacked Bar Chart
  const stackedBarOptions = {
    ...options,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Pie (Donut) Chart */}
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Environmental Impact Breakdown (Donut)</h2>
        <div className="mt-6">
          <Pie
            data={pieData}
            options={options}
            style={{ maxWidth: '370px', height: '370px' }} // Decreased size of the pie chart
          />
        </div>
      </div>

      {/* Bar Chart */}
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Environmental Impact in Bar Graph</h2>
        <div className="mt-6">
          <Bar data={barData} options={options} />
        </div>
      </div>

      {/* Stacked Bar Chart */}
      <div className="mt-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Stacked Bar Graph</h2>
        <div className="mt-6">
          <Bar data={stackedBarData} options={stackedBarOptions} />
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalImpactChart;
