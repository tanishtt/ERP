import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';

// Registering chart elements and plugins
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler, ArcElement,
)

// Area Graph Component
function AreaGraph() {
  // State to store chart data
  const [data, setData] = useState({
    labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "First Dataset",
        data: [10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58],
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
  })

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
          labels: ["2020", "2021", "2022", "2023"],
          datasets: [
            {
              label: "First Dataset",
              data: arr,
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
  }, []);

  // Rendering Line chart component with data
  return (
    <div style={{ width: '30vw', height: '60vh' }}>
      <Line style={{ width: '30vw', height: '60vh' }} data={data}>Hello</Line>
    </div>
  );
}

export default AreaGraph;
