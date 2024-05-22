import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DateTime, SplineAreaSeries, Legend } from '@syncfusion/ej2-react-charts';

// Import custom components and data
import { ChartsHeader } from '../../components';  // Custom component for displaying chart headers
import { areaCustomSeries, areaPrimaryXAxis, areaPrimaryYAxis } from '../../data/dummy';  // Dummy data for the chart
import { useStateContext } from '../../contexts/ContextProvider';  // Context to access global state

const Area = () => {
  // Use global state to get the current theme mode
  const { currentMode } = useStateContext();

  return (
    // Main container with padding and dynamic background based on theme mode
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      {/* Chart header component with props */}
      <ChartsHeader category="Area" title="Inflation Rate in percentage" />
      <div className="w-full">
        {/* ChartComponent from Syncfusion for rendering area charts */}
        <ChartComponent
          id="charts"
          primaryXAxis={areaPrimaryXAxis}  // Configure x-axis with predefined settings
          primaryYAxis={areaPrimaryYAxis}  // Configure y-axis with predefined settings
          chartArea={{ border: { width: 0 } }}  // Styling for the chart area border
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}  // Background color based on theme mode
          legendSettings={{ background: 'white' }}  // Legend configuration
        >
          {/* Inject required services into the ChartComponent */}
          <Inject services={[SplineAreaSeries, DateTime, Legend]} />
          <SeriesCollectionDirective>
            {/* Map over areaCustomSeries data to create series directives */}
            {areaCustomSeries.map((item, index) => (
              <SeriesDirective key={index} {...item} />  // Spread properties into SeriesDirective for each series
            ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Area;  // Export the component for use in other parts of the application
