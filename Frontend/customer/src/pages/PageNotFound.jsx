import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components";

const PageNotFound = () => {
  return (
    <>
      <Navbar /> {/* Include Navbar component */}
      <div className="container my-3 py-3">
        <div className="container">
          <div className="row">
            {/* Display 404 error message */}
            <div className="col-md-12 py-5 bg-light text-center">
              <h4 className="p-3 display-5">404: Page Not Found</h4> {/* 404 error message */}
              <Link to="/" className="btn  btn-outline-dark mx-4">
                <i className="fa fa-arrow-left"></i> Go Back to Home {/* Link to go back to home */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
