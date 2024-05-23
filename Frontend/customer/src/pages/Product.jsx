import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams(); // Extracting the id parameter from the URL
  const [product, setProduct] = useState([]); // State to hold the product data
  const [similarProducts, setSimilarProducts] = useState([]); // State to hold similar products
  const [loading, setLoading] = useState(false); // State to manage loading state of the product
  const [loading2, setLoading2] = useState(false); // State to manage loading state of similar products
  const dispatch = useDispatch(); // Redux dispatch function

  // Function to add a product to the cart
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  // Fetching product data and similar products data from the API
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true); // Set loading state to true
      setLoading2(true); // Set loading state for similar products to true
      const product_id = Number(id); // Convert id to number type
      const response = await fetch(`http://localhost:3000/customer/get-product-by-id/${id}`);
      const data = await response.json(); // Extract product data from response
      setProduct(data); // Update product state with fetched data
      setLoading(false); // Set loading state to false after data is fetched
      const response2 = await fetch(`http://localhost:3000/customer/get-category-by-id/${data.category_id}`);
      const data2 = await response2.json(); // Extract similar products data from response
      setSimilarProducts(data2); // Update similar products state with fetched data
      setLoading2(false); // Set loading state for similar products to false after data is fetched
    };
    getProduct(); // Call the getProduct function when the component mounts or id changes
  }, [id]);

  // Skeleton loading component for product
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

  // Component to display product details
  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={product.photos}
                alt={product.product_name}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5" style={{marginTop:'10vw'}}>
              <h4 className="text-uppercase text-muted">{product.category_id}</h4>
              <h1 className="display-5">{product.product_name}</h1>
              <h3 className="display-6  my-4">${product.price}</h3>
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

  // Skeleton loading component for similar products
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

  // Component to display similar products
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
                      {item.product_name}...
                    </h5>
                  </div>
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

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">You may also Like</h2>
            {/* Marquee to display similar products */}
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
      <Footer />
    </>
  );
};

export default Product;
