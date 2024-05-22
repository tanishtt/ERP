import { useEffect, useState } from 'react'; // Importing React hooks
import { Line } from 'react-chartjs-2'; // Importing the Line chart component from react-chartjs-2
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js'; // Importing necessary components from chart.js

// Registering the required components for the chart
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
);

function App() {
  // State to manage chart data
  const [data, setData] = useState({
    labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"], // Initial labels for each month
    datasets: [
      {
        label: "First Dataset",
        data: [10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58], // Initial data points
        backgroundColor: 'yellow',
        borderColor: 'red',
        tension: 0.4,
        fill: true,
        pointStyle: 'rect',
        pointBorderColor: 'blue',
        pointBackgroundColor: '#fff',
        showLine: true,
        drawBorder: false
      }
    ],
  });

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
          labels: ["2020", "2021", "2022"], // New labels for the years
          datasets: [
            {
              label: "First Dataset",
              data: arr, // New data points from the API
              backgroundColor: 'yellow',
              borderColor: 'red',
              tension: 0.4,
              fill: true,
              pointStyle: 'rect',
              pointBorderColor: 'blue',
              pointBackgroundColor: '#fff',
              showLine: true,
              drawBorder: false
            }
          ],
        });
      });
    console.log("arr", arr); // Logging the array
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="App" style={{ width: '800px', height: '800px' }}>
      {/* Rendering the Line chart with the data from the state */}
      <Line data={data}>Hello</Line>
    </div>
  );
}

export default App; // Exporting the App component as the default export
