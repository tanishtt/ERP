import React from 'react';
import { Footer, Navbar, Product } from "../components"; // Importing necessary components

const Products = () => {
  return (
    <>
      <Navbar /> {/* Render the Navbar component */}
      <Product /> {/* Render the Product component */}
      <Footer /> {/* Render the Footer component */}
    </>
  );
}

export default Products; // Export the Products component
