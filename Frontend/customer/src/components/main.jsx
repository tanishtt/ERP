import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import io from 'socket.io-client';

const socket = io("http://localhost:3000"); // Connect to your server's WebSocket endpoint

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    const socket = io('http://localhost:3000');
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('customer:productAdded', (product) => {
        dispatch(addCart(product));
      });
      socket.on('customer:productRemoved', (product) => {
        dispatch(delCart(product));
      });
    }

    return () => {
      if (socket) {
        socket.off('customer:productAdded');
      }
    };
  }, [socket, dispatch]);


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


  const addItem = (product) => {
    dispatch(addCart(product));
    socket.emit("customer:addItem", product); // Emit addItem event
  };

  const removeItem = (product) => {
    dispatch(delCart(product));
    socket.emit("customer:removeItem", product); // Emit removeItem event
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });
    return (
      <>
        <div className="boxes" >
          <div className="container2" style={{ width: "800px", marginTop: '150px' , marginLeft:'250px'}}>
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
                                <img
                                  src={item.photos}
                                  alt={item.product_name}
                                  width={70}
                                  height={55}
                                />
                 
                            </div>
                          </td>

                          <td className="text-center" style={{ marginTop: "40px", width: "300px" }}>
                            <p style={{ marginTop: "10px", fontSize: "14px" }}>{item.product_name}</p>
                          </td>
                          <td className="text-center" style={{ fontSize: "16px", paddingTop: "15px" }}>
                            ₹{item.price}
                          </td>
                          <td className="text-center">
                            <button
                              className="btn px-3"
                              onClick={() => removeItem(item)}
                              style={{ fontSize: "25px", color: "black" }}
                            >
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
