import React from 'react';

// Importing required data and components
import { pieChartData } from '../../data/dummy'; // Importing pie chart data from dummy data file
import { ChartsHeader, Pie as PieChart } from '../../components'; // Importing custom components

// Define the Pie functional component
const Pie = () => (
  // Main container with margin, padding, and dynamic background based on theme mode
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    {/* Chart header component with category and title as props */}
    <ChartsHeader category="Pie" title="Project Cost Breakdown" />
    <div className="w-full">
      {/* PieChart component to render the pie chart */}
      <PieChart id="chart-pie" data={pieChartData} legendVisiblity height="full" />
    </div>
  </div>
);

export default Pie; // Export the component for use in other parts of the application
