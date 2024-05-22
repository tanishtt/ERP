import React from 'react';

// Importing necessary components
import { ChartsHeader, Stacked as StackedChart } from '../../components';

// Define the Stacked functional component
const Stacked = () => (
  // Main container with styling for margins, padding, and background color
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    {/* Chart header component with category and title as props */}
    <ChartsHeader category="Stacked" title="Revenue Breakdown" />
    <div className="w-full">
      {/* StackedChart component to render the stacked chart */}
      <StackedChart />
    </div>
  </div>
);

// Export the component for use in other parts of the application
export default Stacked;
