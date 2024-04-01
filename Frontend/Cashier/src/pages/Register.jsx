import React from 'react'

import { Link } from 'react-router-dom';
const Register = () => {
    return (
        <div style={{ marginTop: '100px', backgroundColor: 'white', width: '800px', marginLeft: '325px' }}>

            <div class="row my-4 h-100">
                <h1 className="text-center" style={{ marginTop: '30px' }}>Register</h1>
                <form style={{ width: '1000px', marginLeft: '40px', marginTop:'30px' }} method='post' action='http://localhost:3000/signup'>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ marginRight: '20px' }}>
                            <label htmlFor="Name" style={{ marginLeft: '25px' }}>Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Name"
                                placeholder="Enter Your Name"
                                style={{width:'300px'}}
                                name='full_name'
                            />
                        </div>
                        <div>
                            <label htmlFor="Email" style={{ marginLeft: '25px' }}>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="Email"
                                placeholder="name@gmail.com"
                                style={{width:'300px'}}
                                name='email'
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginTop:'20px' }}>
                        <div style={{ marginRight: '20px' }}>
                            <label htmlFor="contact" style={{ marginLeft: '25px' }}>Contact Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="contactnumber"
                                name="phone"
                                placeholder=""
                                style={{width:'300px'}}
                                pattern="[0-9]{10}"
                            />
                        </div>
                        <div>
                            <label htmlFor="role" style={{ marginLeft: '25px' }}>Role</label>
                            <input
                                type="text"
                                className="form-control"
                                id="role"
                                placeholder=""
                                style={{width:'300px'}}
                                name='role'
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginTop:'20px' }}>
                        <div style={{ marginRight: '20px' }}>
                            <label htmlFor="Email" style={{ marginLeft: '25px' }}>Cashier ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cashierid"
                                placeholder=""
                                style={{width:'300px'}}
                                name='username'
                            />
                        </div>
                        <div>
                            <label htmlFor="Password" style={{ marginLeft: '25px' }}>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="cashierpassword"
                                placeholder="Password"
                                style={{width:'300px'}}
                                name='password'
                            />
                        </div>
                    </div>



                    <div className="my-3" style={{ marginLeft: '225px' , paddingTop:'20px'}}>
                        <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                    </div>
                    <div className="text-center" style={{marginRight:'90px'}}>
                        <button class="my-2 mx-auto btn btn-dark" type="submit">
                            Register
                        </button>
                    </div>
                </form>
            </div>



        </div>
    )
}

export default Register;