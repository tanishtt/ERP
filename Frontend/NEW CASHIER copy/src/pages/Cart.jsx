import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

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
    const [discountType, setDiscountType] = useState('percentage'); // Default discount type
    const [discountValue, setDiscountValue] = useState(10); // Default percentage discount
    const [includeShipping, setIncludeShipping] = useState(true); // Default to include shipping

    let subtotal = 0;
    let shipping = includeShipping ? 30.0 : 0; // Update shipping based on user selection
    let totalItems = 0;

    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });

    // Function to calculate total amount based on discount type and value
    const calculateTotalAmount = () => {
      let discount = 0;
      if (discountType === 'percentage') {
        discount = (subtotal * discountValue) / 100;
      } else {
        discount = discountValue;
      }
      return Math.round(subtotal + shipping - discount);
    };

    return (
      <div className="container">
        <div className="boxes">
          <div className="container2" style={{ width: '800px' }}>
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8" style={{ width: '1500px' }}>
                <div className="card-body" style={{ overflowY: 'scroll', maxHeight: '310px' }}>
                  <table className="table" style={{ border: '1px' }}>
                    <thead className="sticky-top">
                      <tr>
                        {/* <th className="text-center">IMG</th> */}
                        <th className="text-center">ITEM</th>
                        <th className="text-center">PRICE</th>
                        <th className="text-center">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.map((item) => (
                        <tr key={item.id}>
                          {/* <td className="text-center">
                          <img
                            src={item.image}
                            alt={item.title}
                            width={40}
                            height={25}
                          />
                        </td> */}
                          <td className="text-center" style={{ marginTop: '40px', width: '450px' }}>
                            <p style={{ marginTop: '10px', fontSize: '14px' }}>{item.title}</p>
                          </td>

                          <td className="text-center" style={{ fontSize: '16px', paddingTop: '15px' }}>
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










        <div className="boxes2" style={{ width: '400px', marginTop: '40px' }}>
          <div className="card mb-5">
            <div className="card-header py-3 bg-light">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products ({totalItems})<span>₹{Math.round(subtotal)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span>₹{shipping}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Discount Type:
                  <select value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
                    <option value="percentage">Percentage</option>
                    <option value="amount">Amount</option>
                  </select>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Discount Value:
                  <input type="number"
                    style={{ backgroundColor: '#dedddd', width: "70px", textAlign: 'center' }}
                    value={discountValue} onChange={(e) => setDiscountValue(parseFloat(e.target.value))} />
                </li>

                <div className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <span>Include Shipping:</span>
                  <div>
                    <label className="mr-3">
                      <input
                        type="radio"
                        value="yes"
                        checked={includeShipping}
                        onChange={() => setIncludeShipping(true)}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="no"
                        checked={!includeShipping}
                        onChange={() => setIncludeShipping(false)}
                      />
                      No
                    </label>
                  </div>
                </div>

                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <strong style={{ fontSize: "30px", marginLeft: '50px' }}>Total amount: </strong>
                  <div style={{ backgroundColor: '#e8e8e8', padding: '10px', border: '1px solid #cbcbcb' }}>
                    <strong><span style={{ fontSize: '40px', color: 'red' }}>₹{calculateTotalAmount()}</span></strong>
                  </div>

                </li>
              </ul>
              <Link
                to="/checkout"
                className="btn btn-dark btn-lg btn-block"
                style={{
                  backgroundColor: '#25A541',
                  border: 'none',
                  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                }}
              >
                Go to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
