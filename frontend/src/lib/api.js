import axios from 'axios';

export const fetchCategories = async () => {
  const { data } = await axios.get('/categories');
  return data;
};

export const fetchProducts = async (category, params = {}) => {
  const { data } = await axios.get(`/shop/${category}`, {
    params,
  });
  return data;
};

export const fetchSingleProduct = async (productName, productId) => {
  const { data } = await axios.get(
    `/shop/products/${productName}/${productId}`
  );
  return data;
};

export const fetchUserData = async (token) => {
  const { data } = await axios.get('/profile', {
    headers: {
      // add the jwt token in headers and send with the request
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const fetchWishList = async (token) => {
  const { data } = await axios.get('/wishlist', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
};
