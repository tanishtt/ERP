import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons
import "./SearchBar.css"; // Import the CSS file for styling

export const SearchBar = ({ setResults }) => { // SearchBar component receives setResults function as prop
  const [input, setInput] = useState(""); // State for input value

  const fetchData = (value) => { // Function to fetch data based on search value
    fetch("http://localhost:3000/customer/get-products") // Fetch products from the server
      .then((response) => {
        //console.log(response);
        return response.json(); // Parse response as JSON
      })
      .then((json) => { // Handle the JSON response
        console.log(json, value); // Log response and search value to console
        const results = json.filter((item) => { // Filter products based on search value
          return (
            value && // Check if value exists
            item.product_name && // Check if product name exists
            item.photos && // Check if photos exist
            item.product_name.toLowerCase().includes(value.toLowerCase()) // Check if product name contains search value (case-insensitive)
          );
        });
        // Ensure setResults is a function before calling it
        if (typeof setResults === "function") {
          console.log("abc", results); // Log filtered results to console
          setResults(results); // Set filtered results using setResults function
        } else {
          console.log("xyz"); // Log message if setResults is not a function
        }
      })
      .catch((error) => { // Handle errors
        console.error("Error fetching data:", error); // Log error to console
        // Handle the error as needed in your application
      });
  };

  const handleChange = (value) => { // Function to handle input change
    setInput(value); // Update input state with new value
    fetchData(value); // Fetch data based on new input value
  };

  return (
    <div className="input-wrapper" style={{marginLeft:"200px"}}> {/* Search input wrapper */}
      <FaSearch product_id="search-icon" /> {/* Search icon */}
      <input
        placeholder="Type to search..." // Placeholder text for input
        value={input} // Input value
        onChange={(e) => handleChange(e.target.value)} // Handle input change
      />
    </div>
  );
};
