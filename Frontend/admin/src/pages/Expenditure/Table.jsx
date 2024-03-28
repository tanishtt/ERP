import React, { useEffect, useState } from 'react';
import './App.css';

function Table() {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');

    const [ucategory, usetCategory] = useState('');
    const [uname, usetName] = useState('');
    const [udate, usetDate] = useState('');
    const [udescription, usetDescription] = useState('');
    const [uamount, usetAmount] = useState('');
    const [ustatus, usetStatus] = useState('');
    const [uemail, usetEmail] = useState('');
    const [editId, setEditID] = useState(-1);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3031/users');
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
            const response = await fetch('http://localhost:3031/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: category,
                    name: name,
                    date: date,
                    description: description,
                    amount: amount,
                    status: status,
                    email: email
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
            fetchData();
            setCategory('');
            setName('');
            setDate('');
            setDescription('');
            setAmount('');
            setStatus('');
            setEmail('');
        } catch (error) {
            console.error("Error adding user: ", error);
        }
    };

    const handleEdit = async (id) => {
        try {
            const response = await fetch(`http://localhost:3031/users/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user for editing');
            }
            const userData = await response.json();
            usetCategory(userData.category);
            usetName(userData.name);
            usetDate(userData.date);
            usetDescription(userData.description);
            usetAmount(userData.amount);
            usetStatus(userData.status);
            usetEmail(userData.email);
            setEditID(id);
        } catch (error) {
            console.error("Error fetching user for editing: ", error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3031/users/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: ucategory,
                    name: uname,
                    date: udate,
                    description: udescription,
                    amount: uamount,
                    status: ustatus,
                    email: uemail
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            fetchData();
            setEditID(-1);
            // Reset the update form fields
            usetCategory('');
            usetName('');
            usetDate('');
            usetDescription('');
            usetAmount('');
            usetStatus('');
            usetEmail('');
        } catch (error) {
            console.error("Error updating user: ", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3031/users/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            fetchData();
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    };

    return (
        <div className='container'>
            <div className='form-div'>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
                    <input type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} />
                    <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                    <input type="text" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
                    <input type="text" placeholder="Status" value={status} onChange={e => setStatus(e.target.value)} />
                    <input type="text" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <button>Add</button>
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
                    {data.map((user) => (
                        user.id === editId ?
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td><input type="text" value={ucategory} onChange={e => usetCategory(e.target.value)} /></td>
                                <td><input type="text" value={uname} onChange={e => usetName(e.target.value)} /></td>
                                <td><input type="text" value={udate} onChange={e => usetDate(e.target.value)} /></td>
                                <td><input type="text" value={udescription} onChange={e => usetDescription(e.target.value)} /></td>
                                <td><input type="text" value={uamount} onChange={e => usetAmount(e.target.value)} /></td>
                                <td><input type="text" value={ustatus} onChange={e => usetStatus(e.target.value)} /></td>
                                <td><input type="text" value={uemail} onChange={e => usetEmail(e.target.value)} /></td>
                                <td><button onClick={handleUpdate}>Update</button></td>
                            </tr>
                            :
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.category}</td>
                                <td>{user.name}</td>
                                <td>{user.date}</td>
                                <td>{user.description}</td>
                                <td>{user.amount}</td>
                                <td>{user.status}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => handleEdit(user.id)}>edit</button>
                                    <button onClick={() => handleDelete(user.id)}>delete</button>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;

