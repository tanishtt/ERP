import React, { useEffect, useState } from 'react';
import './App.css';

function Table() {
    // State variables to manage data, form input, and editing
    const [data, setData] = useState([]); // Data from API
    const [formData, setFormData] = useState({ // Form data for adding or editing a record
        category: '',
        name: '',
        date: '',
        description: '',
        amount: '',
        status: '',
        email: ''
    });
    const [editId, setEditId] = useState(null); // ID of the record being edited

    // Fetch data from the API when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/admin/expenditure/get-expenditure');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    // Function to handle form submission for adding or editing a record
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Post data to the API
            const response = await fetch('http://localhost:3000/admin/expenditure/post-expenditure', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to add product');
            }
            // Update the data state with the new record
            const newData = await response.json();
            setData([...data, ...newData]);
            // Clear the form input
            setFormData({
                category: '',
                name: '',
                date: '',
                description: '',
                amount: '',
                status: '',
                email: ''
            });
        } catch (error) {
            console.error("Error adding product: ", error);
        }
    };

    // Function to handle input changes in the form
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle editing a record
    const handleEdit = (id) => {
        const productToEdit = data.find(product => product.expenditure_id === id);
        if (productToEdit) {
            setFormData(productToEdit);
            setEditId(id);
        } else {
            console.error("Product not found for editing");
        }
    };

    // Function to handle updating a record
    const handleUpdate = async () => {
        try {
            // Update data in the API
            const response = await fetch(`http://localhost:3000/admin/expenditure/update-expenditure/${editId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            // Update the data state with the updated record
            const updatedData = data.map(product => {
                if (product.expenditure_id === editId) {
                    return { expenditure_id: product.expenditure_id, ...formData };
                }
                return product;
            });
            setData(updatedData);
            // Clear the form input and edit ID
            setFormData({
                category: '',
                name: '',
                date: '',
                description: '',
                amount: '',
                status: '',
                email: ''
            });
            setEditId(null);
        } catch (error) {
            console.error("Error updating product: ", error);
        }
    };

    // Function to handle deleting a record
    const handleDelete = async (id) => {
        try {
            // Delete data from the API
            const response = await fetch(`http://localhost:3000/admin/expenditure/delete-expenditure/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            // Remove the deleted record from the data state
            const updatedData = data.filter(product => product.expenditure_id !== id);
            setData(updatedData);
        } catch (error) {
            console.error("Error deleting product: ", error);
        }
    };

    return (
        <div className='container'>
            {/* Form for adding or editing a record */}
            <div className='form-div'>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} />
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
                    <input type="text" name="date" placeholder="Date" value={formData.date} onChange={handleInputChange} />
                    <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />
                    <input type="text" name="amount" placeholder="Amount" value={formData.amount} onChange={handleInputChange} />
                    <input type="text" name="status" placeholder="Status" value={formData.status} onChange={handleInputChange} />
                    <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                    {/* Conditional rendering of Add or Update button based on editId */}
                    {editId ? (
                        <button type="button" onClick={handleUpdate}>Update</button>
                    ) : (
                        <button type="submit">Add</button>
                    )}
                </form>
            </div>
            {/* Table to display the data */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapping through data to display each record */}
                    {data.map(product => (
                        <tr key={product.expenditure_id}>
                            <td>{product.expenditure_id}</td>
                            <td>{product.category}</td>
                            <td>{product.name}</td>
                            <td>{product.date}</td>
                            <td>{product.description}</td>
                            <td>{product.amount}</td>
                            <td>{product.status}</td>
                            <td>{product.email}</td>
                            {/* Buttons for editing and deleting each record */}
                            <td>
                                <button onClick={() => handleEdit(product.expenditure_id)}>Edit</button>
                                <button onClick={() => handleDelete(product.expenditure_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;

