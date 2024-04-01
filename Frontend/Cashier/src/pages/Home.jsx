// Home.jsx

import React from 'react';
import { Navbar, Main, Footer } from "../components";
import { isAuthenticated } from "./auth"; // Import the isAuthenticated function from auth.js

function Home() {
  // Check if user is authenticated
  const isLoggedIn = isAuthenticated();

  return (
    <>
      <Navbar />
      {isLoggedIn ? <Main /> : <p>Please log in to access the main content.</p>}
      <Footer />
    </>
  );
}

export default Home;
