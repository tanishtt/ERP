import { BellFilled, MailOutlined } from "@ant-design/icons"; // Importing icons from antd
import { Badge, Drawer, Image, List, Space, Typography } from "antd"; // Importing components from antd
import { useEffect, useState } from "react"; // Importing hooks from React
import { getComments, getOrders } from "../../API"; // Importing API functions

function AppHeader() {
  // State to manage comments, orders, and the visibility of drawers
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Fetch comments and orders when the component mounts
  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  return (
    <div className="AppHeader">
      {/* Logo Image */}
      <Image
        width={40}
        src="https://yt3.ggpht.com/ytc/AMLnZu83ghQ28n1SqADR-RbI2BGYTrqqThAtJbfv9jcq=s176-c-k-c0x00ffffff-no-rj"
      />
      {/* Dashboard Title */}
      <Typography.Title>Doorly Dashboard</Typography.Title>
      <Space>
        {/* Badge for comments count with Mail icon */}
        <Badge count={comments.length} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true); // Open comments drawer
            }}
          />
        </Badge>
        {/* Badge for orders count with Bell icon */}
        <Badge count={orders.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true); // Open notifications drawer
            }}
          />
        </Badge>
      </Space>
      {/* Drawer for displaying comments */}
      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false); // Close comments drawer
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>; // Display each comment
          }}
        />
      </Drawer>
      {/* Drawer for displaying notifications */}
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false); // Close notifications drawer
        }}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> has been ordered!
              </List.Item>
            );
          }}
        />
      </Drawer>
    </div>
  );
}

export default AppHeader; // Exporting AppHeader component as default export
