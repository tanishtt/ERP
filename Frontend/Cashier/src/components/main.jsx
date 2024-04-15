import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [billNumber, setBillNumber] = useState(1);
  const [membership, setMembership] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState(10);
  const [includeShipping, setIncludeShipping] = useState(true);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const EmptyCart = () => (
    <div className="container2" style={{ marginRight: "10px", width: "1200px" }}>
      <div className="rows">
        <div className="col-md-12 py-5 text-center">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png" alt="Empty Cart" style={{ width: "100px", height: "100px" }} />
          <h5 className="p-3 display-5" style={{ fontFamily: "Arial, sans-serif", fontSize: "24px" }}>Your Cart is Empty</h5>
        </div>
      </div>
    </div>
  );

  const addItem = (product) => {
    dispatch(addCart(product));
  };

  const removeItem = (product) => {
    dispatch(delCart(product));
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = includeShipping ? 30.0 : 0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    const calculateTotalAmount = () => {
      let discount = 0;
      if (discountType === "percentage") {
        discount = (subtotal * discountValue) / 100;
      } else {
        discount = discountValue;
      }
      return Math.round(subtotal + shipping - discount);
    };

    const calculateDiscountAmount = () => {
      let discount = 0;
      if (discountType === "percentage") {
        discount = (subtotal * discountValue) / 100;
      } else {
        discount = discountValue;
      }
      return discount.toFixed(2);
    };

    const handleDiscountChange = (e) => {
      const newDiscountAmount = parseFloat(e.target.value);
      const newDiscountType = newDiscountAmount > 0 ? "amount" : "percentage";
      setDiscountValue(newDiscountAmount);
      setDiscountType(newDiscountType);
    };

    const handleCheckout = () => {
      const cartItems = state.map((item) => ({
        product_id: item.product_id,
        quantity: item.qty,
        price: item.price,
      }));

      const data = {
        customer: {
          name,
          email,
          phone: number,
        },
        products: cartItems,
        price: calculateTotalAmount().toFixed(2),
        discount_price: calculateDiscountAmount(),
        
      };

      fetch("http://localhost:3000/cashier/handleOrderSubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigate("/checkout");
        })
        .catch((error) => console.error("Error:", error));
    };

    return (
      <div className="container">
        
      <div className="boxes">
          <div className="container2" style={{ width: "900px" }}>
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8" style={{ width: "1500px" }}>
                <div className="card-body" style={{ overflowY: "scroll", maxHeight: "310px" }}>
                  <table className="table" style={{ border: "1px" }}>
                    <thead className="sticky-top">
                      <tr>
                        <th className="text-center">ITEM</th>
                        <th className="text-center">PRICE</th>
                        <th className="text-center">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.map((item) => (
                        <tr key={item.product_id}>
                          <td className="text-center" style={{ marginTop: "40px", width: "450px" }}>
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
        

        <div className="boxes2" style={{ width: "650px", marginLeft: "10px" }}>
          <div className="card mb-5" style={{ width: "400px" }}>
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
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label className="mr-3" style={{ marginBottom: "0", display: "flex", alignItems: "center" }}>
                      <input
                        type="radio"
                        value="yes"
                        checked={includeShipping}
                        onChange={() => setIncludeShipping(true)}
                        style={{ marginRight: "5px" }}
                      />
                      <span>Yes</span>
                    </label>
                    <label style={{ marginBottom: "0", display: "flex", alignItems: "center" }}>
                      <input
                        type="radio"
                        value="no"
                        checked={!includeShipping}
                        onChange={() => setIncludeShipping(false)}
                        style={{ marginRight: "5px" }}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Shipping<span>₹{shipping}</span>
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
                      onChange={handleDiscountChange}
                    />
                  </div>
                </li>


                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Discount Price:
                  <input
                    type="number"
                    style={{ backgroundColor: "#dedddd", width: "70px", textAlign: "center", width: "100px", borderRadius: "5px" }}
                    value={calculateDiscountAmount()}
                    onChange={handleDiscountChange}
                  />
                </li>


                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <strong style={{ fontSize: "30px", marginLeft: "50px", borderRadius: "5px" }}>Total amount: </strong>
                  <div style={{ backgroundColor: "#e8e8e8", padding: "10px", border: "1px solid #cbcbcb", borderRadius: "5px" }}>
                    <strong><span style={{ fontSize: "40px", color: "red" }}>₹{calculateTotalAmount()}</span></strong>
                  </div>
                </li>

              </ul>
              <button
                className="btn btn-dark btn-lg btn-block"
                style={{
                  backgroundColor: "#25A541",
                  border: "none",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
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

    <div>

      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', boxSizing: 'border-box', marginLeft: '30px', marginRight: '30px', marginTop: '30px' }}>

        <div className="boxes d-flex justify-content-between">
          {/* {BOX 1} */}
          <div className="box1" style={{ width: "400px", marginLeft: '40px' }}>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <label htmlFor="name">Name:</label>
              </div>
              <div style={{ width: "348px", paddingLeft: "50px" }}>
                <input type="text" className="form-control" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <label htmlFor="number">Number:</label>
              </div>
              <div style={{ paddingLeft: "34px", width: "330px" }}>
                <input type="tel" className="form-control" id="number" placeholder="Enter contact number" value={number} onChange={(e) => setNumber(e.target.value)} />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <label htmlFor="email">Email:</label>
              </div>
              <div style={{ paddingLeft: "55px", width: "350px" }}>
                <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>



          </div>

          {/* {BOX 2} */}
          <div className="box2" style={{ width: '400px', paddingLeft: '20px' }}>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <label htmlFor="billNumber">Bill Number:</label>
              </div>
              <div style={{width: "270px" }}>
                <input type="text" className="form-control" id="billNumber" value={billNumber} onChange={(e) => setBillNumber(e.target.value)} />
              </div>

            </div>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <label htmlFor="address">Address:</label>
              </div>
              <div style={{ paddingLeft: "22px", width: "350px", paddingLeft: "50px" }}>
                <textarea className="form-control" id="address" rows="3" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
              </div>
            </div>



          </div>

          {/* {BOX 3} */}
          <div className="box3" style={{ marginRight: '20px', width: "350px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <label htmlFor="membership">Date:</label>
              </div>
              <div style={{ paddingLeft: "58px", width: "250px", alignItems: "center" }}>
                <input type="date" className="form-control" id="membership" value={getCurrentDate()} readOnly/>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <label htmlFor="membership">Membership:</label>
              </div>
              <div style={{ paddingLeft: "25px", width: "220px" }}>
                <select className="form-control" id="membership" value={membership} onChange={(e) => setMembership(e.target.value)}>
                  <option value="bronze">Bronze</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                </select>
              </div>
            </div>


            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <label htmlFor="cashier">Cashier:</label>
              </div>
              <div style={{ paddingLeft: '60px', width: '255px' }}>
                <select className="form-control" id="number">
                  <option value="option1">Cashier 1</option>
                  <option value="option2">Cashier 2</option>
                  <option value="option3">Cashier 3</option>
                </select>
              </div>
            </div>


            {/* <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <div>
                <label htmlFor="totalAmount" style={{ marginLeft: '10px' }}>Amount:</label>
              </div>
              <div style={{ width: '250px', height: '100px' }}>
                <input
                  type="text"
                  className="form-control"
                  id="totalAmount"
                  placeholder="Amount"
                  value={₹${subtotal.toFixed(2)}}
                  style={{ fontSize: '56px', textAlign: 'center', fontWeight: 'bold' }}
                  readOnly
                />
              </div>
            </div> */}

          </div>
        </div>





      </div>
      <div style={{ padding: '20px', boxSizing: 'border-box' }}>
        <div className="showcart" style={{ width: '100px', marginLeft: '40px' }}>
          {state.length > 0 ? <ShowCart style={{ width: '100%' }} /> : <EmptyCart style={{ width: '100%' }} />}
        </div>
      </div>
    </div>











  );
};

export default Cart;