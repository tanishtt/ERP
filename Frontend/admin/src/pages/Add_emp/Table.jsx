import React, { useEffect, useState } from 'react';
import './App.css';

function Table() {
    const [data, setData] = useState([]);
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
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

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
                throw new Error('Failed to add product');
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
            console.error("Error adding product: ", error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (id) => {
        const productToEdit = data.find(product => product.id === id);
        if (productToEdit) {
            setFormData(productToEdit);
            setEditId(id);
        } else {
            console.error("Product not found for editing");
        }
    };

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
                throw new Error('Failed to update product');
            }
            await response.json();
            const updatedData = data.map(product => {
                if (product.id === editId) {
                    return formData;
                }
                return product;
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
            console.error("Error updating product: ", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3030/employee/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            const updatedData = data.filter(product => product.id !== id);
            setData(updatedData);
        } catch (error) {
            console.error("Error deleting product: ", error);
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
                    {data.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.email}</td>
                            <td>{product.phone}</td>
                            <td>{product.address}</td>
                            <td>{product.job_title}</td>
                            <td>{product.salary}</td>
                            <td>{product.hire_date}</td>
                            <td>{product.emergency_contact_name}</td>
                            <td>{product.emergency_contact_phone}</td>
                            <td>
                                <button onClick={() => handleEdit(product.id)}>Edit</button>
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
