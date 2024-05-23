import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton"; // Import Skeleton for loading placeholder
import { Link, useParams } from "react-router-dom"; // Import Link and useParams from react-router-dom
import Marquee from "react-fast-marquee"; // Import Marquee for scrolling similar products
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import { addCart } from "../redux/action"; // Import the addCart action

import { Footer, Navbar } from "../components"; // Import Footer and Navbar components

const Product = () => {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const [product, setProduct] = useState([]); // State to hold the product details
  const [similarProducts, setSimilarProducts] = useState([]); // State to hold similar products
  const [loading, setLoading] = useState(false); // State to handle loading state for the product
  const [loading2, setLoading2] = useState(false); // State to handle loading state for similar products

  const dispatch = useDispatch(); // Initialize dispatch

  const addProduct = (product) => {
    dispatch(addCart(product)); // Dispatch addCart action with the product
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true); // Set loading state for the product
      setLoading2(true); // Set loading state for similar products
      console.log(id, typeof(id));
      const product_id = Number(id);
      // Fetch the product details by ID
      const response = await fetch(`http://localhost:3000/cashier/get-product-by-id/${id}`);
      const data = await response.json();
      console.log(data);
      setProduct(data); // Set the fetched product details
      setLoading(false); // Disable loading state for the product

      // Fetch similar products by category ID
      const response2 = await fetch(
        `http://localhost:3000/cashier/get-category-by-id/${data.category_id}`
      );
      const data2 = await response2.json();
      console.log(data2);
      setSimilarProducts(data2); // Set the fetched similar products
      setLoading2(false); // Disable loading state for similar products
    };
    getProduct();
  }, [id]);

  // Loading component to show skeleton placeholders
  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  // Component to show the product details
  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3" style={{marginTop:'10vw'}}>
              <img
                className="img-fluid"
                src={product.photos}
                alt={product.product_name}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5" style={{marginTop:'10vw'}}>
              <h4 className="text-uppercase text-muted">{product.category}</h4>
              <h1 className="display-5">{product.product_name}</h1>
              <p className="lead">
                {product.rating && product.rating.rate}{" "}
                <i className="fa fa-star"></i>
              </p>
              <h3 className="display-6  my-4">₹{product.price}</h3>
              <p className="lead">{product.description}</p>
              <button
                className="btn btn-outline-dark"
                onClick={() => addProduct(product)}
              >
                Add to Cart
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Loading component to show skeleton placeholders for similar products
  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  // Component to show similar products
  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => {
              return (
                <div key={item.product_id} className="card mx-4 text-center">
                  <img
                    className="card-img-top p-3"
                    src={item.photos}
                    alt="Card"
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.product_name.substring(0, 15)}...
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">₹{product.price}</li>
                  </ul>
                  <div className="card-body">
                    <Link
                      to={"/product/" + item.product_id}
                      className="btn btn-dark m-1"
                    >
                      Buy Now
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => addProduct(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  // Main component return statement
  return (
    <>
      <Navbar /> {/* Render Navbar component */}
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">You may also Like</h2>
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={50}
            >
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer /> {/* Render Footer component */}
    </>
  );
};

export default Product; // Export the Product component
