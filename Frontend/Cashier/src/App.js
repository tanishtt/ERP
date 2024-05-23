// Importing the logo image and the CSS stylesheet for the App component
import logo from './logo.svg';
import './App.css';

// Importing the SearchBar component from the components folder
import { SearchBar } from './components/SearchBar';

// Main functional component for the application
function App() {
  // Local state to manage the search results (assumes `useState` hook usage)
  const [results, setResults] = React.useState([]);

  return (
    <div className="App">
      {/* Container for the search bar and search results */}
      <div className="search-bar-container">
        {/* SearchBar component with a prop to set the search results */}
        <SearchBar setResults={setResults} />
        {/* Conditional rendering of the search results list */}
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
      <header className="App-header">
        {/* Displaying the logo image */}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* Link to the React documentation */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// Exporting the App component as the default export
export default App;
