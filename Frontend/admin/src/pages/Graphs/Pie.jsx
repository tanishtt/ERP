import { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler, ArcElement,
)




// Pie Graph Starts

function PieGraph() {
    const [data, setData] = useState({
        labels: ['One', 'Two', 'Three','Four'],//,'Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve'],
        datasets: [
            {
                backgroundColor: ['aqua', 'bloodorange', 'purple','bloodorange']
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
        labels: ['One', 'Two', 'Three','Four'],//,'Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve'],
        datasets: [
            {
                data:arr,
                backgroundColor: ['aqua', 'bloodorange', 'purple','pink']
            }
        ],
        }
        )
    
  }
    )  
        console.log("arr", arr)
    
  },[])  
  
  
    return (
        <div >
            <div
                style={{height:'40vh'}
                }>
                <Pie style={{ height:'40vh'}}
                    data = {data}
                    options = {options}
                    >
                    </Pie>
            </div>
        </div>
    );
  }
  
  
  // Pie Graph Ends

  export default PieGraph;