import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";

// Define the Products component
export const Products = () => {
  // State variables to hold product data, filtered data, and loading status
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true; // Flag to check if component is mounted

  const dispatch = useDispatch(); // Get the dispatch function from redux

  // Function to dispatch an action to add a product to the cart
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  // useEffect hook to fetch products from the API when the component mounts
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true); // Set loading to true before fetching data
      const response = await fetch(`http://localhost:3000/cashier/get-products`);
      if (componentMounted) {
        setData(await response.clone().json()); // Set the data state with the response
        setFilter(await response.json()); // Set the filter state with the response
        setLoading(false); // Set loading to false after data is fetched
      }

      // Cleanup function to set componentMounted to false
      return () => {
        componentMounted = false;
      };
    };

    getProducts(); // Call the function to fetch products
  }, []);

  // Component to display loading skeletons
  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
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
  };

  // Component to display the products
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
            <div id={product.product_id} key={product.product_id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4" style={{ width: '20%', margin: '5px' }}>
              <div className="card text-center h-100" key={product.product_id}>
                <img
                  className="card-img-top p-3"
                  src={product.photos}
                  alt="Card"
                  height={150}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.product_name}...
                  </h5>
                  <p className="card-text" style={{ fontSize: '10px' }}>
                    {product.description}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">₹ {product.price}</li>
                </ul>

                <div className="card-body" style={{ width: '17vw', height: '4vw', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px !important' }}>
                  <Link
                    to={"/product/" + product.product_id}
                    className="btn btn-dark m-1"
                    style={{
                      width: '95px',
                      height: '40px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '14px', // Adjust the font size as desired
                      backgroundColor: '#25A541',
                      border: 'none',
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
          );
        })}
      </>
    );
  };

  // Render the Products component
  return (
    <>
      <div className="cont">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center" style={{ marginTop: '50px' }}>Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
