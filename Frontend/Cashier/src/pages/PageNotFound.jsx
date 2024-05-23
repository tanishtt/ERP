import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import { Navbar } from "../components"; // Import the Navbar component

const PageNotFound = () => {
  return (
    <>
      {/* Render the Navbar component */}
      <Navbar />
      <div className="container my-3 py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5 bg-light text-center">
              {/* Display a 404 message */}
              <h4 className="p-3 display-5">404: Page Not Found</h4>
              {/* Link to navigate back to the home page */}
              <Link to="/" className="btn btn-outline-dark mx-4">
                <i className="fa fa-arrow-left"></i> Go Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
