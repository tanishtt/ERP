import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory, getOrders } from "../../API";

function Orders1() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '20px' , margin: '20px', backgroundColor: '#f0f0f0'}}>
    <Space size={20} direction="vertical">
      <Typography.Title level={4} style={{ marginLeft: '20px', marginBottom: '10px', fontSize: '24px' }}>
  Orders
</Typography.Title>
      <Table style={{width:"72vw", height:"70vh", paddingLeft:'2vw', paddingRight:'1vw'}}
        loading={loading}
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "DiscountedPrice",
            dataIndex: "discountedPrice",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Total",
            dataIndex: "total",
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
