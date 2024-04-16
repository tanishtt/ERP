import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import Dashboard from "../../Pages/Dashbaord";
import Inventory from "../../Pages/Inventory";
import Orders from "../../Pages/Orders";
import Component from "../Add Product";
import Expenditure from "../../Pages/Expenditure";    
import Add_emp from "../Add_emp/App";
import Attendence from "../Attendence/App";
import Show_Attendance from "../Show_Attendance";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/addproduct" element={<Component />}></Route>
      <Route path="/expentiture" element={<Expenditure />}></Route>
      <Route path="/add_emp" element={<Add_emp />}></Route>
      <Route path="/attendence" element={<Attendence />}></Route>
      <Route path="/show_attendance" element={<Show_Attendance />}></Route>
    </Routes>
  );
}
export default AppRoutes;
