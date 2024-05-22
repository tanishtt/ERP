// Function to fetch orders data from the server
export const getOrders = () => {
  return fetch("http://localhost:3000/admin/orders/get-orders").then((res) => res.json());
};

// Function to fetch sales data from the server
export const getSales = () => {
  return fetch("http://localhost:3000/admin/dashboard/api/sales").then((res) => res.json());
};

// Function to fetch customer data from the server
export const getCustomer = () => {
  return fetch("http://localhost:3000/admin/dashboard/api/customers").then((res) => res.json());
};

// Function to fetch revenue data from a JSON API
export const getRevenue = () => {
  return fetch("https://json.com/carts").then((res) => res.json());
};

// Function to fetch inventory data from the server
export const getInventory = () => {
  return fetch("http://localhost:3000/admin/products/get-products").then((res) => res.json());
};

// Function to fetch customers data from the server
export const getCustomers = () => {
  return fetch("http://localhost:3000/admin/customers/get-all-customers").then((res) => res.json());
  // Alternative approach to fetch customers data from a dummy JSON API
  // return fetch("https://dummyjson.com/users").then((res) => res.json());
};

// Function to fetch comments data from a dummy JSON API
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
