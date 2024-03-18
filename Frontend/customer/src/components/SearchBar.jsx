import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((json) => {
        console.log(json, value);
        const results = json.filter((item) => {
          return (
            value &&
            item &&
            item.title &&
            item.image &&
            item.title.toLowerCase().includes(value.toLowerCase())
          );
        });
        // Ensure setResults is a function before calling it
        if (typeof setResults === "function") {
          console.log("abc", results);
          setResults(results);
        }
        else{
          console.log("xyz");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error as needed in your application
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};