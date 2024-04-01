import React from 'react'

import { Link } from 'react-router-dom';
const Register = () => {
    return (
        <div style={{ marginTop: '100px', backgroundColor: 'white', width: '600px', marginLeft: '425px' }}>
            
                <div class="row my-4 h-100">
                <h1 className="text-center" style={{marginTop:'30px'}}>Register</h1>
                        <form style={{width:'400px', marginLeft:'100px'}} action="/" method="post">
                            <div class="form my-3">
                                <label for="Name" style={{marginLeft:'25px'}}>Full Name</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                />
                            </div>
                            <div class="form my-3">
                                <label for="Email" style={{marginLeft:'25px'}}>Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div class="form my-3">
                                <label for="Email" style={{marginLeft:'25px'}}>Cashier ID</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="cashierid"
                                    name="cashierid"
                                    placeholder="name@example.com"

                                />
                            </div>
                            <div class="form  my-3">
                                <label for="Password" style={{marginLeft:'25px'}}>Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="cashierpassword"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="my-3" style={{marginLeft:'125px'}}>
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit" disabled>
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                
            
            
        </div>
    )
}

export default Register