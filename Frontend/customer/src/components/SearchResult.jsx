import React from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";

import "./SearchResult.css";

export const SearchResult = ({ result, addProduct }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addCart(result));
  };

  const handleAddToProduct = () => {
    if (typeof addProduct === 'function') {
      addProduct(result);
    }
  };

  return (
    <div className="container my-3 py-3">
      <div className="search-result" onClick={handleAddToCart}>
        <div id={result.product_id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <div className="card text-center h-100">
            <img
              className="card-img-top p-3"
              src={result.image}
              alt="Card"
              height={300}
            />
            <div className="card-body">
              <h5 className="card-title">
                {result.product_name.substring(0, 12)}...
              </h5>
              <p className="card-text">
                {result.description.substring(0, 90)}...
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item lead">$ {result.price}</li>
            </ul>
            <div className="card-body">
              <Link to={"/product/" + result.product_id} className="btn btn-dark m-1">
                Buy Now
              </Link>
              <button
                className="btn btn-dark m-1"
                onClick={handleAddToProduct}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
