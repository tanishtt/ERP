import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [cashierId, setCashierId] = useState('');
  const [cashierPassword, setCashierPassword] = useState('');
 


  const [cashierCredentials, setCashierCredentials] = useState([
    { id: 'shreeya', password: '1234' },
    { id: 'vaishnav', password: '987654321' }
  ]);
  
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cashierid') {
      setCashierId(value);
    } else if (name === 'cashierpassword') {
      setCashierPassword(value);
    }
  };

  // Function to check if login button should be enabled
  const isLoginDisabled = () => {
    return !cashierCredentials.some(credential => credential.id === cashierId && credential.password === cashierPassword);
  };

  const handleLogin = () => {
    // Perform login logic here
    // Once logged in successfully, set the cashierId
    setCashierId(document.getElementById('cashier').value);
  };

  return (
    <div style={{ marginTop: '100px', backgroundColor: 'white', width: '600px', marginLeft: '425px' }}>
      <div className="container my-3 py-3" style={{ backgroundColor: 'white', width: '600px', marginTop: '100px' }}>
        <form>
          <h1 className="text-center" style={{ marginLeft: '150px', marginBottom: '40px' }}>Login</h1>
          <div className="my-3">
            <input
              type="email"
              className="form-control"
              id="cashierid"
              name="cashierid"
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
              name="cashierpassword"
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
            <Link to="/" className={`btn btn-dark ${isLoginDisabled() ? 'disabled' : ''}`} style={{ width: '100px' }}>
              Login
            </Link>
          </div>

        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
