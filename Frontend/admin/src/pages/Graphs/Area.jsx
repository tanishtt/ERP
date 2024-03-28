import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler, ArcElement,
)



// Area Graph Start

function AreaGraph() {
    const [data, setData] = useState({
      labels:["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"],
      datasets:[
        {
          label:"First Dataset",
          data:[10, 20, 30 , 42, 51, 82, 31, 59, 61, 73, 91, 58],
          backgroundColor:'yellow',
          borderColor:'red',
          tension:0.4,
          fill:true,
          pointStyle:'rect',
          pointBorderColor:'blue',
          pointBackgroundColor:'#fff',
          showLine:true,
          drawBorder:false
        }
      ],
    }
    )
  
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
          labels:["2020", "2021", "2022"],
          datasets:[
            {
              label:"First Dataset",
              data:arr,
              backgroundColor:'yellow',
              borderColor:'red',
              tension:0.4,
              fill:true,
              pointStyle:'rect',
              pointBorderColor:'blue',
              pointBackgroundColor:'#fff',
              showLine:true,
              drawBorder:false
            }
          ],
        }
        )
    
  }
    )  
        console.log("arr", arr)
    
  },[]);
    return (
      <div style={{width:'30vw', height:'60vh'}}>
        <Line style={{width:'30vw', height:'60vh'}} data={data}>Hello</Line>
      </div>
    );
  
    
  }
  
  // Area Graph Ends

  export default AreaGraph;