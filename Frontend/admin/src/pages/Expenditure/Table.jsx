import React, { useEffect, useState } from 'react';
import './App.css';

function Table() {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        category: '',
        name: '',
        date: '',
        description: '',
        amount: '',
        status: '',
        email: ''
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
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
            else{
                console.log('abc');
            }
            const newData = await response.json();
            console.log(newData);
            console.log(data)
            setData([...data, newData]);
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
            await response.json();
            const updatedData = data.map(product => {
                if (product.id === editId) {
                    return formData;
                }
                return product;
            });
            setData(updatedData);
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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/admin/expenditure/delete-expenditure/${id}`, {
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
                    <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} />
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
                    <input type="text" name="date" placeholder="Date" value={formData.date} onChange={handleInputChange} />
                    <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />
                    <input type="text" name="amount" placeholder="Amount" value={formData.amount} onChange={handleInputChange} />
                    <input type="text" name="status" placeholder="Status" value={formData.status} onChange={handleInputChange} />
                    <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
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
                    {data.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.category}</td>
                            <td>{product.name}</td>
                            <td>{product.date}</td>
                            <td>{product.description}</td>
                            <td>{product.amount}</td>
                            <td>{product.status}</td>
                            <td>{product.email}</td>
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
