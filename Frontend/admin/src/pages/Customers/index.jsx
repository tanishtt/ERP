import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory } from "../../API";

function Customers1() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      console.log(res)
      //setDataSource(res.users);
      setDataSource(res.customers);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '20px' , margin: '20px', backgroundColor: '#f0f0f0'}}>
    <Space size={20} direction="vertical">
      <Typography.Title level={4} style={{ marginLeft: '20px', marginBottom:'10px' , fontSize: '24px'}}>Customers</Typography.Title>
      <Table style={{width:"72vw", height:"70vh", paddingLeft:'2vw', paddingRight:'1vw'}}
        loading={loading}
        columns={[
          // {
          //   title: "Photo",
          //   dataIndex: "image",
          //   render: (link) => {
          //     return <Avatar src={link} />;
          //   },
          // },
          // {
          //   title: "First Name",
          //   dataIndex: "firstName",
          // },
          // {
          //   title: "LastName",
          //   dataIndex: "lastName",
          // },
          // {
          //   title: "Email",
          //   dataIndex: "email",
          // },
          // {
          //   title: "Phone",
          //   dataIndex: "phone",
          // },

          // {
          //   title: "address",
          //   dataIndex: "address",
          //   render: (address) => {
          //     return (
          //       <span>
          //         {address.address}, {address.city}
          //       </span>
          //     );
          //   },
          // },
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
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
    </div>
  );
}
export default Customers1;
