import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';

import { SearchBar } from './SearchBar';
import { SearchResultsList } from './SearchResultsList';

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);


  const EmptyCart = () => {
    return (
      <div className="container2" style={{ marginLeft: '10px', marginRight: '10px', width: '2000px' }}>
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
  };
  const removeItem = (product) => {
    dispatch(delCart(product));
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
      <div className="boxes">
        <div className="container2" style={{ width: '1300px' , }}>
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8" style={{ width: '1500px' }}>    
                <div className="card-body" style={{ overflowY: 'scroll', maxHeight: '310px' }}>
                  <table className="table">
                    <thead className="sticky-top">
                      <tr>
                        <th className="text-center">IMG</th>
                        <th className="text-center">ITEM</th>
                        <th className="text-center">PRICE</th>
                        <th className="text-center">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.map((item) => (
                        <tr key={item.id}>
                          <td className="text-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              width={40}
                              height={25}
                            />
                          </td>
                          <td className="text-center" style={{marginTop:'40px', width:'600px'}}>
                            <p style={{marginTop:'10px',fontSize:'16px', font: 'sans-serif'}}>{item.title}</p>
                          </td>

                          <td className="text-center" style={{fontSize:'16px', paddingTop:'15px'}}>
                          ₹{item.price}
                          </td>

                          <td className="text-center">
                            <button
                              className="btn px-3"
                              onClick={() => removeItem(item)}
                              style={{ fontSize: '25px', color: 'black' }}
                            >
                              -
                            </button>
                            <span className="mx-2">{item.qty}</span>
                            <button
                              className="btn px-3"
                              onClick={() => addItem(item)}
                              style={{ fontSize: '24px' }}
                            >
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
    );
  };

  return (
    <>
      <div className="container my-2 py-3">

        {/* <h1 className="text-center" style={{fontFamily: 'Arial, sans-serif', fontSize: '30px' }}>Cart</h1>
        <hr /> */}
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}


      </div>
    </>
  );

};

export default Cart;
