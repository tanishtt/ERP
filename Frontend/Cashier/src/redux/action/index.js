// Action creator for adding an item to the cart
// Takes a product as an argument and returns an action object
export const addCart = (product) => {
    return {
        type: "ADDITEM",   // Action type for adding an item
        payload: product   // Payload containing the product to be added
    }
}

// Action creator for deleting an item from the cart
// Takes a product as an argument and returns an action object
export const delCart = (product) => {
    return {
        type: "DELITEM",   // Action type for deleting an item
        payload: product   // Payload containing the product to be deleted
    }
}
