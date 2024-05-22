import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, Category, Tooltip, Legend, RangeColorSettingsDirective, RangeColorSettingDirective } from '@syncfusion/ej2-react-charts';

// Import custom data and components
import { colorMappingData, ColorMappingPrimaryXAxis, ColorMappingPrimaryYAxis, rangeColorMapping } from '../../data/dummy'; // Data and configurations for the color mapping chart
import { ChartsHeader } from '../../components'; // Custom component for chart headers
import { useStateContext } from '../../contexts/ContextProvider'; // Context to access global state

const ColorMapping = () => {
  // Use global state to get the current theme mode
  const { currentMode } = useStateContext();

  return (
    // Main container with padding and dynamic background based on theme mode
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      {/* Chart header component with props */}
      <ChartsHeader category="Color Mapping" title="USA CLIMATE - WEATHER BY MONTH" />
      <div className="w-full">
        {/* ChartComponent from Syncfusion for rendering color mapping charts */}
        <ChartComponent
          id="charts"
          primaryXAxis={ColorMappingPrimaryXAxis} // Configure x-axis with predefined settings
          primaryYAxis={ColorMappingPrimaryYAxis} // Configure y-axis with predefined settings
          chartArea={{ border: { width: 0 } }} // Styling for the chart area border
          legendSettings={{ mode: 'Range', background: 'white' }} // Legend configuration
          tooltip={{ enable: true }} // Enable tooltips
          background={currentMode === 'Dark' ? '#33373E' : '#fff'} // Background color based on theme mode
        >
          {/* Inject required services into the ChartComponent */}
          <Inject services={[ColumnSeries, Tooltip, Category, Legend]} />
          <SeriesCollectionDirective>
            {/* Define the series for the chart using SeriesDirective */}
            <SeriesDirective
              dataSource={colorMappingData[0]} // Data source for the series
              name="USA" // Series name
              xName="x" // Data field for x-axis
              yName="y" // Data field for y-axis
              type="Column" // Type of chart (Column)
              cornerRadius={{
                topLeft: 10,
                topRight: 10,
              }} // Styling for column corners
            />
          </SeriesCollectionDirective>
          <RangeColorSettingsDirective>
            {/* Map over rangeColorMapping data to create range color settings */}
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {rangeColorMapping.map((item, index) => (
              <RangeColorSettingDirective key={index} {...item} /> // Spread properties into RangeColorSettingDirective for each setting
            ))}
          </RangeColorSettingsDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default ColorMapping; // Export the component for use in other parts of the application
