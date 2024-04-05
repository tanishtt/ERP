import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue, getSales, getCustomer } from "../../API";


import AreaGraph from "../Graphs/Area";
import PieGraph from "../Graphs/Pie";
import {Chart as ChartJS, ArcElement, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
import BarGraph from "../Graphs/Bar";
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler, ArcElement,
)




// import {
//   Chart as ChartJS,

//   Tooltip,
//   Legend
// } from 'chart.js';


// ChartJS.register(
 
//   Tooltip,
//   Legend
// );

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
//import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

function Dashboard1() {
  const [sales, setSales] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getSales().then((res) => {
      setSales(res.total);
    });

    getCustomer().then((res) => {
      setCustomer(res.total);
    });
    
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
    });
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '20px' , margin: '20px', backgroundColor: '#f0f0f0'}}>
    <div style={{width:"73vw"}}>

    <div>
  <Space size={10} direction="vertical">
    <Typography.Title level={3} style={{ marginLeft: '20px', marginBottom:'10px' }}>
      Sales Dashboard
    </Typography.Title>
    <Space size={[3, 3]} direction="horizontal verticle" horizontalSize={200} verticalSize={200}>
      <DashboardCard
        icon={
          <DollarCircleOutlined
            style={{
              color: "green",
              backgroundColor: "rgba(0,255,0,0.25)",
              borderRadius: 5, // Reduced borderRadius
              fontSize: 30, // Reduced fontSize
              padding: 2, // Reduced padding
            }}
          />
        }
        title={"Daily Sales"}
        value={sales.daily_sales}
      />
      <DashboardCard
        icon={
          <DollarCircleOutlined
            style={{
              color: "blue",
              backgroundColor: "rgba(0,0,255,0.25)",
              borderRadius: 5, // Reduced borderRadius
              fontSize: 30, // Reduced fontSize
              padding: 2, // Reduced padding
            }}
          />
        }
        title={"Weekly Sales"}
        value={sales.weekly_sales}
      />
      <DashboardCard
        icon={
          <DollarCircleOutlined
            style={{
              color: "purple",
              backgroundColor: "rgba(0,255,255,0.25)",
              borderRadius: 5, // Reduced borderRadius
              fontSize: 30, // Reduced fontSize
              padding: 2, // Reduced padding
            }}
          />
        }
        title={"Monthly Sales"}
        value={sales.monthly_sales}
      />
      <DashboardCard
        icon={
          <DollarCircleOutlined
            style={{
              color: "red",
              backgroundColor: "rgba(255,0,0,0.25)",
              borderRadius: 5, // Reduced borderRadius
              fontSize: 30, // Reduced fontSize
              padding: 2, // Reduced padding
            }}
          />
        }
        title={"Annual Sales"}
        value={sales.total_sales}
      />
    </Space>
  </Space>
</div>


<div>
  <Space size={10} direction="vertical">
    <Typography.Title level={3} style={{ marginLeft: '20px', marginBottom:'10px' }}>
      Customer Dashboard
    </Typography.Title>
    <Space size={[3, 3]} direction="horizontal verticle" horizontalSize={200} verticalSize={200}>
      <DashboardCard
        icon={
          <UserOutlined
            style={{
              color: "green",
              backgroundColor: "rgba(0,255,0,0.25)",
              borderRadius: 5, // Reduced borderRadius
              fontSize: 20, // Reduced fontSize
              padding: 0, // Reduced padding
            }}
          />
        }
        title={"Daily Customers"}
        value={customer.daily_customers}
      />
      <DashboardCard
        icon={
          <UserOutlined
            style={{
              color: "blue",
              backgroundColor: "rgba(0,0,255,0.25)",
              borderRadius: 5, // Reduced borderRadius
              fontSize: 20, // Reduced fontSize
              padding: 0, // Reduced padding
            }}
          />
        }
        title={"Weekly Customers"}
        value={customer.weekly_customers}
      />
      <DashboardCard
        icon={
          <UserOutlined
            style={{
              color: "purple",
              backgroundColor: "rgba(0,255,255,0.25)",
              borderRadius: 5, // Reduced borderRadius
              fontSize: 20, // Reduced fontSize
              padding: 0, // Reduced padding
            }}
          />
        }
        title={"Monthly Customers"}
        value={customer.monthly_customers}
      />
      <DashboardCard
        icon={
          <UserOutlined
            style={{
              color: "red",
              backgroundColor: "rgba(255,0,0,0.25)",
              borderRadius: 5, // Reduced borderRadius
              fontSize: 20, // Reduced fontSize
              padding: 0, // Reduced padding
            }}
          />
        }
        title={"Annual Customers"}
        value={customer.total_customers}
      />
    </Space>

      <Space>
       
        {
        <div style={{ display: 'flex', marginBottom:"20px", height:"40vh"}}>
        <div style={{ height:"100px", weidth:"100px" }}>
          <AreaGraph />
        </div>
        <div style={{ height:"100px", weidth:"100px" }}>
          <PieGraph />
          </div>
      <div style={{ height:"150px", weidth:"100px" }}>
          <BarGraph />
          </div>
      </div>
        }
        {/*<DashboardChart /> */}
      </Space>
    </Space>
    </div>
    </div>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space size={[140, 140]} direction="horizontal vertical" horizontalSize={500} verticalSize={1000}>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
