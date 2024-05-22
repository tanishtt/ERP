import { Button, Space, Table, Typography, Select } from "antd"; // Import necessary components from antd
import { useEffect, useState } from "react"; // Import hooks from React
import { getOrders } from "../../API"; // Import the getOrders API function

const { Option } = Select; // Destructure Option from Select

// Orders1 component definition
function Orders1() {
  // State to manage loading status, data source, and selected month
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  // useEffect to fetch orders data when the component mounts
  useEffect(() => {
    setLoading(true); // Set loading to true while fetching data
    getOrders()
      .then((res) => {
        setDataSource(res); // Set the fetched data as dataSource
      })
      .catch((error) => {
        console.error("Error fetching orders:", error); // Handle errors
      })
      .finally(() => {
        setLoading(false); // Set loading to false after data is fetched or an error occurs
      });
  }, []); // Empty dependency array to run the effect only once on mount

  // Function to handle CSV download
  const handleDownloadCSV = () => {
    // Filter data based on the selected month
    const sortedData = dataSource.filter(
      (order) =>
        new Date(order.date).getMonth() === parseInt(selectedMonth)
    );

    // Extract column names
    const columns = Object.keys(
      sortedData.length > 0 ? sortedData[0] : {}
    );

    // Create CSV content with column names as the first row
    let csvContent = "data:text/csv;charset=utf-8," + columns.join(",") + "\n";

    // Add data rows if sortedData is not empty
    if (sortedData.length > 0) {
      csvContent += sortedData
        .map((row) => columns.map((col) => row[col]).join(","))
        .join("\n");
    }

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Function to handle month selection change
  const handleChangeMonth = (value) => {
    setSelectedMonth(value); // Update selected month
  };

  // Render the Orders table
  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "20px", margin: "20px", backgroundColor: "#f0f0f0" }}>
      <Space size={20} direction="vertical">
        {/* Orders title */}
        <Typography.Title level={4} style={{ marginLeft: "20px", marginBottom: "10px", fontSize: "24px" }}>
          Orders
        </Typography.Title>
        {/* Select and Button for month selection and CSV download */}
        <Space>
          <Select
            defaultValue="Select Month"
            style={{ width: 120 }}
            onChange={handleChangeMonth}
          >
            {/* Options for each month */}
            <Option value="0">January</Option>
            <Option value="1">February</Option>
            <Option value="2">March</Option>
            <Option value="3">April</Option>
            <Option value="4">May</Option>
            <Option value="5">June</Option>
            <Option value="6">July</Option>
            <Option value="7">August</Option>
            <Option value="8">September</Option>
            <Option value="9">October</Option>
            <Option value="10">November</Option>
            <Option value="11">December</Option>
          </Select>
          <Button onClick={handleDownloadCSV} type="primary" style={{ backgroundColor: 'pink' }}>
            Download CSV
          </Button>
        </Space>
        {/* Table to display orders data */}
        <Table
          style={{ width: "72vw", height: "70vh", paddingLeft: "2vw", paddingRight: "1vw" }}
          loading={loading} // Show loading indicator when data is being fetched
          columns={[
            {
              title: "Order Id",
              dataIndex: "order_id", // Display order ID
            },
            {
              title: "Customer Id",
              dataIndex: "customer_name", // Display customer name
            },
            {
              title: "Products Ordered",
              dataIndex: "product_details", // Display product details
            },
            {
              title: "Total Items",
              dataIndex: "product_details",
              render: (productDetails) => {
                const products = JSON.parse(productDetails);
                const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
                return totalQuantity; // Display total quantity of products ordered
              },
            },
            {
              title: "Total Bill Amount",
              dataIndex: "price",
              render: (value) => <span>₹{value}</span>, // Display total bill amount with currency symbol
            },
            {
              title: "Discounted Amount",
              dataIndex: "discount_price",
              render: (value) => <span>₹{value}</span>, // Display discounted amount with currency symbol
            },
            {
              title: "Order Date",
              dataIndex: "date",
              sorter: (a, b) => new Date(a.date) - new Date(b.date), // Enable sorting by order date
              sortDirections: ["descend", "ascend"],
            },
          ]}
          dataSource={dataSource} // Set the data source for the table
          pagination={{
            pageSize: 5, // Set the number of rows per page
          }}
        />
      </Space>
    </div>
  );
}

export default Orders1;
