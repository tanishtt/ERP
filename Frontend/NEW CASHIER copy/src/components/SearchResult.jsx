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
    
      <div className="search-result" onClick={handleAddToCart} style={{width:'100px'}}>
          <div id={result.id} className="col-md-4 col-sm-6 col-xs-8 col-12" style={{ width: '100', marginLeft: '400px' }}>
            <div className="card text-center h-100" style={{width:'max-content'}}>
              <div className="card-body d-flex align-items-center justify-content-between" style={{padding:'0%'}}>
                {/* <div className="image" style={{width:'110px'}}>
                <img
                  className="card-img-top p-3"
                  src={result.image}
                  alt="Card"
                  style={{height: "120px", width: "30px;"}}
                />
                </div> */}
                <div style={{width:'240px'}}>
                <h5 className="card-title mb-0" style={{fontSize:'16px'}}>
                  {result.title.substring(0, 32)}...
                </h5>
                </div>

                <ul className="list-group list-group-flush" style={{width:'100px'}}>
                  <li className="list-group-item lead" style={{fontSize:'16px'}}>₹ {result.price}</li>
                </ul>

                <div className="card-body" style={{ width: '16vw', height: '4vw', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1px !important' }}>
                  {/* <Link to={"/product/" + result.id} className="btn btn-dark m-1" style={{ width: "100px", height: "30px" }}>
                    Buy Now
                  </Link> */}
                  {/* <Link
                    to={"/product/" + result.id}
                    className="btn btn-dark m-1"
                    style={{
                      width: '95px',
                      height: '30px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '14px', // Adjust the font size as desired
                    }}
                  >
                    Buy Now
                  </Link> */}
                  <button
                    className="btn btn-dark"
                    onClick={handleAddToProduct}
                    style={{
                      width: '110px',
                      height: '30px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '14px', // Adjust the font size as desired
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
          </div>
        </div>
      
   
  );
};
