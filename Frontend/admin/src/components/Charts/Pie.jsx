import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);



function App() {
  const [data, setData] = useState({
      labels: ['One', 'Two', 'Three'],
      datasets: [
          {
              data: [3, 6, 9],
              backgroundColor: ['aqua', 'bloodorange', 'purple']
          }
      ],
  }
  )

  const options = {
      
  }

  useEffect(() => {
    const arr =[];
    fetch('http://localhost:3031/order_amounts_by_year')
      .then(response => response.json())
      .then(json => {console.log("json", json)
      json.map((item, index) => {
          arr.push(item.y)
          arr.reverse();

      })

      setData(  {
        labels: ['One', 'Two', 'Three'],
      datasets: [
          {
              data:arr,
              backgroundColor: ['aqua', 'bloodorange', 'purple']
          }
      ],
      }
      )
  
}
  )  
      console.log("arr", arr)
  
},[])  


  return (
      <div className="App">
          <h1>How to create pie chart with React Chart JS</h1>

          <div
              style={
                  {
                      padding: '20px',
                      width: '50%'
                  }
              }>
              <Pie
                  data = {data}
                  options = {options}
                  >
                  </Pie>
          </div>
      </div>
  );
}

export default App;
