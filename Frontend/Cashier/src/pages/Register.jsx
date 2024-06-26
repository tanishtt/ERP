import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom

const Register = () => {
    const navigate = useNavigate(); // Initialize navigate for programmatic navigation
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        role: 'cashier', // Default role is set to 'cashier'
        username: '',
        password: ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Update form data state
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log(formData);
        fetch('http://localhost:3000/signup', { // Send a POST request to the signup endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData) // Send form data as JSON
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.alert('Registration successful! Please login.'); // Alert user on successful registration
            navigate('/login'); // Navigate to the login page
        })
        .catch((error) => {
            console.error('Error:', error); // Log any errors
            // Handle any errors here
        });
    };

    return (
        <div style={{ marginTop: '100px', backgroundColor: 'white', width: '800px', marginLeft: '325px' }}>
            <div className="row my-4 h-100">
                <h1 className="text-center" style={{ marginTop: '30px' }}>Register</h1>
                <form style={{ width: '1000px', marginLeft: '40px', marginTop: '30px' }} onSubmit={handleSubmit}>

                    {/* Full Name and Email input fields */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ marginRight: '20px' }}>
                            <label htmlFor="Name" style={{ marginLeft: '25px' }}>Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Name"
                                placeholder="Enter Your Name"
                                style={{ width: '300px' }}
                                name='full_name'
                                value={formData.full_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="Email" style={{ marginLeft: '25px' }}>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="Email"
                                placeholder="name@gmail.com"
                                style={{ width: '300px' }}
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Contact Number and Role selection */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginTop: '20px' }}>
                        <div style={{ marginRight: '20px' }}>
                            <label htmlFor="contact" style={{ marginLeft: '25px' }}>Contact Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="contactnumber"
                                name="phone"
                                placeholder=""
                                style={{ width: '300px' }}
                                pattern="[0-9]{10}" // Ensure the contact number is 10 digits
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="role" style={{ marginLeft: '25px' }}>Role</label>
                            <select
                                className="form-control"
                                id="role"
                                style={{ width: '300px', marginLeft: '30px' }}
                                name='role'
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="cashier">cashier</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>
                    </div>

                    {/* Username and Password input fields */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginTop: '20px' }}>
                        <div style={{ marginRight: '20px' }}>
                            <label htmlFor="Email" style={{ marginLeft: '25px' }}>Cashier username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cashierid"
                                placeholder=""
                                style={{ width: '300px' }}
                                name='username'
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="Password" style={{ marginLeft: '25px' }}>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="cashierpassword"
                                placeholder="Password"
                                style={{ width: '300px' }}
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Link to the login page */}
                    <div className="my-3" style={{ marginLeft: '225px', paddingTop: '20px' }}>
                        <p>Already have an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                    </div>
                    
                    {/* Register button */}
                    <div className="text-center" style={{ marginRight: '90px' }}>
                        <button className="my-2 mx-auto btn btn-dark" type="submit">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register; // Export the Register component
