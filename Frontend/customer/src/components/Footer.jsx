import React from "react";

// Define a functional component named Footer
const Footer = () => {
  return (
    <>
      {/* Fragment to wrap the footer element */}
      <footer className="mb-0 text-center">
        {/* Footer container with flexbox for alignment */}
        <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6">
            {/* Paragraph with link to an external website */}
            <p className="mb-3 mb-md-0">
              <a
                href="https://sahibsingh.dev"
                className="text-decoration-underline text-dark fs-5"
                target="_blank"
                rel="noreferrer"
              >
                {/* Content of the link (add text here if needed) */}
              </a>
            </p>
            {/* Link to a GitHub profile */}
            <a
              className="text-dark fs-4"
              href="https://github.com/ssahibsingh"
              target="_blank"
              rel="noreferrer"
            >
              {/* Content of the link (add text here if needed) */}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

// Export the Footer component as default
export default Footer;
