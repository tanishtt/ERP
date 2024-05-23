import React from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Login = () => {
  return (
    <>
      <Navbar /> {/* Include Navbar component */}
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          {/* Center the form horizontally */}
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              {/* Email input */}
              <div class="my-3">
                <label for="display-4">Email address</label> {/* Label for email input */}
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
              </div>
              {/* Password input */}
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label> {/* Label for password input */}
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
              </div>
              {/* Link to register page */}
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              {/* Login button */}
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit" disabled> {/* Disable button */}
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer /> {/* Include Footer component */}
    </>
  );
};

export default Login;
