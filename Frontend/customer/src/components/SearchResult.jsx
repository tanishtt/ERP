import React from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
import socketIOClient from 'socket.io-client';

import "./SearchResult.css";

export const SearchResult = ({ result, addProduct }) => {
  const socket = socketIOClient('http://localhost:3000');
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addCart(result));
    //alert('handleAddToCart');
    socket.emit('customer:AddProduct', result);

  };

  const handleAddToProduct = () => {
    if (typeof addProduct === 'function') {
      addProduct(result);
      alert(result)
      socket.emit('customer:AddProduct', result);
    }else{
      console.log('else');
    }
  };

  return (
    <div className="search-result" onClick={handleAddToCart} style={{width:'650px'}}>
      <div id={result.product_id} className="col-md-4 col-sm-6 col-xs-8 col-12" style={{ width: '90', height: '80px' }}>
          <div className="card-body d-flex align-items-center justify-content-between" style={{ padding: '0%' , width:'600px'}}>

            <div className="image" style={{ width: '90px' }}>
              <img
                className="card-img-top p-3"
                src={result.photos}
                alt="Card"
                style={{ height: "70px", width: "10px;" }}
              />
            </div>

            <div style={{ width: '200px', height: '50px' }}>
              <h5 className="card-title mb-0" style={{ fontSize: '16px', marginTop:'10px' }}>
                {result.product_name}
              </h5>
            </div>

            <ul className="list-group list-group-flush" style={{width:'100px'}}>
                  <li className="list-group-item lead" style={{fontSize:'18px'}}>₹ {result.price}</li>
                </ul>

                <div className="card-body" style={{ width: '16vw', height: '4vw', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1px !important' }}>
                  <Link
                    to={"/product/" + result.product_id}
                    className="btn btn-dark m-1"
                    style={{
                      width: '95px',
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
                    Buy Now
                  </Link>
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
    

  );
};
