import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../../API"; // Import the getInventory API function

// Inventory1 component definition
function Inventory1() {
  // State to manage loading status and data source for the table
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  // useEffect to fetch inventory data when the component mounts
  useEffect(() => {
    setLoading(true); // Set loading to true while fetching data
    getInventory().then((res) => {
      setDataSource(res.allProducts); // Set the fetched data as dataSource
      setLoading(false); // Set loading to false after data is fetched
    });
  }, []); // Empty dependency array to run the effect only once on mount

  // Render the Inventory table
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '20px', margin: '20px', backgroundColor: '#f0f0f0' }}>
      <Space size={20} direction="vertical">
        {/* Inventory title */}
        <Typography.Title level={4} style={{ marginLeft: '20px', marginBottom:'10px', fontSize: '24px' }}>Inventory</Typography.Title>
        {/* Table to display inventory data */}
        <Table
          style={{ width: "72vw", height: "70vh", paddingLeft: '2vw', paddingRight: '1vw' }}
          loading={loading} // Show loading indicator when data is being fetched
          columns={[
            {
              title: "Product Image",
              dataIndex: "photos",
              render: (link) => {
                return <Avatar src={link} />; // Render product image using Avatar component
              },
            },
            {
              title: "Product Name",
              dataIndex: "product_name", // Display product name
            },
            {
              title: "Description",
              dataIndex: "description", // Display product description
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => <span>₹{value}</span>, // Display price with currency symbol
            },
            // Uncomment the following lines to include the rating column
            // {
            //   title: "Rating",
            //   dataIndex: "rating",
            //   render: (rating) => {
            //     return <Rate value={rating} allowHalf disabled />; // Display rating using Rate component
            //   },
            // },
            {
              title: "Category",
              dataIndex: "category_id", // Display product category ID
            },
            {
              title: "Stock",
              dataIndex: "stock_quantity", // Display stock quantity
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

export default Inventory1;
