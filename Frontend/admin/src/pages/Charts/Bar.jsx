import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';

// Import custom data and components
import { barCustomSeries, barPrimaryXAxis, barPrimaryYAxis } from '../../data/dummy';  // Data for the bar chart
import { ChartsHeader } from '../../components';  // Custom component for chart headers
import { useStateContext } from '../../contexts/ContextProvider';  // Context to access global state

const Bar = () => {
  // Use global state to get the current theme mode
  const { currentMode } = useStateContext();

  return (
    // Main container with padding and dynamic background based on theme mode
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      {/* Chart header component with props */}
      <ChartsHeader category="Bar" title="Olympic Medal Counts - RIO" />
      <div className="w-full">
        {/* ChartComponent from Syncfusion for rendering bar charts */}
        <ChartComponent
          id="charts"
          primaryXAxis={barPrimaryXAxis}  // Configure x-axis with predefined settings
          primaryYAxis={barPrimaryYAxis}  // Configure y-axis with predefined settings
          chartArea={{ border: { width: 0 } }}  // Styling for the chart area border
          tooltip={{ enable: true }}  // Enable tooltips
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}  // Background color based on theme mode
          legendSettings={{ background: 'white' }}  // Legend configuration
        >
          {/* Inject required services into the ChartComponent */}
          <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
          <SeriesCollectionDirective>
            {/* Map over barCustomSeries data to create series directives */}
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {barCustomSeries.map((item, index) => (
              <SeriesDirective key={index} {...item} />  // Spread properties into SeriesDirective for each series
            ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Bar;  // Export the component for use in other parts of the application
