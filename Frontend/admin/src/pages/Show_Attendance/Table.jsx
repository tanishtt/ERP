import { useEffect, useState } from "react";
import { Table, Select } from "antd";

const { Option } = Select;

// Replace 'YOUR_FETCH_URL' with your actual backend URL for fetching attendance data
const FETCH_URL = "http://localhost:3032/xyz";

const AttendancePage = () => {
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    fetchData(selectedMonth);
  }, [selectedMonth]);

  const fetchData = async (selectedMonth) => {
    try {
      setLoading(true);
      const response = await fetch(FETCH_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch attendance data");
      }
      const data = await response.json();
      const filteredData = selectedMonth ? data.filter(item => item.attendance_date.includes(selectedMonth)) : data;
      setAttendanceData(filteredData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Extracting unique employee IDs and dates
  const employeeIds = [...new Set(attendanceData.map((item) => item.employee_id))];
  const dates = [...new Set(attendanceData.map((item) => item.attendance_date))];

  // Generate columns for each day of the month
  const columns = dates.map((date) => ({
    title: new Date(date).toISOString().split('T')[0], // Extracting only the date part
    dataIndex: date,
    key: date,
    render: (text, record) => {
      const attendance = attendanceData.find((item) => item.employee_id === record.employee_id && item.attendance_date === date);
      return attendance ? attendance.status : "-";
    },
  }));

  // Generate dataSource with employees' names
  const dataSource = employeeIds.map((id) => {
    const employeeAttendance = {};
    employeeAttendance.key = id;
    employeeAttendance.employee_id = id;
    attendanceData.forEach((item) => {
      if (item.employee_id === id) {
        employeeAttendance[item.attendance_date] = item.status;
      }
    });
    return employeeAttendance;
  });

  // Columns configuration for the table
  const columnsConfig = [
    {
      title: "Employee ID",
      dataIndex: "employee_id",
      key: "employee_id",
    },
    ...columns,
  ];

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  return (
    <div style={{ padding: "20px" }}>
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
      <Table
        dataSource={dataSource}
        columns={columnsConfig}
        loading={loading}
        pagination={false}
      />
    </div>
  );
};

export default AttendancePage;
