// Explanation:
// Imports: The necessary modules and components are imported, including React, Redux hooks (useSelector, useDispatch), action creators (addCart, delCart), Link from React Router, CSS files, and Socket.IO client.

// Socket Connection: The socket variable is initialized to connect to the WebSocket server at http://localhost:3000.

// Component State and Dispatch:

// state holds the cart state from the Redux store.
// dispatch is used to dispatch actions to the Redux store.
// socket state is managed locally within the component to handle the WebSocket connection.
// useEffect Hooks:

// The first useEffect establishes a socket connection when the component mounts and cleans it up when the component unmounts.
// The second useEffect sets up event listeners for customer:productAdded and customer:productRemoved to update the cart state via Redux actions. It also cleans up these listeners when the component unmounts or the socket changes.
// EmptyCart Component: Renders a message and image when the cart is empty.

// addItem and removeItem Functions: Dispatch actions to add or remove items from the cart and emit corresponding events to the server via the socket.

// ShowCart Component: Calculates the subtotal and total items, and renders a table with the cart items, including buttons to add or remove items.

// Main Render: Depending on whether the cart is empty or not, it renders either the ShowCart component or the EmptyCart component.

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import './App.css'; // Import custom CSS

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import io from 'socket.io-client'; // Import Socket.IO client

const socket = io("http://localhost:3000"); // Connect to your server's WebSocket endpoint

const Cart = () => {
  // Get the state and dispatch function from the Redux store
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  // useState hook to manage the socket connection
  const [socket, setSocket] = useState(null);

  // useEffect hook to establish the socket connection when the component mounts
  useEffect(() => {
    const socket = io('http://localhost:3000');
    setSocket(socket);

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // useEffect hook to handle socket events
  useEffect(() => {
    if (socket) {
      socket.on('customer:productAdded', (product) => {
        dispatch(addCart(product));
      });
      socket.on('customer:productRemoved', (product) => {
        dispatch(delCart(product));
      });
    }

    // Cleanup the socket event listeners when the component unmounts or socket changes
    return () => {
      if (socket) {
        socket.off('customer:productAdded');
        socket.off('customer:productRemoved');
      }
    };
  }, [socket, dispatch]);

  // Function to render when the cart is empty
  const EmptyCart = () => {
    return (
      <div className="containers" style={{ marginLeft: '100px', width:'1100px', marginTop:'180px' }}>
        <div className="rows">
          <div className="col-md-12 py-5 text-center">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png" alt="Empty Cart" style={{ width: '200px', height: '200px' }} />
            <h5 className="p-3 display-5" style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px' }}>Your Cart is Empty</h5>
          </div>
        </div>
      </div>
    );
  };

  // Function to add an item to the cart
  const addItem = (product) => {
    dispatch(addCart(product));
    socket.emit("customer:addItem", product); // Emit addItem event
  };

  // Function to remove an item from the cart
  const removeItem = (product) => {
    dispatch(delCart(product));
    socket.emit("customer:removeItem", product); // Emit removeItem event
  };

  // Function to render the cart with items
  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    // Calculate the subtotal and total items
    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <>
        <div className="boxes">
          <div className="container2" style={{ width: "800px", marginTop: '150px', marginLeft: '250px' }}>
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8" style={{ width: "1200px" }}>
                <div className="card-body" style={{ overflowY: "scroll", maxHeight: "310px" }}>
                  <table className="table" style={{ border: "1px" }}>
                    <thead className="sticky-top">
                      <tr>
                        <th className="text-center" style={{paddingLeft:'50px'}}>PHOTO</th>
                        <th className="text-center">ITEM</th>
                        <th className="text-center">PRICE</th>
                        <th className="text-center">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.map((item) => (
                        <tr key={item.product_id}>
                          <td className="text-center" style={{ marginTop: "40px", width: "40px", paddingLeft:'50px' }}>
                            <div className="bg-image rounded" data-mdb-ripple-color="light">
                              <img src={item.photos} alt={item.product_name} width={70} height={55} />
                            </div>
                          </td>
                          <td className="text-center" style={{ marginTop: "40px", width: "300px" }}>
                            <p style={{ marginTop: "10px", fontSize: "14px" }}>{item.product_name}</p>
                          </td>
                          <td className="text-center" style={{ fontSize: "16px", paddingTop: "15px" }}>
                            ₹{item.price}
                          </td>
                          <td className="text-center">
                            <button className="btn px-3" onClick={() => removeItem(item)} style={{ fontSize: "25px", color: "black" }}>
                              -
                            </button>
                            <span className="mx-2">{item.qty}</span>
                            <button className="btn px-3" onClick={() => addItem(item)} style={{ fontSize: "24px" }}>
                              +
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
    </>
  );
};

export default Cart;
