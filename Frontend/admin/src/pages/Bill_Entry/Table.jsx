import React, { useEffect, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Uploader from './Uploader';

function Table() {
    // State to manage the rows in the table
    const [rows, setRows] = useState([
        { id: 1, productName: '', category: '', qty: '', price: '', tax: '', totalAmount: '' }
    ]);

    // State to manage the next ID for new rows
    const [nextId, setNextId] = useState(2);

    // State to manage the form data
    const [formData, setFormData] = useState({
        vendor_name: '',
        bill_number: '',
        vendor_address: '',
        vendor_contact_number: '',
        bill_date: '',
        payment_type: '',
        due_date: '',
        gst_number: '',
        products: []
    });

    // Handle input changes in the table rows
    const handleInputChange = (id, event) => {
        const { name, value } = event.target;
        const newRows = rows.map(row => (row.id === id ? { ...row, [name]: value } : row));
        setRows(newRows);
    };

    // Add a new row to the table
    const handleAddRow = () => {
        setRows([...rows, { id: nextId, productName: '', category: '', qty: '', price: '', tax: '', totalAmount: '' }]);
        setNextId(nextId + 1);
    };

    // Delete a row from the table
    const handleDeleteRow = (id) => {
        const newRows = rows.filter(row => row.id !== id);
        setRows(newRows);
    };

    // Function to update form inputs with response data from Uploader component
    const updateFormInputs = (data) => {
        setFormData(data);
    };

    // Effect to update form inputs and table rows when formData changes
    useEffect(() => {
        // Update form inputs based on formData state
        Object.keys(formData).forEach(key => {
            const inputElement = document.getElementById(key);
            if (inputElement) {
                inputElement.value = formData[key];
            }
        });

        // Update rows state with products data from formData
        setRows(formData.products.map((product, index) => ({
            id: index + 1,
            productName: product.product_name,
            category: product.category,
            qty: product.qty,
            price: product.price,
            tax: product.tax,
            totalAmount: product.total_amount
        })));
    }, [formData]);

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '20px', margin: '20px', backgroundColor: '#f0f0f0' }}>
            <div>
                Vendor details:
            </div>
            <div>
                {/* Pass updateFormInputs function as prop to Uploader component */}
                <Uploader updateFormInputs={updateFormInputs} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex' }}>
                    <div className="form-group" style={{ marginRight: '10px' }}>
                        <label htmlFor="vendor_name" className="form-label" style={{ color: 'black', paddingRight: '2px', marginRight: '70px' }}>Name</label>
                        <input id="vendor_name" className="form-control" name="vendor_name" style={{ backgroundColor: '#e6e3e3', borderRadius: '5px', marginBottom: '10px', padding: '6px', width: '370px' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bill_date" className="form-label" style={{ color: 'black', marginLeft: '40px', marginRight: '45px' }}>Bill Date</label>
                        <input id="bill_date" className="form-control" name="bill_date" style={{ backgroundColor: '#e6e3e3', borderRadius: '5px', marginBottom: '10px', padding: '6px', width: '370px' }} />
                    </div>
                </div>

                <div style={{ display: 'flex' }}>
                    <div className="form-group">
                        <label htmlFor="vendor_contact_number" className="form-label" style={{ color: 'black', marginRight: '4px' }}>Phone number</label>
                        <input id="vendor_contact_number" className="form-control" name="vendor_contact_number" style={{ backgroundColor: '#e6e3e3', borderRadius: '5px', marginBottom: '10px', padding: '6px', width: '370px' }} />
                    </div>
                    <div className="form-group" style={{ marginRight: '10px' }}>
                        <label htmlFor="bill_number" className="form-label" style={{ color: 'black', paddingRight: '2px', marginLeft: '50px', marginRight: '20px' }}>Bill number</label>
                        <input id="bill_number" className="form-control" name="bill_number" style={{ backgroundColor: '#e6e3e3', borderRadius: '5px', marginBottom: '10px', padding: '6px', width: '370px' }} />
                    </div>
                </div>

                <div style={{ display: 'flex' }}>
                    <div className="form-group" style={{ marginRight: '10px' }}>
                        <label htmlFor="vendor_address" className="form-label" style={{ color: 'black', paddingRight: '2px', marginRight: '53px' }}>Address</label>
                        <input id="vendor_address" className="form-control" name="vendor_address" style={{ backgroundColor: '#e6e3e3', borderRadius: '5px', marginBottom: '10px', padding: '6px', width: '370px' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="due_date" className="form-label" style={{ color: 'black', marginLeft: '40px', marginRight: '40px' }}>Due Date</label>
                        <input id="due_date" className="form-control" name="due_date" style={{ backgroundColor: '#e6e3e3', borderRadius: '5px', marginBottom: '10px', padding: '6px', width: '370px' }} />
                    </div>
                </div>

                <div style={{ display: 'flex' }}>
                    <div className="form-group" style={{ marginRight: '10px' }}>
                        <label htmlFor="gst_number" className="form-label" style={{ color: 'black', paddingRight: '2px', marginRight: '20px' }}>GST number</label>
                        <input id="gst_number" className="form-control" name="gst_number" style={{ backgroundColor: '#e6e3e3', borderRadius: '5px', marginBottom: '10px', padding: '6px', width: '370px' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="payment_type" className="form-label" style={{ color: 'black', marginLeft: '40px', marginRight: '4px' }}>Payment Type</label>
                        <input id="payment_type" className="form-control" name="payment_type" style={{ backgroundColor: '#e6e3e3', borderRadius: '5px', marginBottom: '10px', padding: '6px', width: '370px' }} />
                    </div>
                </div>

                <div style={{ margin: '20px' }}>
                    <table className="table" style={{ borderRadius: '5px' }}>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Tax</th>
                                <th>Total Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={row.id}>
                                    <td><input type="text" name="productName" value={row.productName} onChange={(e) => handleInputChange(row.id, e)} /></td>
                                    <td><input type="text" name="category" value={row.category} onChange={(e) => handleInputChange(row.id, e)} /></td>
                                    <td><input type="number" name="qty" value={row.qty} onChange={(e) => handleInputChange(row.id, e)} style={{ width: '60px' }} /></td>
                                    <td><input type="number" name="price" value={row.price} onChange={(e) => handleInputChange(row.id, e)} style={{ width: '120px' }} /></td>
                                    <td><input type="number" name="tax" value={row.tax} onChange={(e) => handleInputChange(row.id, e)} style={{ width: '60px' }} /></td>
                                    <td><input type="number" name="totalAmount" value={row.totalAmount} onChange={(e) => handleInputChange(row.id, e)} /></td>
                                    <td><button onClick={() => handleDeleteRow(row.id)} className="delete-button"><FontAwesomeIcon icon={faTrash} /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleAddRow} style={{ backgroundColor: 'lightblue', padding: '5px', borderRadius: '5px', marginTop: '5px' }}>Add Item</button>
                </div>
            </div>
        </div>
    );
}

export default Table;
