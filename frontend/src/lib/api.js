import axios from 'axios';

export const fetchCategories = async () => {
  const { data } = await axios.get('/categories');
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
  // console.log(data);
  return data;
};

export const postReview = async (token, prodId, reviewContent) => {
  const { data } = await axios.post(
    '/review',
    { ...reviewContent, product: prodId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(data);
  return data;
};

export const fetchProductReviews = async (prodId) => {
  const { data } = await axios.get(`/reviews/${prodId}`);
  // console.log(data);
  return data;
};

export const deleteReview = async (token, reviewId) => {
  const { data } = await axios.delete(`/review/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(data);
  return data;
};

export const addToWishlist = async (token, prodId) => {
  const { data } = await axios.post(
    '/add-to-wishlist',
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
    '/remove-from-wishlist',
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
  const { data: userId } = await axios.get('/get-authentication', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return userId;
};
