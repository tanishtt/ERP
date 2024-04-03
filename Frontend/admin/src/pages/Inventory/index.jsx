import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../../API";

function Inventory1() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '20px' , margin: '20px', backgroundColor: '#f0f0f0'}}>
    <Space size={20} direction="vertical">
      <Typography.Title level={4} style={{ marginLeft: '20px', marginBottom:'10px', fontSize: '24px' }}>Inventory</Typography.Title>
      <Table style={{width:"72vw", height:"70vh", paddingLeft:'2vw', paddingRight:'1vw'}}
        loading={loading}
        columns={[
          {
            title: "Product Image",
            dataIndex: "photos",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "Product Name",
            dataIndex: "product_name",
          },
          {
            title: "Description",
            dataIndex: "description",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>₹{value}</span>,
          },
          // {
          //   title: "Rating",
          //   dataIndex: "rating",
          //   render: (rating) => {
          //     return <Rate value={rating} allowHalf disabled />;
          //   },
          // },
          {
            title: "Category",
            dataIndex: "category_id",
          },
          {
            title: "Stock",
            dataIndex: "stock_quantity",
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
export default Inventory1;
