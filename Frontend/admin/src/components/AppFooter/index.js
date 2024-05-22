import { Typography } from "antd"; // Importing Typography component from antd library

function AppFooter() {
  return (
    <div className="AppFooter">
      {/* Link for a telephone number */}
      <Typography.Link href="tel:+123456789">+123456789</Typography.Link>
      
      {/* Link to the Privacy Policy, opens in a new tab */}
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      
      {/* Link to the Terms of Use, opens in a new tab */}
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Terms of Use
      </Typography.Link>
    </div>
  );
}

export default AppFooter; // Exporting AppFooter component as default export
