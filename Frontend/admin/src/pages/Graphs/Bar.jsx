import React from 'react'
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2';



ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,

)
function BarGraph() {
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
    fetch('http://localhost:3000/admin/dashboard/api/graph/sales')
      .then(response => response.json())
      .then(json => {console.log("json", json)
      const piedata=json.order_amounts_by_year;
        console.log("piedata", piedata)
      piedata.map((item, index) => {
          arr.push(item.y)
          arr.reverse();

      })

      setData(  {
        labels:["2020", "2021", "2022","2023"],
        datasets:[
          {
            label:"First Dataset",
            data:arr,
            backgroundColor:'blue',
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
  
},[])  

  return (
    <div>
        <div
        style={{height:'150px', width:'300px'}
                }>
          <Bar
          style={{ height:'150px'}}
             data = {data}
             options = {options} 
          >
          </Bar>
        </div>
    </div>
  )
}

export default BarGraph;