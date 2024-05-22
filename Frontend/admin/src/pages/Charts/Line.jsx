import React from 'react';

// Import custom components for charts
import { ChartsHeader, LineChart } from '../../components';

// Define the Line functional component
const Line = () => (
  // Main container with margin, padding, and dynamic background based on theme mode
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    {/* Chart header component with category and title as props */}
    <ChartsHeader category="Line" title="Inflation Rate" />
    <div className="w-full">
      {/* LineChart component to render the line chart */}
      <LineChart />
    </div>
  </div>
);

export default Line; // Export the component for use in other parts of the application
