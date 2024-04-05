export const getOrders = () => {
  return fetch("http://localhost:3000/admin/orders/get-orders").then((res) => res.json());
};

export const getSales = () => {
  return fetch("http://localhost:3000/admin/orders/get-orders").then((res) => res.json());
};

export const getCustomer = () => {
  return fetch("http://localhost:3000/admin/orders/get-orders").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://json.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("http://localhost:3000/admin/products/get-products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("http://localhost:3000/admin/customers/get-all-customers").then((res) => res.json());
  //return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
