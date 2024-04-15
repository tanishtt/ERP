const connection =require('../../connection/connection');

async function addEmployee(req, res){
    const { name, email, phone, address, job_title, salary, hire_date, emergency_contact_name, emergency_contact_phone } = req.body;
    
    if (!name || !email || !phone || !address || !job_title || !salary || !hire_date || !emergency_contact_name || !emergency_contact_phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }


    const sql = 'INSERT INTO Employees (name, email, phone, address, job_title, salary, hire_date, emergency_contact_name, emergency_contact_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [name, email, phone, address, job_title, salary, hire_date, emergency_contact_name, emergency_contact_phone], (err, result) => {
        if (err) {
            console.error('Error adding employee: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(201).json({ message: 'Employee added successfully' });
    });
}



async function getEmployees(req, res){

     connection.query('SELECT * FROM Employees', (err, results) => {
        if (err) {
            console.error('Error retrieving employees: ', err);
            res.status(500).send('Internal server error');
            return;
        }

        res.json(results);
    });
}



async function updateEmployee(req, res){
    const { employee_id } = req.params;
    const { name, email, phone, address, job_title, salary, hire_date, termination_date, emergency_contact_name, emergency_contact_phone } = req.body;
    
    // Check if employee_id is provided
    if (!employee_id) {
        return res.status(400).json({ error: 'Employee ID is required' });
    }

    // Update employee in the database
    const sql = 'UPDATE Employees SET name=?, email=?, phone=?, address=?, job_title=?, salary=?, hire_date=?, termination_date=?, emergency_contact_name=?, emergency_contact_phone=? WHERE employee_id=?';
    connection.query(sql, [name, email, phone, address, job_title, salary, hire_date, termination_date, emergency_contact_name, emergency_contact_phone, employee_id], (err, result) => {
        if (err) {
            console.error('Error updating employee: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'Employee updated successfully' });
    });
};



async function deleteEmployee(req, res){
    const { employee_id } = req.params;
    
    // Check if employee_id is provided
    if (!employee_id) {
        return res.status(400).json({ error: 'Employee ID is required' });
    }

    // Delete employee from the database
    const sql = 'DELETE FROM Employees WHERE employee_id=?';
    connection.query(sql, [employee_id], (err, result) => {
        if (err) {
            console.error('Error deleting employee: ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    });
};




module.exports={
    addEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee
}