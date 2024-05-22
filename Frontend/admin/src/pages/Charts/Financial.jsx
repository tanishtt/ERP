import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, HiloSeries, Tooltip, DateTime, Zoom, Logarithmic, Crosshair } from '@syncfusion/ej2-react-charts';

// Import custom data and components
import { financialChartData, FinancialPrimaryXAxis, FinancialPrimaryYAxis } from '../../data/dummy'; // Data and configurations for the financial chart
import { useStateContext } from '../../contexts/ContextProvider'; // Context to access global state
import { ChartsHeader } from '../../components'; // Custom component for chart headers

const date1 = new Date('2017, 1, 1'); // Starting date for filtering data

// Filter function to return only the data points that are after the specified date
// eslint-disable-next-line consistent-return
function filterValue(value) {
  if (value.x >= date1) {
    // eslint-disable-next-line no-sequences
    return value.x, value.high, value.low; // Return the date, high, and low values
  }
}
const returnValue = financialChartData.filter(filterValue); // Filter the data using the filterValue function

const Financial = () => {
  // Use global state to get the current theme mode
  const { currentMode } = useStateContext();

  return (
    // Main container with padding and dynamic background based on theme mode
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      {/* Chart header component with props */}
      <ChartsHeader category="Financial" title="AAPLE Historical" />
      <div className="w-full">
        {/* ChartComponent from Syncfusion for rendering financial charts */}
        <ChartComponent
          id="charts"
          primaryXAxis={FinancialPrimaryXAxis} // Configure x-axis with predefined settings
          primaryYAxis={FinancialPrimaryYAxis} // Configure y-axis with predefined settings
          chartArea={{ border: { width: 0 } }} // Styling for the chart area border
          tooltip={{ enable: true, shared: true }} // Enable tooltips and set them to be shared
          crosshair={{ enable: true, lineType: 'Vertical', line: { width: 0 } }} // Enable crosshair with vertical lines
          background={currentMode === 'Dark' ? '#33373E' : '#fff'} // Background color based on theme mode
        >
          {/* Inject required services into the ChartComponent */}
          <Inject services={[HiloSeries, Tooltip, DateTime, Logarithmic, Crosshair, Zoom]} />
          <SeriesCollectionDirective>
            {/* Define the series for the chart using SeriesDirective */}
            <SeriesDirective
              dataSource={returnValue} // Filtered data source for the series
              xName="x" // Data field for x-axis
              yName="low" // Data field for y-axis (used to determine low values in HiLo series)
              name="Apple Inc" // Series name
              type="Hilo" // Type of chart (HiLo)
              low="low" // Data field for low values
              high="high" // Data field for high values
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Financial; // Export the component for use in other parts of the application
