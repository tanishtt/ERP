import React from "react";
import { Footer, Navbar } from "../components";
import './App.css'; // Imported CSS file

const ContactPage = () => {
  return (
    <div className="contact">
      <Navbar />
      <div className="container2">
        <div className="box" style={{ width: "500px", marginTop: '120px', backgroundColor: '#f1faea' }}>
          <h1 className="text-center mt-5" style={{ marginTop: '100px' }}>Contact Us</h1> {/* Adjusted margin-top */}
        </div>
        <div className="box" style={{ backgroundColor: '#eae9e9', width: '600px' }}>
          <form>
            <div className="form my-3">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                className="form-control"
                id="Name"
                placeholder="Enter your name"
                style={{ width: '500px' }}
              />
            </div>
            <div className="form my-3">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                className="form-control"
                id="Email"
                placeholder="name@example.com"
                style={{ width: '500px' }}
              />
            </div>
            <div className="form my-3">
              <label htmlFor="Message">Message</label>
              <textarea
                rows={5}
                className="form-control"
                id="Message"
                placeholder="Enter your message"
                style={{ width: '500px', marginLeft: '30px' }}
              />
            </div>
            <div className="text-center">
              <button
                className="my-2 px-4 btn btn-dark"
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
  );
};

export default ContactPage;
