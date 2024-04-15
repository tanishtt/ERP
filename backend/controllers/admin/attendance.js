const connection= require('../../connection/connection');


// Controller function for adding attendance
const addAttendance = (req, res) => {
    const { employee_id, attendance_date, status } = req.body;
    
    // Check if all required fields are provided
    if (!employee_id || !attendance_date || !status) {
        return res.status(400).json({ error: 'Employee ID, attendance date, and status are required' });
    }

    // Insert attendance record into the database
    const sql = 'INSERT INTO Attendance (employee_id, attendance_date, status) VALUES (?, ?, ?)';
    connection.query(sql, [employee_id, attendance_date, status], (err, result) => {
        if (err) {
            console.error('Error adding attendance: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Attendance added successfully' });
    });
};

// Controller function for getting attendance by employee ID
const getAttendanceByEmployeeId = (req, res) => {
    const { employee_id } = req.params;
    
    // Retrieve attendance records by employee ID from the database
    const sql = 'SELECT * FROM Attendance WHERE employee_id=?';
    connection.query(sql, [employee_id], (err, results) => {
        if (err) {
            console.error('Error retrieving attendance by employee ID: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
};

// Controller function for getting attendance by date for all employees
const getAttendanceByDate = (req, res) => {
    const { date } = req.params;
    
    // Retrieve attendance records by date from the database
    const sql = 'SELECT * FROM Attendance WHERE attendance_date=?';
    connection.query(sql, [date], (err, results) => {
        if (err) {
            console.error('Error retrieving attendance by date: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
};


// Controller function for getting attendance statistics by employee ID
const getAttendanceStatsByEmployeeId = (req, res) => {
    const { employee_id } = req.params;

    // Retrieve attendance records by employee ID from the database
    const sql = 'SELECT * FROM Attendance WHERE employee_id=?';
    connection.query(sql, [employee_id], (err, results) => {
        if (err) {
            console.error('Error retrieving attendance by employee ID: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Initialize counters for different statuses
        let presentCount = 0;
        let absentCount = 0;
        let lateCount = 0;
        let onLeaveCount = 0;

        // Calculate attendance statistics
        results.forEach(attendance => {
            switch (attendance.status) {
                case 'Present':
                    presentCount++;
                    break;
                case 'Absent':
                    absentCount++;
                    break;
                case 'Late':
                    lateCount++;
                    break;
                case 'On Leave':
                    onLeaveCount++;
                    break;
                default:
                    break;
            }
        });

        // Prepare response JSON
        const attendanceStats = {
            employee_id: parseInt(employee_id),
            present_days: presentCount,
            absent_days: absentCount,
            late_days: lateCount,
            on_leave_days: onLeaveCount
        };

        res.json(attendanceStats);
    });
};

// Controller function for getting attendance statistics by employee ID and year
const getAttendanceStatsByEmployeeIdAndYear = (req, res) => {
    const { employee_id, year } = req.params;

    // Retrieve attendance records by employee ID and year from the database
    const sql = 'SELECT * FROM Attendance WHERE employee_id=? AND YEAR(attendance_date)=?';
    connection.query(sql, [employee_id, year], (err, results) => {
        if (err) {
            console.error('Error retrieving attendance by employee ID and year: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Initialize counters for different statuses
        let presentCount = 0;
        let absentCount = 0;
        let lateCount = 0;
        let onLeaveCount = 0;

        // Calculate attendance statistics
        results.forEach(attendance => {
            switch (attendance.status) {
                case 'Present':
                    presentCount++;
                    break;
                case 'Absent':
                    absentCount++;
                    break;
                case 'Late':
                    lateCount++;
                    break;
                case 'On Leave':
                    onLeaveCount++;
                    break;
                default:
                    break;
            }
        });

        // Prepare response JSON
        const attendanceStats = {
            employee_id: parseInt(employee_id),
            year: parseInt(year),
            present_days: presentCount,
            absent_days: absentCount,
            late_days: lateCount,
            on_leave_days: onLeaveCount
        };

        res.json(attendanceStats);
    });
};


// Controller function for getting attendance statistics by employee ID, year, and month
const getAttendanceStatsByEmployeeIdYearAndMonth = (req, res) => {
    const { employee_id, year, month } = req.params;

    // Retrieve attendance records by employee ID, year, and month from the database
    const sql = 'SELECT * FROM Attendance WHERE employee_id=? AND YEAR(attendance_date)=? AND MONTH(attendance_date)=?';
    connection.query(sql, [employee_id, year, month], (err, results) => {
        if (err) {
            console.error('Error retrieving attendance by employee ID, year, and month: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Initialize counters for different statuses
        let presentCount = 0;
        let absentCount = 0;
        let lateCount = 0;
        let onLeaveCount = 0;

        // Calculate attendance statistics
        results.forEach(attendance => {
            switch (attendance.status) {
                case 'Present':
                    presentCount++;
                    break;
                case 'Absent':
                    absentCount++;
                    break;
                case 'Late':
                    lateCount++;
                    break;
                case 'On Leave':
                    onLeaveCount++;
                    break;
                default:
                    break;
            }
        });

        // Prepare response JSON
        const attendanceStats = {
            employee_id: parseInt(employee_id),
            year: parseInt(year),
            month: parseInt(month),
            present_days: presentCount,
            absent_days: absentCount,
            late_days: lateCount,
            on_leave_days: onLeaveCount
        };

        res.json(attendanceStats);
    });
};


async function getEmployees(req, res){

     connection.query('SELECT employee_id, name FROM Employees', (err, results) => {
        if (err) {
            console.error('Error retrieving employees: ', err);
            res.status(500).send('Internal server error');
            return;
        }

        res.json(results);
    });
}



module.exports={
    addAttendance,
    getAttendanceByDate,
    getAttendanceByEmployeeId,
    getAttendanceStatsByEmployeeId,
    getAttendanceStatsByEmployeeIdAndYear,
    getAttendanceStatsByEmployeeIdYearAndMonth,
    getEmployees

}
