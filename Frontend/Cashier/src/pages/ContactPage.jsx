import React from "react";
import { Footer, Navbar } from "../components";
import './App.css';

const ContactPage = () => {
  return (
    <div className="contact">
  <Navbar />
  <div className="container my-3 py-3">
    <h1 className="text-center" style={{ marginTop: '130px' }}>Contact Us</h1>
    <hr />
    <div className="contact-form-box p-4" style={{ height: '500px', width: '1000px' , marginLeft:'150px'}}>
      <div className="row my-4 h-100">
        <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
          <form>
            <div className="form my-3" style={{ width: '320px' }}>
              <label htmlFor="Name">Name</label>
              <input
                type="email"
                className="form-control center"
                id="Name"
                placeholder="Enter your name"
              />
            </div>
            <div className="form my-3" style={{ width: '320px' }}>
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                className="form-control center"
                id="Email"
                placeholder="name@example.com"
              />
            </div>
            <div className="form my-3" style={{ width: '360px' }}>
              <label htmlFor="Message">Message</label>
              <textarea
                rows={5}
                className="form-control"
                id="Message"
                placeholder="Enter your message"
              />
            </div>
            <div className="text-center">
              <button
                className="my-2 px-4 mx-auto btn btn-dark"
                type="submit"
                disabled
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</div>

  );
};

export default ContactPage;
