import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { SearchResultsList } from './SearchResultsList';
import './App.css';

const Navbar = () => {
  const [results, setResults] = useState([]);
 
  

  

  // Function to get current date in the format YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  return (
    <div>
      <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100 }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-1 sticky-top container-fluid" >
          <div className="container">
            <NavLink className="navbar-brand fw-bold fs-4 px-2" style={{ color: 'white' }} to="/"> Billing Software</NavLink>
            <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav m-auto my-2 text-center">
                <li className="nav-item">
                  <NavLink className="nav-link" style={{ color: 'white' }} to="/Home">Home </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" style={{ color: 'white' }} to="/product">Products</NavLink>
                </li>
              </ul>
              {/* <div className="buttons text-center" style={{ borderColor: 'white', color: 'white' }}>
                <NavLink to="/cart" className="btn btn-outline-dark m-2" style={{ borderColor: 'white', color: 'white' }}>
                  <i className="fa fa-cart-shopping mr-1" ></i> Checkout ({state.length})
                </NavLink>
              </div> */}
              
              <div className="buttons text-center" style={{ borderColor: 'white', color: 'white' }}>
                <NavLink to="/Login" className="btn btn-outline-dark m-2" style={{ borderColor: 'white', color: 'white' }}>
                  <i className="fa fa-cart-shopping mr-1" ></i> Login
                </NavLink>
              </div>

            </div>
          </div>
        </nav>
      </div>

      
      <div className="hero border-2">
        {/* SearchBar component */}
        <div className="search-bar" style={{ width: '50%', marginLeft: '300px', marginTop:'100px' }}>
          <div className="input-group">
            <SearchBar setResults={setResults} />
          </div>
          <button className="search-bar button">Voice</button>
        </div>
      </div>      
      {/* Display search results using SearchResultsList */}
      {results && results.length > 0 && <SearchResultsList results={results} />}
      
    </div>
  );
}

export default Navbar;
