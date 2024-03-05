import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const styles = {
    btnCircle: {
      borderRadius: '50%',
      width: '40px', // Adjust the size as needed
      height: '40px', // Adjust the size as needed
      padding: '1px', // Adjust the padding as needed
      backgroundImage: 'url("/Users/shreeyapatil/React_E-Commerce/mic.jpg")',
      backgroundSize: 'cover',
    },
  };

const Navbar = () => {
    const state = useSelector(state => state.handleCart)
    return (
        <div className= 'container '>
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> Grocery Shopping</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}) </NavLink>
                    </div>
                </div>
            </div>
        </nav>
        <div className="hero border-2 pb-2">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/main.png.jpg"
            alt="Card"
            style={{ width: '100%', height: '100px', maxHeight: '100px' }}
          />

    <div className="card-img-overlay d-flex align-items-center">
      <div className="container">
      <h5 className="card-title fs-1 text fw-lighter">Search Your Items here</h5>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="input-group" style={{ width: '50%' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"  
            />
            <button
            className="btn btn-outline-secondary fs-1"
            style={styles.btnCircle}
            type="button"
          >
          </button>
          </div>
        
        </div>
      </div>
    </div>

        </div>
      </div>    
    </div>    
    )
}

export default Navbar

