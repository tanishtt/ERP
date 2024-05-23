import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SearchBar } from './SearchBar';
import { SearchResultsList } from './SearchResultsList';
import './App.css';

const handleRoundButtonClick = () => {
  // Add your logic for the round button click here
  console.log('Round button clicked');
};

const Navbar = () => {
  const [results, setResults] = useState([]);
  const state = useSelector((state) => state.handleCart);

  return (
    <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100 }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-2 sticky-top container-fluid" >
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4 px-2" style={{ color: 'white' }} to="/"> Grocery Shopping</NavLink>
          <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto my-2 text-center">
              <li className="nav-item">
                <NavLink className="nav-link" style={{ color: 'white' }} to="/">Home </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={{ color: 'white' }} to="/product">Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={{ color: 'white' }} to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={{ color: 'white' }} to="/contact">Contact</NavLink>
              </li>
            </ul>
            <div className="buttons text-center" style={{ borderColor: 'white', color: 'white' }}>
              <NavLink to="/cart" className="btn btn-outline-dark m-2" style={{ borderColor: 'white', color: 'white' }}>
                <i className="fa fa-cart-shopping mr-1" ></i> Cart ({state.length})
              </NavLink>
            </div>
          </div>


        </div>
      </nav>

      <div className="hero border-2">
        <div className="contain" style={{ background: '#f1faea' }}>
          <div className="search-bar" style={{ width: '50%', marginLeft: '250px', marginTop:'10px' }}>
            <div className="input-group">
              <SearchBar setResults={setResults} />
            </div>
            <button className="search-bar button">Voice</button>
          </div>
        </div>
      </div>

      {/* Display search results using SearchResultsList */}
      {results && results.length > 0 && <SearchResultsList results={results} />}
    </div>
  );
}

export default Navbar;
