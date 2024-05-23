// Import the handleCart reducer from the './handleCart' file
import handleCart from './handleCart'

// Import the combineReducers function from the 'redux' library
import { combineReducers } from "redux";

// Combine the handleCart reducer into a single rootReducer using combineReducers
const rootReducers = combineReducers({
    handleCart, // Adding the handleCart reducer to the root reducer
})

// Export the rootReducers as the default export
export default rootReducers
