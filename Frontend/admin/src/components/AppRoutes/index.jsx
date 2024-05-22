import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers"; // Importing the Customers component
import Dashboard from "../../Pages/Dashbaord"; // Importing the Dashboard component
import Inventory from "../../Pages/Inventory"; // Importing the Inventory component
import Orders from "../../Pages/Orders"; // Importing the Orders component
import Component from "../Add Product"; // Importing the Component component from Add Product
import Expenditure from "../../Pages/Expenditure"; // Importing the Expenditure component
import Add_emp from "../Add_emp/App"; // Importing the Add_emp component from Add_emp/App
import Attendence from "../Attendence/App"; // Importing the Attendence component from Attendence/App
import Show_Attendance from "../Show_Attendance"; // Importing the Show_Attendance component
import Bill_Entry from "../Bill_Entry"; // Importing the Bill_Entry component

// Defining a functional component AppRoutes
function AppRoutes() {
  return (
    <Routes>
      {/* Setting up routes for different paths */}
      <Route path="/" element={<Dashboard />}></Route> {/* Route for Dashboard component */}
      <Route path="/inventory" element={<Inventory />}></Route> {/* Route for Inventory component */}
      <Route path="/orders" element={<Orders />}></Route> {/* Route for Orders component */}
      <Route path="/customers" element={<Customers />}></Route> {/* Route for Customers component */}
      <Route path="/addproduct" element={<Component />}></Route> {/* Route for Component component */}
      <Route path="/expentiture" element={<Expenditure />}></Route> {/* Route for Expenditure component */}
      <Route path="/add_emp" element={<Add_emp />}></Route> {/* Route for Add_emp component */}
      <Route path="/attendence" element={<Attendence />}></Route> {/* Route for Attendence component */}
      <Route path="/show_attendance" element={<Show_Attendance />}></Route> {/* Route for Show_Attendance component */}
      <Route path="/bill_entry" element={<Bill_Entry />}></Route> {/* Route for Bill_Entry component */}
    </Routes>
  );
}
export default AppRoutes; // Exporting the AppRoutes component
