import React from 'react'; // Importing React library
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip } from '@syncfusion/ej2-react-charts'; // Importing components from Syncfusion's React charts library

import { stackedCustomSeries, stackedPrimaryXAxis, stackedPrimaryYAxis } from '../../data/dummy'; // Importing chart configuration and data
import { useStateContext } from '../../contexts/ContextProvider'; // Importing custom context for state management

// Stacked component to render a stacked column chart
const Stacked = ({ width, height }) => {
  // Using context to get the current mode (e.g., 'Dark' or 'Light')
  const { currentMode } = useStateContext();

  return (
    // ChartComponent is the main container for the chart
    <ChartComponent
      id="charts" // Unique identifier for the chart
      primaryXAxis={stackedPrimaryXAxis} // Configuration for the primary X axis
      primaryYAxis={stackedPrimaryYAxis} // Configuration for the primary Y axis
      width={width} // Width of the chart
      height={height} // Height of the chart
      chartArea={{ border: { width: 0 } }} // Chart area settings with no border
      tooltip={{ enable: true }} // Enabling tooltip
      background={currentMode === 'Dark' ? '#33373E' : '#fff'} // Background color based on current mode
      legendSettings={{ background: 'white' }} // Legend settings with white background
    >
      {/* Injecting the required chart services */}
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      {/* SeriesCollectionDirective contains multiple SeriesDirective components */}
      <SeriesCollectionDirective>
        {/* Iterating over stackedCustomSeries to create SeriesDirective components */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {stackedCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Stacked; // Exporting the Stacked component as the default export
