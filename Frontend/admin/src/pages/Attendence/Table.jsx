import { Avatar, Button, Rate, Space, Table, Typography, Select } from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;

// Replace 'YOUR_FETCH_URL' and 'YOUR_POST_URL' with your actual backend URLs
const FETCH_URL = "http://localhost:3030/employee";
const POST_URL = "http://localhost:3031/attendance";

// Function to fetch employee names from the backend
const getEmployeeNames = async () => {
  try {
    const response = await fetch(FETCH_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch employee names");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching employee names:", error);
    throw error;
  }
};

// Function to post attendance data to the backend
const postAttendance = async (attendanceData) => {
  try {
    console.log(attendanceData)
    const response = await fetch(POST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendanceData),
    });

    if (!response.ok) {
      throw new Error("Failed to post attendance data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error posting attendance data:", error);
    throw error;
  }
};

// Function to get the current date in 'YYYY-MM-DD' format
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function Attendance() {
  // State to manage the loading status
  const [loading, setLoading] = useState(false);
  
  // State to manage the data source for the table
  const [dataSource, setDataSource] = useState([]);

  // Fetch employee names when the component mounts
  useEffect(() => {
    setLoading(true);
    getEmployeeNames()
      .then((data) => {
        const formattedData = data.map((employee) => ({
          key: employee.id,
          name: employee.name,
          attendance_date: getCurrentDate(),
          status: "Present", // Default status
        }));
        setDataSource(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching employee names:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Handle the change of attendance status for a specific employee
  const handleStatusChange = (value, record) => {
    const updatedDataSource = dataSource.map((item) =>
      item.key === record.key ? { ...item, status: value } : item
    );
    setDataSource(updatedDataSource);
  };

  // Handle the submission of attendance data
  const handleSubmit = () => {
    postAttendance(dataSource)
      .then((res) => {
        console.log("Attendance data posted successfully:", res);
        // You can perform additional actions upon successful submission
      })
      .catch((error) => {
        console.error("Error posting attendance data:", error);
        // You can handle the error here
      });
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '20px' , margin: '20px', backgroundColor: '#f0f0f0'}}>
      <Space size={20} direction="vertical">
        <Typography.Title level={4} style={{ marginLeft: '20px', marginBottom:'10px', fontSize: '24px' }}>Attendance</Typography.Title>
        
        {/* Display the current date */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", marginLeft:'15px' }}>
          <div>
            <label htmlFor="membership">Date:</label>
            <input type="date" className="form-control" id="membership" value={getCurrentDate()} 
                   style={{width:'110px', marginLeft:'10px'}}
                   readOnly />
          </div>
        </div>

        {/* Render the table with employee attendance data */}
        <Table style={{width:"72vw", height:"70vh", paddingLeft:'2vw', paddingRight:'1vw'}}
          loading={loading}
          columns={[
            {
              title: "Employee Name",
              dataIndex: "name",
            },
            {
              title: "Date",
              dataIndex: "attendance_date",
            },
            {
              title: "Status",
              dataIndex: "status",
              render: (status, record) => (
                <Select
                  defaultValue={status}
                  style={{ width: 120 }}
                  onChange={(value) => handleStatusChange(value, record)}
                >
                  <Option value="Absent">Absent</Option>
                  <Option value="Present">Present</Option>
                  <Option value="Leave">Leave</Option>
                </Select>
              ),
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
          }}
        />

        {/* Submit button to post attendance data */}
        <Button type="primary" onClick={handleSubmit} style={{backgroundColor: "black", marginLeft:'1000px'}}>
          Submit
        </Button>
      </Space>
    </div>
  );
}

export default Attendance;
