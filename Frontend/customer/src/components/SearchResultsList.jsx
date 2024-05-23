import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, filter, addProduct }) => {
  return (
    <div className="results-list" style={{width:'650px', marginLeft:'400px', paddingLeft:'200px'}}>
      {results.map((result, product_id) => {
        return <SearchResult result={result} filter={filter} addProduct={addProduct} />
        ;
      })}
    </div>
  );
};