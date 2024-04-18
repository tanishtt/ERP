import { Button, Space, Table, Typography, Select } from "antd";
import { useEffect, useState } from "react";
import { getOrders } from "../../API";

const { Option } = Select;

function Orders1() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    setLoading(true);
    getOrders()
      .then((res) => {
        setDataSource(res);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDownloadCSV = () => {
    // Sort the data based on the selected month
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

    // Add data rows if dataSource is not empty
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

  const handleChangeMonth = (value) => {
    setSelectedMonth(value);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "20px", margin: "20px", backgroundColor: "#f0f0f0" }}>
      <Space size={20} direction="vertical">
        <Typography.Title level={4} style={{ marginLeft: "20px", marginBottom: "10px", fontSize: "24px" }}>
          Orders
        </Typography.Title>
        <Space>
          <Select
            defaultValue="Select Month"
            style={{ width: 120 }}
            onChange={handleChangeMonth}
          >
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
          <Button onClick={handleDownloadCSV} type="primary" style={{backgroundColor:'pink'}}>
            Download CSV
          </Button>
        </Space>
        <Table
          style={{ width: "72vw", height: "70vh", paddingLeft: "2vw", paddingRight: "1vw" }}
          loading={loading}
          columns={[
            {
              title: "Order Id",
              dataIndex: "order_id",
            },
            {
              title: "Customer Id",
              dataIndex: "customer_name",
            },
            {
              title: "Products Ordered",
              dataIndex: "product_details",
            },
            {
              title: "Total Items",
              dataIndex: "product_details",
              render: (productDetails) => {
                const products = JSON.parse(productDetails);
                const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
                return totalQuantity;
              },
            },
            {
              title: "Total Bill Amount",
              dataIndex: "price",
              render: (value) => <span>₹{value}</span>,
            },
            {
              title: "Discounted Amount",
              dataIndex: "discount_price",
              render: (value) => <span>₹{value}</span>,
            },
            {
              title: "Order Date",
              dataIndex: "date",
              sorter: (a, b) => new Date(a.date) - new Date(b.date),
              sortDirections: ["descend", "ascend"],
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
          }}
        ></Table>
      </Space>
    </div>
  );
}

export default Orders1;