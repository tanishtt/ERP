import "./SearchResultsList.css"; // Import the CSS file for styling
import { SearchResult } from "./SearchResult"; // Import the SearchResult component

export const SearchResultsList = ({ results, filter, addProduct }) => {
  return (
    <div className="results-list" style={{width:'650px', marginLeft:'400px', paddingLeft:'200px'}}>
      {/* Map over the results array and render a SearchResult component for each result */}
      {results.map((result, index) => {
        return <SearchResult key={index} result={result} filter={filter} addProduct={addProduct} />;
      })}
    </div>
  );
};
