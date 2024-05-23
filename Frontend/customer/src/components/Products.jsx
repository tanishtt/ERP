// Explanation:
// Imports: Import necessary modules, including React, Redux hooks, Skeleton for loading states, and Link from react-router-dom.

// State Variables:

// data: Holds the fetched product data.
// filter: Holds the filtered product data.
// loading: Indicates if the data is still being fetched.
// Redux Dispatch: Use useDispatch to get the dispatch function for adding products to the cart.

// addProduct Function: Dispatches the action to add a product to the cart.

// useEffect for Fetching Products:

// getProducts fetches the product data from the server.
// If the component is still mounted, it sets the data and filter states with the fetched data and sets loading to false.
// Loading Component: Displays skeletons to indicate loading state.

// filterProduct Function: Filters the products by category and updates the filter state.

// ShowProducts Component:

// Displays buttons to filter products by category.
// Maps over the filter state to display each product.
// Each product card includes an image, title, description, price, and buttons for "Buy Now" and "Add to Cart".
// Return Statement: Conditionally renders the Loading or ShowProducts component based on the loading state. The container and row classes help with layout and styling.

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

export const Products = () => {
  // State variables to hold product data, filtered data, and loading state
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  let componentMounted = true; // To keep track if the component is mounted

  const dispatch = useDispatch();

  // Function to handle adding product to cart
  const addProduct = (product) => {
    dispatch(addCart(product))
  }

  // useEffect to fetch products from the server when the component mounts
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:3000/customer/get-products");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  // Loading component to display skeletons while data is being fetched
  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        {/* Repeat skeleton components for more loading placeholders */}
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  // Function to filter products by category
  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  }

  // Component to display products
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>All</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("women's clothing")}>
            Women's Clothing
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("jewelery")}>Jewelery</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("electronics")}>Electronics</button>
        </div>

        {filter.map((product) => {
          return (
            <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4" style={{ width: '20%' }}>
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={product.photos}
                  alt="Card"
                  height={150}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title}
                  </h5>
                  <p className="card-text" style={{fontSize:'10px'}}>
                    {product.description}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">₹ {product.price}</li>
                </ul>

                <div className="card-body" style={{ width: '16vw', height: '4vw', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1px !important' }}>
                  <Link
                    to={"/product/" + product.id}
                    className="btn btn-dark m-1"
                    style={{
                      width: '95px',
                      height: '40px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '14px',
                      backgroundColor: '#25A541',
                      border: 'none' ,
                      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    Buy Now
                  </Link>

                  <button
                    className="btn btn-dark"
                    onClick={() => addProduct(product)}
                    style={{
                      width: '110px',
                      height: '40px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '14px',
                      backgroundColor: '#25A541',
                      border: 'none' ,
                      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