// function RecentOrders() {
//   const [dataSource, setDataSource] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     getOrders().then((res) => {
//       setDataSource(res.products.splice(0, 3));
//       setLoading(false);
//     });
//   }, []);
// }







// // Area Graph Start

// function AreaGraph() {
//   const [data, setData] = useState({
//     labels:["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"],
//     datasets:[
//       {
//         label:"First Dataset",
//         data:[10, 20, 30 , 42, 51, 82, 31, 59, 61, 73, 91, 58],
//         backgroundColor:'yellow',
//         borderColor:'red',
//         tension:0.4,
//         fill:true,
//         pointStyle:'rect',
//         pointBorderColor:'blue',
//         pointBackgroundColor:'#fff',
//         showLine:true,
//         drawBorder:false
//       }
//     ],
//   }
//   )

//   useEffect(() => {
//     const arr =[];
//     fetch('http://localhost:3031/order_amounts_by_year')
//       .then(response => response.json())
//       .then(json => {console.log("json", json)
//       json.map((item, index) => {
//           arr.push(item.y)
//           arr.reverse();

//       })

//       setData(  {
//         labels:["2020", "2021", "2022"],
//         datasets:[
//           {
//             label:"First Dataset",
//             data:arr,
//             backgroundColor:'yellow',
//             borderColor:'red',
//             tension:0.4,
//             fill:true,
//             pointStyle:'rect',
//             pointBorderColor:'blue',
//             pointBackgroundColor:'#fff',
//             showLine:true,
//             drawBorder:false
//           }
//         ],
//       }
//       )
  
// }
//   )  
//       console.log("arr", arr)
  
// },[]);
//   return (
//     <div className="App" style={{width:'800px', height:'800px'}}>
//       <Line data={data}>Hello</Line>
//     </div>
//   );

  
// }

// // Area Graph Ends

// // Pie Graph Starts

// function PieGraph() {
//   const [data, setData] = useState({
//       labels: ['One', 'Two', 'Three'],
//       datasets: [
//           {
//               data: [3, 6, 9],
//               backgroundColor: ['aqua', 'bloodorange', 'purple']
//           }
//       ],
//   }
//   )

//   const options = {
      
//   }

//   useEffect(() => {
//     const arr =[];
//     fetch('http://localhost:3031/order_amounts_by_year')
//       .then(response => response.json())
//       .then(json => {console.log("json", json)
//       json.map((item, index) => {
//           arr.push(item.y)
//           arr.reverse();

//       })

//       setData(  {
//         labels: ['One', 'Two', 'Three'],
//       datasets: [
//           {
//               data:arr,
//               backgroundColor: ['aqua', 'bloodorange', 'purple']
//           }
//       ],
//       }
//       )
  
// }
//   )  
//       console.log("arr", arr)
  
// },[])  


//   return (
//       <div className="App">
//           <div
//               style={
//                   {
//                       padding: '20px',
//                       width: '50%'
//                   }
//               }>
//               <Pie
//                   data = {data}
//                   options = {options}
//                   >
//                   </Pie>
//           </div>
//       </div>
//   );
// }


// // Pie Graph Ends








//   return (
//     //<>
//     //   <Typography.Text>Recent Orders</Typography.Text>
//     //   <Table
//     //     columns={[
//     //       {
//     //         title: "Title",
//     //         dataIndex: "title",
//     //       },
//     //       {
//     //         title: "Quantity",
//     //         dataIndex: "quantity",
//     //       },
//     //       {
//     //         title: "Price",
//     //         dataIndex: "discountedPrice",
//     //       },
//     //     ]}
//     //     loading={loading}
//     //     dataSource={dataSource}
//     //     pagination={false}
//     //   ></Table>
//     // </>
//   //);
// }

// function DashboardChart() {
//   const [reveneuData, setReveneuData] = useState({
//     labels: [],
//     datasets: [],
//   });

//   useEffect(() => {
//     getRevenue().then((res) => {
//       const labels = res.carts.map((cart) => {
//         return `User-${cart.userId}`;
//       });
//       const data = res.carts.map((cart) => {
//         return cart.discountedTotal;
//       });

//       const dataSource = {
//         labels,
//         datasets: [
//           {
//             label: "Revenue",
//             data: data,
//             backgroundColor: "rgba(255, 0, 0, 1)",
//           },
//         ],
//       };

//       setReveneuData(dataSource);
//     });
//   }, []);

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//       title: {
//         display: true,
//         text: "Order Revenue",
//       },
//     },
//   };

//   return (
//     <Card style={{ width: 500, height: 250 }}>
//       <Bar options={options} data={reveneuData} />
//     </Card>
//   );
// }
export default Dashboard1;

