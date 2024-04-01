import React, { useState, useEffect } from 'react';
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
  const [subtotal, setSubtotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [cashierId, setCashierId] = useState('');
  

  // Function to handle changes in the input field
  const handleInputChange = (event) => {
    setCashierId(event.target.value);
  };



  // Function to get current date in the format YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    let subtotalValue = 0;
    let totalItemsValue = 0;
    state.forEach((item) => {
      subtotalValue += item.price * item.qty;
      totalItemsValue += item.qty;
    });
    setSubtotal(subtotalValue);
    setTotalItems(totalItemsValue);
  }, [state]);

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
                  <NavLink className="nav-link" style={{ color: 'white' }} to="/">Home </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" style={{ color: 'white' }} to="/product">Products</NavLink>
                </li>
              </ul>
              <div className="buttons text-center" style={{ borderColor: 'white', color: 'white' }}>
                <NavLink to="/cart" className="btn btn-outline-dark m-2" style={{ borderColor: 'white', color: 'white' }}>
                  <i className="fa fa-cart-shopping mr-1" ></i> Checkout ({state.length})
                </NavLink>
              </div>
              
              <div className="buttons text-center" style={{ borderColor: 'white', color: 'white' }}>
                <NavLink to="/Login" className="btn btn-outline-dark m-2" style={{ borderColor: 'white', color: 'white' }}>
                  <i className="fa fa-cart-shopping mr-1" ></i> Login
                </NavLink>
              </div>

            </div>
          </div>
        </nav>
      </div>

      <form>
      <div className="hero border-2">
        
        <div className="container1">
          {/* {BOX 1} */}
          <div className="box1" style={{ width: "400px", marginLeft: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <label htmlFor="membership">Membership:</label>
              </div>
              <div style={{ width: '300px' }}>
                <input type="text" className="form-control" id="name" />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <label htmlFor="name">Name:</label>
              </div>
              <div style={{ width: '348px', paddingLeft: '50px' }}>
                <input type="text" className="form-control" id="name" placeholder="Enter name" />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <label htmlFor="number">Number:</label>
              </div>
              <div style={{ paddingLeft: '34px', width: '330px' }}>
                <input type="text" className="form-control" id="number" placeholder="Enter contact number" />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <label htmlFor="address">Address:</label>
              </div>
              <div style={{ width: '295px', marginLeft: '34px' }}>
                <input type="text" className="form-control" id="address" placeholder="Enter address" />
              </div>
            </div>
          </div>

          {/* {BOX 2} */}
          <div className="box2" style={{ width: '350px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <label htmlFor="invoiceNumber:">Invoice Number:</label>
              </div>
              <div style={{ width: '200px' }}>
                <input type="number" className="form-control" id="invoiceNumber" placeholder="Enter invoice number" min="1" defaultValue="1" />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <label htmlFor="billnumber">Bill Number:</label>
              </div>
              <div style={{ width: '228px', paddingLeft: '30px' }}>
                <input type="number" className="form-control" id="billNumber" placeholder="Enter bill number" min="1" defaultValue="1" />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <label htmlFor="cashier">Cashier:</label>
              </div>
              <div style={{ paddingLeft: '85px', width: '283px' }}>
                <select className="form-control" id="number">
                  <option value="option1">Cashier 1</option>
                  <option value="option2">Cashier 2</option>
                  <option value="option3">Cashier 3</option>
                </select>
              </div>
            </div>

          </div>


          {/* box 3 */}
          <div className="box3" style={{ marginRight: '20px', width: "450px" }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <label htmlFor="currentDate" style={{ marginLeft: '10px' }}>Date:</label>
              </div>
              <div style={{ width: '200px', paddingLeft: '60px' }}>
                <input type="text" className="form-control" id="currentDate" value={getCurrentDate()} readOnly />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <div>
                <label htmlFor="totalAmount" style={{ marginLeft: '10px' }}>Total Amount:</label>
              </div>
              <div style={{ width: '250px', height: '100px' }}>
                <input
                  type="text"
                  className="form-control"
                  id="totalAmount"
                  placeholder="Amount"
                  value={`₹${subtotal.toFixed(2)}`} // Round subtotal to 2 decimal places using toFixed(2)
                  style={{ fontSize: '56px', textAlign: 'center', fontWeight: 'bold' }}
                  readOnly
                />

              </div>
            </div>


          </div>

        </div>



        {/* SearchBar component */}
        <div className="search-bar" style={{ width: '50%', marginLeft: '300px' }}>
          <div className="input-group">
            <SearchBar setResults={setResults} />
          </div>
          <button className="search-bar button">Voice</button>
        </div>
      </div>
      </form>
      

      {/* Display search results using SearchResultsList */}
      {results && results.length > 0 && <SearchResultsList results={results} />}

    </div>
  );
}

export default Navbar;
