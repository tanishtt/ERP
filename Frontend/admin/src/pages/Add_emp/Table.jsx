import React, { useEffect, useState } from 'react';
import './App.css';

function Table() {
    // State to manage the data fetched from the server
    const [data, setData] = useState([]);
    
    // State to manage the form data for adding/editing employees
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        job_title: '',
        salary: '',
        hire_date: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
    });

    // State to manage the ID of the employee being edited
    const [editId, setEditId] = useState(null);

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Function to fetch data from the server
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3030/employee');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    // Function to handle form submission for adding a new employee
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3030/employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to add employee');
            }
            const newData = await response.json();
            setData([...data, newData]);
            setFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                job_title: '',
                salary: '',
                hire_date: '',
                emergency_contact_name: '',
                emergency_contact_phone: '',
            });
        } catch (error) {
            console.error("Error adding employee: ", error);
        }
    };

    // Function to handle input changes in the form
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle editing an employee
    const handleEdit = (id) => {
        const employeeToEdit = data.find(employee => employee.id === id);
        if (employeeToEdit) {
            setFormData(employeeToEdit);
            setEditId(id);
        } else {
            console.error("Employee not found for editing");
        }
    };

    // Function to handle updating an employee's data
    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3030/employee/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to update employee');
            }
            await response.json();
            const updatedData = data.map(employee => {
                if (employee.id === editId) {
                    return formData;
                }
                return employee;
            });
            setData(updatedData);
            setFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                job_title: '',
                salary: '',
                hire_date: '',
                emergency_contact_name: '',
                emergency_contact_phone: '',
            });
            setEditId(null);
        } catch (error) {
            console.error("Error updating employee: ", error);
        }
    };

    // Function to handle deleting an employee
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3030/employee/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }
            const updatedData = data.filter(employee => employee.id !== id);
            setData(updatedData);
        } catch (error) {
            console.error("Error deleting employee: ", error);
        }
    };

    return (
        <div className='container'>
            <div className='form-div'>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
                    <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                    <input type="text" name="phone" placeholder="Contact" value={formData.phone} onChange={handleInputChange} />
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} />
                    <input type="text" name="job_title" placeholder="Job Title" value={formData.job_title} onChange={handleInputChange} />
                    <input type="text" name="salary" placeholder="Salary" value={formData.salary} onChange={handleInputChange} />
                    <input type="text" name="hire_date" placeholder="Hire Date" value={formData.hire_date} onChange={handleInputChange} />
                    <input type="text" name="emergency_contact_name" placeholder="Emergency Name" value={formData.emergency_contact_name} onChange={handleInputChange} />
                    <input type="text" name="emergency_contact_phone" placeholder="Emergency Contact" value={formData.emergency_contact_phone} onChange={handleInputChange} />

                    {editId ? (
                        <button type="button" onClick={handleUpdate}>Update</button>
                    ) : (
                        <button type="submit">Add</button>
                    )}
                </form>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Job Title</th>
                        <th>Salary</th>
                        <th>Hire Date</th>
                        <th>Emergency Name</th>
                        <th>Emergency Contact</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.address}</td>
                            <td>{employee.job_title}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.hire_date}</td>
                            <td>{employee.emergency_contact_name}</td>
                            <td>{employee.emergency_contact_phone}</td>
                            <td>
                                <button onClick={() => handleEdit(employee.id)}>Edit</button>
                                <button onClick={() => handleDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
