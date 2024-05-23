// Initial state for the cart, an empty array
const cart = []

// Reducer function to handle actions related to the cart
// Takes the current state and an action as arguments
const handleCart = (state = cart, action) => {
    // Extract the product from the action payload
    const product = action.payload

    // Switch statement to handle different action types
    switch (action.type) {
        case "ADDITEM":
            // Check if the product is already in the cart
            const exist = state.find((x) => x.product_id === product.product_id)
            if (exist) {
                // If product exists in the cart, increase its quantity by 1
                return state.map((x) =>
                    x.product_id === product.product_id ? { ...x, qty: x.qty + 1 } : x
                )
            } else {
                // If product does not exist in the cart, add it with a quantity of 1
                return [...state, { ...product, qty: 1 }]
            }
            break

        case "DELITEM":
            // Check if the product exists in the cart
            const exist2 = state.find((x) => x.product_id === product.product_id)
            if (exist2.qty === 1) {
                // If the product quantity is 1, remove it from the cart
                return state.filter((x) => x.product_id !== exist2.product_id)
            } else {
                // If the product quantity is more than 1, decrease its quantity by 1
                return state.map((x) =>
                    x.product_id === product.product_id ? { ...x, qty: x.qty - 1 } : x
                )
            }
            break

        default:
            // Return the current state if the action type is not recognized
            return state
            break
    }
}

// Export the reducer as the default export
export default handleCart
