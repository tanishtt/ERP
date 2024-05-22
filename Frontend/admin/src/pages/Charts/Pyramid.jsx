import React from 'react';
// Importing necessary components and services from Syncfusion for creating the pyramid chart
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationLegend, AccumulationDataLabel, AccumulationTooltip, PyramidSeries, AccumulationSelection } from '@syncfusion/ej2-react-charts';

// Importing data and context
import { PyramidData } from '../../data/dummy'; // Data for the pyramid chart
import { useStateContext } from '../../contexts/ContextProvider'; // Context for managing state
import { ChartsHeader } from '../../components'; // Custom component for displaying chart headers

// Define the Pyramid functional component
const Pyramid = () => {
  const { currentMode } = useStateContext(); // Accessing the current theme mode from the context

  return (
    // Main container with styling for margins, padding, and background color
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      {/* Chart header component with category and title as props */}
      <ChartsHeader category="Pyramid" title="Food Comparison Chart" />
      <div className="w-full">
        {/* AccumulationChartComponent for creating the pyramid chart */}
        <AccumulationChartComponent
          id="pyramid-chart"
          legendSettings={{ background: 'white' }} // Setting the background of the legend
          tooltip={{ enable: true }} // Enabling tooltips
          background={currentMode === 'Dark' ? '#33373E' : '#fff'} // Background color based on theme
        >
          {/* Inject necessary services into the chart */}
          <Inject services={[AccumulationDataLabel, AccumulationTooltip, PyramidSeries, AccumulationLegend, AccumulationSelection]} />
          {/* Series collection directive to define the series of the chart */}
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              name="Food" // Name of the series
              dataSource={PyramidData} // Data source for the series
              xName="x" // X-axis data field
              yName="y" // Y-axis data field
              type="Pyramid" // Type of series
              width="45%" // Width of the pyramid chart
              height="80%" // Height of the pyramid chart
              neckWidth="15%" // Width of the neck of the pyramid
              gapRatio={0.03} // Gap ratio between segments
              explode // Enables the explode feature
              emptyPointSettings={{ mode: 'Drop', fill: 'red' }} // Settings for handling empty points
              dataLabel={{
                visible: true, // Display data labels
                position: 'Inside', // Position of data labels
                name: 'text', // Field for the data label text
              }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    </div>
  );
};

export default Pyramid; // Export the component for use in other parts of the application
