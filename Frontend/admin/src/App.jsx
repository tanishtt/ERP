import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components'; // Importing necessary components
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './pages'; // Importing pages
import './App.css'; // Importing CSS

import { useStateContext } from './contexts/ContextProvider'; // Importing context hook
import Inventory1 from './pages/Inventory/index'; // Importing Inventory page
import Dashboard1 from './pages/Dashbaord/index'; // Importing Dashboard page
import Orders1 from './pages/Orders/index'; // Importing Orders page
import Customers1 from './pages/Customers/index'; // Importing Customers page
import App1 from './components/Add Product/index'; // Importing Add Product component
import App2 from './pages/Expenditure/App'; // Importing Expenditure page
import App3 from './pages/Add_emp/App'; // Importing Add Employee page
import App4 from './pages/Attendence/App'; // Importing Attendance page
import App5 from './pages/Show_Attendance/App'; // Importing Show Attendance page
import App6 from './pages/Bill_Entry/App'; // Importing Bill Entry page

// Main App component
const App = () => {
  // Destructuring necessary values from context
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  // Effect hook to set color and mode from local storage
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            {/* Tooltip for settings button */}
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              {/* Settings button */}
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {/* Sidebar */}
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}

          {/* Main content */}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            {/* Navbar */}
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>

            {/* Theme settings */}
            <div>
              {themeSettings && (<ThemeSettings />)}

              {/* Routes for different pages */}
              <Routes>
                <Route path="/" element={(<Dashboard1 />)} /> {/* Dashboard */}
                <Route path="/ecommerce" element={(<Ecommerce />)} /> {/* E-commerce */}
                <Route path="/orders" element={<Orders />} /> {/* Orders */}
                <Route path="/employees" element={<Employees />} /> {/* Employees */}
                <Route path="/customers" element={<Customers />} /> {/* Customers */}
                <Route path="/kanban" element={<Kanban />} /> {/* Kanban */}
                <Route path="/editor" element={<Editor />} /> {/* Editor */}
                <Route path="/calendar" element={<Calendar />} /> {/* Calendar */}
                <Route path="/color-picker" element={<ColorPicker />} /> {/* Color Picker */}
                <Route path="/line" element={<Line />} /> {/* Line chart */}
                <Route path="/area" element={<Area />} /> {/* Area chart */}
                <Route path="/bar" element={<Bar />} /> {/* Bar chart */}
                <Route path="/pie" element={<Pie />} /> {/* Pie chart */}
                <Route path="/financial" element={<Financial />} /> {/* Financial chart */}
                <Route path="/color-mapping" element={<ColorMapping />} /> {/* Color Mapping */}
                <Route path="/pyramid" element={<Pyramid />} /> {/* Pyramid chart */}
                <Route path="/stacked" element={<Stacked />} /> {/* Stacked chart */}
                <Route path="/dashboard" element={<Dashboard1 />} /> {/* Dashboard */}
                <Route path="/inventory" element={<Inventory1 />} /> {/* Inventory */}
                <Route path="/order" element={<Orders1 />} /> {/* Order */}
                <Route path="/customer" element={<Customers1 />} /> {/* Customer */}
                <Route path="/add-product" element={<App1 />} /> {/* Add Product */}
                <Route path="/expentiture" element={<App2 />} /> {/* Expenditure */}
                <Route path="/add_emp" element={<App3 />} /> {/* Add Employee */}
                <Route path="/attendence" element={<App4 />} /> {/* Attendance */}
                <Route path="/show_attendance" element={<App5 />} /> {/* Show Attendance */}
                <Route path="/bill_entry" element={<App6 />} /> {/* Bill Entry */}
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

// Exporting the App component
export default App;
