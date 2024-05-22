import React from 'react'; // Importing React library
import { SparklineComponent, Inject, SparklineTooltip } from '@syncfusion/ej2-react-charts'; // Importing components from Syncfusion's React charts library

// Defining the SparkLine class component, extending React.PureComponent for performance optimization
class SparkLine extends React.PureComponent {
  render() {
    // Destructuring props to extract relevant values
    const { id, height, width, color, data, type, currentColor } = this.props;

    return (
      // Rendering the SparklineComponent with provided props
      <SparklineComponent
        id={id} // Unique identifier for the sparkline
        height={height} // Height of the sparkline
        width={width} // Width of the sparkline
        lineWidth={1} // Line width of the sparkline
        valueType="Numeric" // Value type for the sparkline data
        fill={color} // Color for the sparkline
        border={{ color: currentColor, width: 2 }} // Border settings for the sparkline
        tooltipSettings={{
          visible: true, // Enable tooltip
          // Template for the tooltip content
          // eslint-disable-next-line no-template-curly-in-string
          format: '${x} : data ${yval}',
          trackLineSettings: {
            visible: true, // Enable track line
          },
        }}
        markerSettings={{ visible: ['All'], size: 2.5, fill: currentColor }} // Marker settings
        dataSource={data} // Data source for the sparkline
        xName="x" // X-axis data field name
        yName="yval" // Y-axis data field name
        type={type} // Type of sparkline (e.g., 'Line', 'Column')
      >
        {/* Injecting the SparklineTooltip service */}
        <Inject services={[SparklineTooltip]} />
      </SparklineComponent>
    );
  }
}

export default SparkLine; // Exporting the SparkLine component as the default export
