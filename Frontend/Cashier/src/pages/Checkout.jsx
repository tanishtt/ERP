import React, { useState } from 'react';
import { Footer, Navbar } from "../components"; // Importing Footer and Navbar components
import { useSelector } from "react-redux"; // Importing useSelector from react-redux to access Redux state
import { Link } from "react-router-dom"; // Importing Link for navigation
import { NavLink } from "react-router-dom"; // Importing NavLink for navigation


const Checkout = () => {
  const state = useSelector((state) => state.handleCart); // Accessing the cart state from Redux store
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is logged in

  // Component to display when the cart is empty
  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
            {isLoggedIn ? (
              <div className="buttons text-center" style={{ borderColor: 'white', color: 'white' }}>
                <NavLink to="/cart" className="btn btn-outline-dark m-2" style={{ borderColor: 'white', color: 'white' }}>
                  <i className="fa fa-cart-shopping mr-1" ></i> Checkout ({state.length})
                </NavLink>
              </div>
            ) : (

              <p className="text-danger">Please login to continue</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Component to display the checkout process
  const ShowCheckout = () => {
    let discount = 0.1;
    const [discountType, setDiscountType] = useState('percentage'); // State to track the discount type
    const [discountValue, setDiscountValue] = useState(10); // State to track the discount value
    const [includeShipping, setIncludeShipping] = useState(true); // State to track if shipping is included
    const [paymentMethod, setPaymentMethod] = useState('card'); // State to track the selected payment method
    const [cashGiven, setCashGiven] = useState(""); // State to track the cash given for cash payments
    const [taxRate, setTaxRate] = useState(0.1); // State to track the tax rate


    let subtotal = 0;
    let shipping = includeShipping ? 30.0 : 0; // Calculate shipping based on user selection
    let totalItems = 0;

    // Calculate subtotal and total items
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });

    // Function to calculate the total amount
    const calculateTotalAmount = () => {
      let discount = 0;
      if (discountType === 'percentage') {
        discount = (subtotal * discountValue) / 100;
      } else {
        discount = discountValue;
      }
      let tax = subtotal * taxRate;
      return Math.round((subtotal + shipping + tax) - discount);

    };

    // Function to calculate the discount amount
    const calculateDiscountAmount = () => {
      let discount = 0;
      if (discountType === "percentage") {
        discount = (subtotal * discountValue) / 100;
      } else {
        discount = discountValue;
      }
      return discount.toFixed(2);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
      // Logic to handle form submission based on paymentMethod
      // You can perform different actions based on the selected payment method
    };

    return (
      <div >

        <div className="row my-4">
          <div className="card mb-4" style={{ width: '800px' }}>
            <div className="card-header py-3">
              <strong><h4 className="mb-0">Payment</h4></strong>

            </div>
            <div className="card-body">
              <form className="needs-validation" onSubmit={handleSubmit} noValidate>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className="form-check" style={{ marginRight: '30px', marginLeft: '30px', marginBottom: '30px' }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="card"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <strong><label className="form-check-label" htmlFor="card">
                      Credit/Debit Card
                    </label>
                    </strong>
                  </div>

                  <div className="form-check" style={{ marginRight: '30px' }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="gpay"
                      value="gpay"
                      checked={paymentMethod === 'gpay'}
                      onChange={() => setPaymentMethod('gpay')}
                    />
                    <strong><label className="form-check-label" htmlFor="gpay">
                      Google Pay
                    </label></strong>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="cash"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                    />
                    <strong><label className="form-check-label" htmlFor="cash">
                      Cash
                    </label></strong>
                  </div>
                </div>



                {/* Payment method specific fields */}
                {paymentMethod === 'card' && (
                  <div style={{ border: '1px solid #cbcbcb', height: '200px' }}>

                    <form className="needs-validation" noValidate>

                      <div className="row gy-3">
                        <div className="col-md-6">
                          <label htmlFor="cc-name" className="form-label" style={{ paddingLeft: '25px', marginTop: '10px' }}>
                            Name on card
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="cc-name"
                            placeholder="CARDHOLDER NAME"
                            required
                            style={{ height: '50px' }}
                          />
                          <div className="invalid-feedback">
                            Name on card is required
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="cc-expiration" className="form-label" style={{ paddingLeft: '25px', marginTop: '10px' }}>
                            Expiration
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="cc-expiration"
                            placeholder="MM/YY"
                            required
                            style={{ height: '50px', width: '310px' }}
                          />
                          <div className="invalid-feedback">
                            Expiration date required
                          </div>
                        </div>
                      </div>

                      <div className="row gy-3">
                        <div className="col-md-6">
                          <label htmlFor="cc-number" className="form-label" style={{ paddingLeft: '25px', marginTop: '15px' }}>
                            Credit card number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="cc-number"
                            placeholder="CARD NUMBER"
                            required
                            style={{ height: '50px' }}
                          />
                          <div className="invalid-feedback">
                            Credit card number is required
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="cc-cvv" className="form-label" style={{ paddingLeft: '25px', marginTop: '15px' }}>
                            CVV
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="cc-cvv"
                            placeholder="CVV"
                            required
                            style={{ height: '50px', width: '310px' }}
                          />
                          <div className="invalid-feedback">
                            Security code required
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>


                )}

                {paymentMethod === 'gpay' && (
                  <div>
                    {/* Google Pay specific fields */}
                    {/* Show scanner image or related content */}
                    <img src="gpay_scanner_image.png" alt="Google Pay Scanner" />
                  </div>
                )}


                {paymentMethod === 'cash' && (
                  <div style={{ border: '1px solid #cbcbcb', height: '250px' }}>

                    {/* Cash payment fields */}
                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label htmlFor="cash-given" className="form-label" style={{ paddingLeft: '220px', fontSize: '24px', marginTop: '20px' }}>
                          Cash Given
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cash-given"
                          placeholder=""
                          value={cashGiven}
                          onChange={(e) => setCashGiven(e.target.value)} // Update cashGiven when the input changes
                          required
                          style={{ width: '150px', marginLeft: '200px', fontSize: '44px' }}
                        />
                        <div className="invalid-feedback">
                          Cash given amount is required
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="amount-to-return" className="form-label" style={{ paddingLeft: '20px', fontSize: '24px', marginTop: '20px' }}>
                          Amount to Return
                        </label>
                        <strong>
                          <input
                            type="text"
                            className="form-control"
                            id="amount-to-return"
                            placeholder=""
                            value={(parseFloat(cashGiven) || 0) - calculateTotalAmount()}
                            readOnly // Make this field read-only since it's automatically calculated
                            style={{ width: '150px', fontSize: '44px' }}
                          /></strong>
                        <div className="invalid-feedback">
                          Amount to return is required
                        </div>
                      </div>
                    </div>
                  </div>


                )}

                {/* Button to continue */}
                <button
                  className="w-100 btn btn-primary"
                  type="submit"
                  disabled={!paymentMethod} // Disable button if paymentMethod is not selected
                  style={{ marginTop: '6vw' }}
                >
                  Continue to checkout
                </button>
              </form>
            </div>
          </div>




          <div className="boxes2" style={{ width: '500px' }}>
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


                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>₹{shipping}</span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    <span>Discount Type:</span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <select
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value)}
                        style={{ marginRight: "5px", padding: "5px", borderRadius: "5px" }}
                      >
                        <option value="percentage">Percentage</option>
                        <option value="amount">Amount</option>
                      </select>
                      <input
                        type="number"
                        style={{ backgroundColor: "#dedddd", width: "70px", textAlign: "center", padding: "5px", margin: "0", borderRadius: "5px" }}
                        value={discountValue}

                      />
                    </div>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Discount Price:
                    <input
                      type="number"
                      style={{ backgroundColor: "#dedddd", width: "70px", textAlign: "center", width: "100px", borderRadius: "5px" }}
                      value={calculateDiscountAmount()}
                    />
                  </li>




                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    <strong style={{ fontSize: "30px", marginLeft: "50px", borderRadius: "5px" }}>Total amount: </strong>
                    <div style={{ backgroundColor: "#e8e8e8", padding: "10px", border: "1px solid #cbcbcb", borderRadius: "5px" }}>
                      <strong><span style={{ fontSize: "40px", color: "red" }}>₹{calculateTotalAmount()}</span></strong>
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
      </div>

    );
  };
  return (
    <>
      <Navbar /> {/* Navbar component */}
      <div className="container">
        {state.length ? <ShowCheckout /> : <EmptyCart />} {/* Conditionally render the checkout or empty cart */}
      </div>
      <Footer /> {/* Footer component */}
    </>
  );
};

export default Checkout;
