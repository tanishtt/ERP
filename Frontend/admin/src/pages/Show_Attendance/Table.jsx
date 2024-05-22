import { useEffect, useState } from "react";
import { Table, Select } from "antd"; // Importing Table and Select components from antd

const { Option } = Select; // Destructuring Option from Select

// Replace 'YOUR_FETCH_URL' with your actual backend URL for fetching attendance data
const FETCH_URL = "http://localhost:3032/xyz"; // URL to fetch attendance data

const AttendancePage = () => {
  // State to manage loading status, attendance data, and selected month
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  // useEffect to fetch data whenever selectedMonth changes
  useEffect(() => {
    fetchData(selectedMonth);
  }, [selectedMonth]);

  // Function to fetch attendance data from the backend
  const fetchData = async (selectedMonth) => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const response = await fetch(FETCH_URL); // Fetch data from the backend
      if (!response.ok) {
        throw new Error("Failed to fetch attendance data"); // Throw an error if the response is not ok
      }
      const data = await response.json(); // Parse the JSON response
      // Filter data based on selected month, if provided
      const filteredData = selectedMonth ? data.filter(item => item.attendance_date.includes(selectedMonth)) : data;
      setAttendanceData(filteredData); // Set the filtered data as attendanceData
    } catch (error) {
      console.error("Error fetching attendance data:", error); // Handle errors
    } finally {
      setLoading(false); // Set loading to false after data is fetched or an error occurs
    }
  };

  // Extracting unique employee IDs and dates from the attendance data
  const employeeIds = [...new Set(attendanceData.map((item) => item.employee_id))];
  const dates = [...new Set(attendanceData.map((item) => item.attendance_date))];

  // Generate columns for each day of the month
  const columns = dates.map((date) => ({
    title: new Date(date).toISOString().split('T')[0], // Extracting only the date part
    dataIndex: date,
    key: date,
    render: (text, record) => {
      const attendance = attendanceData.find((item) => item.employee_id === record.employee_id && item.attendance_date === date);
      return attendance ? attendance.status : "-"; // Display attendance status or "-" if not found
    },
  }));

  // Generate dataSource with employees' attendance data
  const dataSource = employeeIds.map((id) => {
    const employeeAttendance = {};
    employeeAttendance.key = id; // Use employee ID as the key
    employeeAttendance.employee_id = id; // Store employee ID
    attendanceData.forEach((item) => {
      if (item.employee_id === id) {
        employeeAttendance[item.attendance_date] = item.status; // Store attendance status for each date
      }
    });
    return employeeAttendance;
  });

  // Columns configuration for the table
  const columnsConfig = [
    {
      title: "Employee ID", // Column title
      dataIndex: "employee_id", // Data index for employee ID
      key: "employee_id", // Unique key for the column
    },
    ...columns, // Spread operator to include date columns dynamically
  ];

  // Function to handle month selection change
  const handleMonthChange = (value) => {
    setSelectedMonth(value); // Update selected month
  };

  // Render the Attendance table
  return (
    <div style={{ padding: "20px" }}>
      {/* Select component for month selection */}
      <Select defaultValue="" style={{ width: 120, marginBottom: '20px' }} onChange={handleMonthChange}>
        <Option value="">Select Month</Option>
        <Option value="2024-01">January</Option>
        <Option value="2024-02">February</Option>
        <Option value="2024-03">March</Option>
        <Option value="2024-04">April</Option>
        <Option value="2024-05">May</Option>
        <Option value="2024-06">June</Option>
        <Option value="2024-07">July</Option>
        <Option value="2024-08">August</Option>
        <Option value="2024-09">September</Option>
        <Option value="2024-10">October</Option>
        <Option value="2024-11">November</Option>
        <Option value="2024-12">December</Option>
        {/* Add options for other months */}
      </Select>
      {/* Table component to display attendance data */}
      <Table
        dataSource={dataSource} // Data source for the table
        columns={columnsConfig} // Columns configuration
        loading={loading} // Show loading indicator when data is being fetched
        pagination={false} // Disable pagination
      />
    </div>
  );
};

export default AttendancePage;
