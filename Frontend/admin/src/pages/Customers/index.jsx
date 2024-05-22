import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory } from "../../API";

function Customers1() {
  // State to manage loading status
  const [loading, setLoading] = useState(false);
  // State to manage data source for the table
  const [dataSource, setDataSource] = useState([]);

  // useEffect hook to fetch customer data when the component mounts
  useEffect(() => {
    setLoading(true); // Set loading to true while fetching data
    getCustomers().then((res) => {
      console.log(res); // Log the response for debugging
      setDataSource(res.customers); // Update the data source with the fetched customer data
      setLoading(false); // Set loading to false after data is fetched
    });
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '20px', margin: '20px', backgroundColor: '#f0f0f0' }}>
      {/* Space component to create vertical spacing between elements */}
      <Space size={20} direction="vertical">
        {/* Typography component for the title */}
        <Typography.Title level={4} style={{ marginLeft: '20px', marginBottom: '10px', fontSize: '24px' }}>Customers</Typography.Title>
        {/* Table component to display customer data */}
        <Table 
          style={{ width: "72vw", height: "70vh", paddingLeft: '2vw', paddingRight: '1vw' }}
          loading={loading} // Show loading spinner while fetching data
          columns={[
            // Column definitions for the table
            {
              title: "CustomerId",
              dataIndex: "customer_id",
            },
            {
              title: "CustomerName",
              dataIndex: "customer_name",
            },
            {
              title: "EmailId",
              dataIndex: "email",
            },
            {
              title: "ContactNumber",
              dataIndex: "phone",
            },
          ]}
          dataSource={dataSource} // Data source for the table
          pagination={{
            pageSize: 5, // Set pagination size to 5
          }}
        />
      </Space>
    </div>
  );
}

// Export the component for use in other parts of the application
export default Customers1;
