import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";  // Imported icons from Ant Design
import { Card, Space, Statistic, Table, Typography } from "antd"; // Imported components from Ant Design
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue, getSales, getCustomer } from "../../API";  // Imported API functions


import AreaGraph from "../Graphs/Area";  // Imported AreaGraph component
import PieGraph from "../Graphs/Pie";  // Imported PieGraph component
import {Chart as ChartJS, ArcElement, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';  // Imported Chart.js components
import BarGraph from "../Graphs/Bar";  // Imported BarGraph component

// Registering required Chart.js components
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler, ArcElement,
)



/**
 * Dashboard component displaying sales and customer-related statistics.
 */

function Dashboard1() {
  // States to store data fetched from APIs
  const [sales, setSales] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  // Fetching data from APIs on component mount
  useEffect(() => {
    getSales().then((res) => {
      console.log(res); 
      setSales(res);
    });

    getCustomer().then((res) => {
      console.log(res);
      setCustomer(res);
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



  // Rendering JSX
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '20px' , margin: '20px', backgroundColor: '#f0f0f0'}}>
    <div style={{width:"73vw"}}>
    {/* Sales Dashboard */}
    <div>
  <Space size={10} direction="vertical">
    <Typography.Title level={3} style={{ marginLeft: '20px', marginBottom:'10px' }}>
      Sales Dashboard
    </Typography.Title>
    <Space size={[3, 3]} direction="horizontal verticle" horizontalSize={200} verticalSize={200}>
    {/* Cards displaying sales statistics */}
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
        value={sales.dailySales}
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
        value={sales.weeklySales}
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
        value={sales.monthlySales}
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
        value={sales.totalSales}
      />
    </Space>
  </Space>
</div>

{/* Customer Dashboard */}
<div>
  <Space size={10} direction="vertical">
    <Typography.Title level={3} style={{ marginLeft: '20px', marginBottom:'10px' }}>
      Customer Dashboard
    </Typography.Title>
    <Space size={[3, 3]} direction="horizontal verticle" horizontalSize={200} verticalSize={200}>
    {/* Cards displaying customer statistics */}
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
        value={customer.dailyCustomers}
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
        value={customer.weeklyCustomers}
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
        value={customer.monthlyCustomers}
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
        value={customer.totalCustomers}
      />
    </Space>

    {/* Graphs */}
      <Space>
       {/* Area graph, Pie graph, Bar graph */}
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

/**
 * Functional component to render a dashboard card.
 * @param {Object} param0 - Props containing card title, value, and icon.
 */

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

export default Dashboard1;

