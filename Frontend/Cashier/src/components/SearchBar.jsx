import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Importing the search icon from react-icons

import "./SearchBar.css"; // Importing CSS for styling the search bar

// Defining the SearchBar component
export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState(""); // State variable to hold the input value

  // Function to fetch data from the API based on the input value
  const fetchData = (value) => {
    fetch("http://localhost:3000/cashier/get-products") // Fetching data from the given URL
      .then((response) => response.json()) // Parsing the response as JSON
      .then((json) => {
        console.log(json, value); // Logging the response and the input value for debugging
        const results = json.filter((item) => {
          return (
            value && // Ensure the value is not empty
            item && // Ensure the item exists
            item.product_name && // Ensure the item has a product name
            item.photos && // Ensure the item has photos
            item.product_name.toLowerCase().includes(value.toLowerCase()) // Check if the product name includes the input value (case insensitive)
          );
        });

        // Ensure setResults is a function before calling it
        if (typeof setResults === "function") {
          console.log("abc", results); // Logging the results for debugging
          setResults(results); // Setting the filtered results
        } else {
          console.log("xyz"); // Logging if setResults is not a function (for debugging)
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Logging any errors that occur during fetch
        // Handle the error as needed in your application
      });
  };

  // Function to handle changes in the input value
  const handleChange = (value) => {
    setInput(value); // Updating the input state
    fetchData(value); // Fetching data based on the new input value
  };

  return (
    <div className="input-wrapper" style={{ width: '1500px', marginLeft: '150px' }}>
      <FaSearch product_id="search-icon" /> {/* Search icon */}
      <input
        placeholder="Search Your Items here..." // Placeholder text for the input field
        value={input} // Setting the value of the input field
        onChange={(e) => handleChange(e.target.value)} // Handling changes in the input field
      />
    </div>
  );
};
