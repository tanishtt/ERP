// Import the configureStore function from the @reduxjs/toolkit package
import { configureStore } from '@reduxjs/toolkit';

// Import the rootReducers which combines all the individual reducers
import rootReducers from './reducer';

// Create the Redux store by calling configureStore with the rootReducers
const store = configureStore({
    reducer: rootReducers, // Pass the combined reducers to the store configuration
})

// Export the store as the default export
export default store;
