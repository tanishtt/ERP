import React, { useState, useEffect } from 'react';
import Uploader from './Uploader';
import './index.css';

function App1() {
  // State to manage form data
  const [formData, setFormData] = useState({
    product_name: '',
    price: '',
    category_id: '', // You may set default category_id here
    stock_quantity: '',
    description: ''
  });

  // State to manage categories fetched from API
  const [categories, setCategories] = useState([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/add-product/api/category-drop-down');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Handler for input change events to update form state
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handler for form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/admin/add-product/submit-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }

      console.log('Form data submitted successfully:', formData);

      // Reset form data after successful submission
      setFormData({
        product_name: '',
        price: '',
        category_id: '', // Set to empty string or default value
        stock_quantity: '',
        description: ''
      });

    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '20px', margin: '20px', backgroundColor: '#f0f0f0' }}>
      <div className="App">
        <div style={{ color: 'black', marginBottom: '10px', marginLeft: "20px" }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>About Product</h1>
        </div>
        <form onSubmit={onSubmitHandler} style={{ marginTop: "230px", marginLeft: "350px" }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex' }}>
                <div className="form-group" style={{ marginRight: '10px' }}>
                  <label htmlFor="product-name" className="form-label" style={{ color: 'black', paddingRight: '2px', marginRight: '4px' }}>Product Name</label>
                  <input id="product-name" className="form-control" name="product_name" value={formData.product_name} onChange={onChangeHandler} style={{ backgroundColor: '#e6e3e3', borderRadius: '5px', marginBottom: '10px', padding: '6px', width: '370px' }} />
                </div>
                <div className="form-group" >
                  <label htmlFor="product-price" className="form-label" style={{ color: 'black', marginLeft: '40px', marginRight: '4px' }}>Product Price</label>
                  <input id="product-price" className="form-control" name="price" value={formData.price} onChange={onChangeHandler} style={{ backgroundColor: '#e6e3e3', borderRadius: '5px', marginBottom: '10px', padding: '6px', width: '370px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', marginTop: '10px' }}>
                <div className="form-group" style={{ marginRight: '10px' }}>
                  <label htmlFor="category" className="form-label" style={{ color: 'black', paddingRight: '2px', marginRight: '4px' }}>Category</label>
                  <select id="category" className="form-select" name="category_id" value={formData.category_id} onChange={onChangeHandler} style={{ backgroundColor: '#e6e3e3', borderRadius: '5px', marginBottom: '10px', padding: '6px', width: '410px' }}>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="quantity" className="form-label" style={{ color: 'black', marginLeft: '40px', paddingRight: '4px', marginRight: '4px' }}>Quantity</label>
                  <input id="quantity" className="form-control" name="stock_quantity" value={formData.stock_quantity} onChange={onChangeHandler} style={{ backgroundColor: '#e6e3e3', borderRadius: '5px', marginBottom: '10px', padding: '6px', width: '400px' }} />
                </div>
              </div>
              <div className="form-group" style={{ marginTop: '10px', display: 'flex', alignItems: 'center', width: '1000px' }}>
                <label htmlFor="description" className="form-label" style={{ color: 'black', paddingRight: '4px', marginRight: '4px', marginBottom: 0 }}>Description</label>
                <textarea id="description" className="form-control" name="description" value={formData.description} onChange={onChangeHandler} style={{ flex: 1, backgroundColor: '#e6e3e3', borderRadius: '5px', marginBottom: '10px', height: '100px', overflowY: 'auto' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
              <div>
                <Uploader />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: "15px" }}>
            <button className="btn" type="submit" style={{ border: '1px solid black', padding: '10px', borderRadius: '10px' }}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App1;
