import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Customer = () => {
  // Get the cart state from Redux
  const state = useSelector((state) => state.handleCart);
  // State variable for customer details
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Function to handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to handle continue to checkout
  const continueToCheckout = async (e) => {
    e.preventDefault(); // Prevent form submission and page reload

    const data = {
      customer: customerDetails,
      products: state.map((item) => ({
        product_id: item.product_id,
        quantity: item.qty,
        price: item.price,
      })),
    };

    try {
      const response = await fetch("http://localhost:3000/customer/orderSubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Checkout successful!", responseData);
        // Handle success, e.g., redirect to thank you page
      } else {
        throw new Error("Checkout failed");
      }
    } catch (error) {
      console.error("Error occurred during checkout:", error);
      // Handle error, e.g., show error message to user
    }
  };

  // Component for displaying an empty cart
  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // Component for displaying checkout form
  const ShowCheckout = () => {
    return (
      <div className="container py-5">
        <form onSubmit={continueToCheckout}> {/* Use onSubmit event handler */}
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={customerDetails.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={customerDetails.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={customerDetails.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button type="submit">Continue to checkout</button> {/* Change button type to submit */}
        </form>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Customer;
