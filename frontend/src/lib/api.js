import axios from 'axios';
import OrderSummary from '../components/OrderSummary';

export const fetchCategories = async () => {
  const { data } = await axios.get('/shop/categories');
  return data;
};

export const fetchProducts = async (category, filterParams = {}) => {
  const { data } = await axios.get(`/shop/${category}`, {
    params: {
      ...filterParams,
    },
  });
  return data;
};

export const fetchSingleProduct = async (productName, productId) => {
  const { data } = await axios.get(
    `/shop/products/${productName}/${productId}`
  );
  return data;
};

export const signUpUser = async (userInput) => {
  const { data } = await axios.post('/user/sign-up', {
    ...userInput,
  });
  return data;
};

export const signInUser = async (userInput) => {
  const { data } = await axios.post('/user/sign-in', {
    ...userInput,
  });
  return data;
};

export const signOutUser = async () => {
  await axios.get('/user/logout');
  return;
};

export const fetchUserData = async (token) => {
  const { data } = await axios.get('/user/profile', {
    headers: {
      // add the jwt token in headers and send with the request
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const changeUserPassword = async (
  token,
  enteredOldPwd,
  enteredNewPwd
) => {
  const { data } = await axios.put(
    '/user/change-password',
    {
      oldPassword: enteredOldPwd,
      newPassword: enteredNewPwd,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const fetchWishList = async (token) => {
  const { data } = await axios.get('/user/wishlist', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(data);
  return data;
};

export const postReview = async (token, prodId, reviewContent) => {
  const { data } = await axios.post(
    `/${prodId}/reviews`,
    { ...reviewContent },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const fetchProductReviews = async (prodId) => {
  // const { data } = await axios.get(`/reviews/${prodId}`);
  const { data } = await axios.get(`/${prodId}/reviews`);
  return data;
};

export const deleteReview = async (token, prodId, reviewId) => {
  const { data } = await axios.delete(`/${prodId}/reviews/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(data);
  return data;
};

export const addToWishlist = async (token, prodId) => {
  const { data } = await axios.post(
    '/user/add-to-wishlist',
    { prodId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const removeFromWishlist = async (token, prodId) => {
  const { data } = await axios.put(
    '/user/remove-from-wishlist',
    { prodId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const getUserId = async (token) => {
  const { data: userId } = await axios.get('/user/get-authentication', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return userId;
};

export const postOrder = async (userId, orderData) => {
  const { data: order } = await axios.post('/user/orders', {
    orderData: { ...orderData },
    userId,
  });
  return order;
};

export const getSingleOrder = async (orderId) => {
  const { data: order } = await axios.get(`/user/orders/${orderId}`);
  return order;
};

export const getOrders = async (token) => {
  const { data: orders } = await axios.get('/user/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return orders;
};
