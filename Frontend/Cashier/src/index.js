// Importing necessary modules from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing external CSS libraries
import '../node_modules/font-awesome/css/font-awesome.min.css'; // Font Awesome for icons
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for styling

// Importing React Router components
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing Redux components
import { Provider } from 'react-redux';
import store from './redux/store'; // Importing the Redux store

// Importing page components from the pages directory
import { Home, Product, Products, AboutPage, ContactPage, Cart, Login, Register, Checkout, PageNotFound } from "./pages";

// Creating the root element for rendering the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the main application
root.render(
  // Wrapping the application in BrowserRouter for enabling client-side routing
  <BrowserRouter>
    {/* Wrapping the application in Provider to pass the Redux store to the React application */}
    <Provider store={store}>
      {/* Defining the routes for the application */}
      <Routes>
        {/* Route for the login page */}
        <Route path="/" element={<Login />} />
        {/* Route for the home page */}
        <Route path="/Home" element={<Home />} />
        {/* Route for the products list page */}
        <Route path="/product" element={<Products />} />
        {/* Route for individual product pages with dynamic ID */}
        <Route path="/product/:id" element={<Product />} />
        {/* Route for the about page */}
        <Route path="/about" element={<AboutPage />} />
        {/* Route for the contact page */}
        <Route path="/contact" element={<ContactPage />} />
        {/* Route for the cart page */}
        <Route path="/cart" element={<Cart />} />
        {/* Route for the login page (duplicate path for login) */}
        <Route path="/login" element={<Login />} />
        {/* Route for the register page */}
        <Route path="/register" element={<Register />} />
        {/* Route for the checkout page */}
        <Route path="/checkout" element={<Checkout />} />
        {/* Route for handling unknown paths (404 Not Found) */}
        <Route path="*" element={<PageNotFound />} />
        {/* Additional route for handling unknown product paths */}
        <Route path="/product/*" element={<PageNotFound />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);

