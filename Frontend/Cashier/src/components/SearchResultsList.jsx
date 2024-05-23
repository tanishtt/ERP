import "./SearchResultsList.css"; // Importing CSS for styling the search results list component
import { SearchResult } from "./SearchResult"; // Importing the SearchResult component

// Defining the SearchResultsList component
export const SearchResultsList = ({ results, filter, addProduct }) => {
  return (
    <div className="results-list">
      {results.map((result, product_id) => { // Iterating over the results array and rendering a SearchResult component for each item
        return (
          <SearchResult
            key={product_id} // Adding a unique key for each item in the list
            result={result} // Passing the result (product) data to the SearchResult component
            filter={filter} // Passing the filter function to the SearchResult component (if needed)
            addProduct={addProduct} // Passing the addProduct function to the SearchResult component
          />
        );
      })}
    </div>
  );
};
