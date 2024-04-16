import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

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
    // Calculate discount amount based on discount type and value
    const calculateDiscountAmount = () => {
      let discount = 0;
      if (discountType === 'percentage') {
        discount = (subtotal * discountValue) / 100;
      } else {
        discount = discountValue;
      }
      return discount.toFixed(2); // Round off to 2 decimals
    };

    // Update discount value state with calculated discount amount
    const handleDiscountChange = (e) => {
      const newDiscountAmount = parseFloat(e.target.value);
      const newDiscountType = newDiscountAmount > 0 ? 'amount' : 'percentage';
      setDiscountValue(newDiscountAmount);
      setDiscountType(newDiscountType);
    };

    const handleCheckout = () => {
      const cartItems = state.map(item => ({
        id: item.id,
        qty: item.qty,
        price: item.price
      }));

      fetch('http://localhost:3031/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItems)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          navigate('/checkout'); // Navigate to /checkout page after successful checkout
        })
        .catch(error => console.error('Error:', error));
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
                        <th className="text-center">ITEM</th>
                        <th className="text-center">PRICE</th>
                        <th className="text-center">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.map((item) => (
                        <tr key={item.id}>
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


        <div className="boxes2" style={{ width: '400px' }}>
          <div className="card mb-5">
            <div className="card-header py-3 bg-light">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products ({totalItems})<span>₹{Math.round(subtotal)}</span>
                </li>

                <div className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <span>Include Shipping:</span>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label className="mr-3" style={{ marginBottom: '0', display: 'flex', alignItems: 'center' }}>
                      <input
                        type="radio"
                        value="yes"
                        checked={includeShipping}
                        onChange={() => setIncludeShipping(true)}
                        style={{ marginRight: '5px' }}
                      />
                      <span>Yes</span>
                    </label>
                    <label style={{ marginBottom: '0', display: 'flex', alignItems: 'center' }}>
                      <input
                        type="radio"
                        value="no"
                        checked={!includeShipping}
                        onChange={() => setIncludeShipping(false)}
                        style={{ marginRight: '5px' }}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>




                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Shipping
                  <span>₹{shipping}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <span>Discount Type:</span>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value)}
                      style={{ marginRight: '5px', padding: '5px', borderRadius: '5px' }}
                    >
                      <option value="percentage">Percentage</option>
                      <option value="amount">Amount</option>
                    </select>
                    <input
                      type="number"
                      style={{ backgroundColor: '#dedddd', width: '70px', textAlign: 'center', padding: '5px', margin: '0', borderRadius: '5px' }}
                      value={discountValue}
                      onChange={(e) => setDiscountValue(parseFloat(e.target.value))}
                    />
                  </div>
                </li>


                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Discount Price:
                  <input
                    type="number"
                    style={{ backgroundColor: '#dedddd', width: '70px', textAlign: 'center', width: '100px', borderRadius: '5px' }}
                    value={calculateDiscountAmount()}
                    onChange={handleDiscountChange}
                  />
                </li>



                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <strong style={{ fontSize: "30px", marginLeft: '50px', borderRadius: '5px' }}>Total amount: </strong>
                  <div style={{ backgroundColor: '#e8e8e8', padding: '10px', border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                    <strong><span style={{ fontSize: '40px', color: 'red' }}>₹{calculateTotalAmount()}</span></strong>
                  </div>

                </li>
              </ul>
              <button
                className="btn btn-dark btn-lg btn-block"
                style={{
                  backgroundColor: '#25A541',
                  border: 'none',
                  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                }}
                onClick={handleCheckout}
              >
                Go to checkout
              </button>
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
