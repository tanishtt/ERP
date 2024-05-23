import React from "react";
import { useDispatch } from "react-redux"; // Importing useDispatch from react-redux for dispatching actions
import { addCart } from "../redux/action"; // Importing the addCart action from the redux actions
import { Link } from "react-router-dom"; // Importing Link from react-router-dom for navigation
import socketIOClient from 'socket.io-client'; // Importing socket.io-client for real-time communication

import "./SearchResult.css"; // Importing CSS for styling the search result component

// Defining the SearchResult component
export const SearchResult = ({ result, addProduct }) => {
  const socket = socketIOClient('http://localhost:3000'); // Initializing socket.io client
  const dispatch = useDispatch(); // Getting the dispatch function from react-redux

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    dispatch(addCart(result)); // Dispatching the addCart action with the result (product) as payload
    socket.emit('cashier:AddProduct', result); // Emitting an event to the server with the product data
  };

  // Function to handle adding the product to another list (or performing another action)
  const handleAddToProduct = () => {
    if (typeof addProduct === 'function') { // Checking if addProduct is a function
      addProduct(result); // Calling the addProduct function with the result (product) as argument
      alert(result); // Displaying an alert with the product data (for debugging purposes)
      socket.emit('cashier:AddProduct', result); // Emitting an event to the server with the product data
    } else {
      console.log('else'); // Logging a message if addProduct is not a function (for debugging purposes)
    }
  };

  return (
    <div className="search-result" onClick={handleAddToCart} style={{ width: '100px' }}>
      <div id={result.product_id} className="col-md-4 col-sm-6 col-xs-8 col-12" style={{ width: '100', marginLeft: '400px' }}>
        <div className="card text-center h-100" style={{ width: 'max-content' }}>
          <div className="card-body d-flex align-items-center justify-content-between" style={{ padding: '0%' }}>
            <div style={{ width: '240px' }}>
              <h5 className="card-title mb-0" style={{ fontSize: '16px' }}>
                {result.product_name.substring(0, 32)}... {/* Displaying the product name (truncated to 32 characters) */}
              </h5>
            </div>
            <ul className="list-group list-group-flush" style={{ width: '100px' }}>
              <li className="list-group-item lead" style={{ fontSize: '16px' }}>₹ {result.price}</li> {/* Displaying the product price */}
            </ul>
            <div className="card-body" style={{ width: '16vw', height: '4vw', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1px !important' }}>
              <button
                className="btn btn-dark"
                onClick={handleAddToProduct} // Handling the add to product action on button click
                style={{
                  width: '110px',
                  height: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '14px', // Adjust the font size as desired
                  backgroundColor: '#25A541',
                  border: 'none',
                  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)'
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
