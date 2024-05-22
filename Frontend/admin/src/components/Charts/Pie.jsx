import { Pie } from 'react-chartjs-2'; // Importing the Pie chart component from react-chartjs-2
import { useEffect, useState } from 'react'; // Importing React hooks

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'; // Importing necessary components from chart.js

// Registering the required components for the chart
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function App() {
  // State to manage chart data
  const [data, setData] = useState({
    labels: ['One', 'Two', 'Three'], // Initial labels
    datasets: [
      {
        data: [3, 6, 9], // Initial data points
        backgroundColor: ['aqua', 'bloodorange', 'purple'] // Colors for the chart segments
      }
    ],
  });

  const options = {
    // Options for the Pie chart can be added here
  };

  // Effect hook to fetch data from the API on component mount
  useEffect(() => {
    const arr = [];
    fetch('http://localhost:3031/order_amounts_by_year') // Fetching data from the API
      .then(response => response.json()) // Parsing the JSON response
      .then(json => {
        console.log("json", json); // Logging the JSON response
        json.map((item) => {
          arr.push(item.y); // Extracting the 'y' value from each item and pushing it to the array
          arr.reverse(); // Reversing the array
        });

        // Updating the state with the new data
        setData({
          labels: ['One', 'Two', 'Three'], // Labels remain the same (should be updated based on actual data if needed)
          datasets: [
            {
              data: arr, // New data points from the API
              backgroundColor: ['aqua', 'bloodorange', 'purple'] // Colors for the chart segments
            }
          ],
        });
      });
    console.log("arr", arr); // Logging the array
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="App">
      <h1>How to create pie chart with React Chart JS</h1>

      <div
        style={{
          padding: '20px',
          width: '50%' // Styling for the container holding the Pie chart
        }}
      >
        {/* Rendering the Pie chart with the data from the state */}
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default App; // Exporting the App component as the default export
