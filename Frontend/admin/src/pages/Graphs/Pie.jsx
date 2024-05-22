import { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
} from 'chart.js';

// Registering chart elements and plugins
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler, ArcElement,
);

// Pie Graph Component
function PieGraph() {
  // State to store chart data
  const [data, setData] = useState({
    labels: ['One', 'Two', 'Three', 'Four'],
    datasets: [
      {
        backgroundColor: ['aqua', 'bloodorange', 'purple', 'bloodorange']
      }
    ],
  });

  // Options for the pie chart
  const options = {
    // Customize chart options if needed
  };

  // Fetching data from API and updating state
  useEffect(() => {
    const arr = [];
    fetch('http://localhost:3000/admin/dashboard/api/graph/sales')
      .then(response => response.json())
      .then(json => {
        console.log("json", json);
        const piedata = json.order_amounts_by_year;
        console.log("piedata", piedata);
        piedata.map((item, index) => {
          arr.push(item.y);
          arr.reverse();
        });

        setData({
          labels: ['One', 'Two', 'Three', 'Four'],
          datasets: [
            {
              data: arr,
              backgroundColor: ['aqua', 'bloodorange', 'purple', 'pink']
            }
          ],
        });
      });
  }, []);

  // Rendering the Pie chart component
  return (
    <div>
      <div
        style={{ height: '40vh' }}
      >
        <Pie
          style={{ height: '40vh' }}
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}

export default PieGraph;
