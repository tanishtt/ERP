import React from "react";

// Define a functional component named Footer
const Footer = () => {
  return (
    <>
      {/* The footer element with a margin-bottom of 0 and centered text */}
      <footer className="mb-0 text-center">
        {/* A div for flexbox alignment, centering the content both vertically and horizontally, with padding at the bottom */}
        <div className="d-flex align-items-center justify-content-center pb-5">
          {/* Column that takes up 6 out of 12 columns on medium devices and up */}
          <div className="col-md-6">
            {/* A paragraph with margin-bottom of 3 on small devices and 0 on medium and up */}
            <p className="mb-3 mb-md-0">
              {/* Anchor link with underline text decoration, dark text color, and font size 5 */}
              <a href="https://sahibsingh.dev" className="text-decoration-underline text-dark fs-5" target="_blank" rel="noreferrer"></a>
            </p>
            {/* Anchor link with dark text color and font size 4 */}
            <a className="text-dark fs-4" href="https://github.com/ssahibsingh" target="_blank" rel="noreferrer">
              
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
