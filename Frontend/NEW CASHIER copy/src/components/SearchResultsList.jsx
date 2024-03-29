import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, filter, addProduct }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result} filter={filter} addProduct={addProduct} />
        ;
      })}
    </div>
  );
};