import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Updated import to useNavigate
import { Footer } from "../components";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  // State variables to manage visibility of password, cashier ID, and cashier password
  const [showPassword, setShowPassword] = useState(false);
  const [cashierId, setCashierId] = useState('');
  const [cashierPassword, setCashierPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle input changes for cashier ID and password
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setCashierId(value);
    } else if (name === 'password') {
      setCashierPassword(value);
    }
  };

  // Function to handle form submission for login
  const handleLogin = (e) => {
    e.preventDefault();
    // Extract data from the form
    const formData = {
      username: cashierId,
      password: cashierPassword
    };

    // Post form data using Fetch API
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        // Handle response data
        console.log(data);
        // Assuming the response contains a token
        localStorage.setItem('token', data.token);
        // Clear form fields
        setCashierId('');
        setCashierPassword('');
        navigate('/home'); // Navigate to home page
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
  };

  return (
    <div style={{ marginTop: '100px', backgroundColor: 'white', width: '600px', marginLeft: '425px' }}>
      <div className="container my-3 py-3" style={{ backgroundColor: 'white', width: '600px', marginTop: '100px' }}>
        <form>
          <h1 className="text-center" style={{ marginLeft: '150px', marginBottom: '40px' }}>Login</h1>
          <div className="my-3">
            <input
              type="text"
              className="form-control"
              id="cashierid"
              name="username"
              placeholder="name@example.com"
              style={{ marginLeft: '150px', width: '300px' }}
              onChange={handleInputChange}
            />
          </div>

          <div className="my-3 position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control pr-5"
              id="cashierpassword"
              name="password"
              placeholder="Password"
              style={{ width: '300px', marginLeft: '150px' }}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="btn btn-outline-secondary position-absolute end-0 top-50 translate-middle-y border-0"
              onClick={togglePasswordVisibility}
              style={{ zIndex: '1' }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="my-3">
            <p style={{ marginLeft: '245px' }}> New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
          </div>

          <div className="text-center" style={{ marginLeft: '170px' }}>
            <button className="btn btn-dark" style={{ width: '100px' }} onClick={handleLogin}>
              Login
            </button>
          </div>

        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
