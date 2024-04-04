export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://json.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("http://localhost:3000/admin/products/get-products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("http://localhost:3031/main").then((res) => res.json());
  //return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
