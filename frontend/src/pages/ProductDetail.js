import { useEffect, useContext, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  fetchSingleProduct,
  fetchProductReviews,
  deleteReview,
  addToWishlist,
  removeFromWishlist,
  getUserId,
} from '../lib/api';
import useHttp from '../hooks/use-http';
import CartContext from '../store/cart-context';
import AuthContext from '../store/auth-context';

import Button from '../UI/Button';
import '../styles/pages/_product-detail.scss';
import ReviewForm from '../components/ReviewForm';

const ProductDetail = () => {
  // get the initial wishlist state from user wishlist in database
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const history = useHistory();

  const { productName, productId } = useParams();

  let initialWishlistState;
  if (authCtx.wishlist) {
    const findWishlistItem = authCtx.wishlist.find(
      (item) => item === productId
    );
    if (!!findWishlistItem) initialWishlistState = true;
    else initialWishlistState = false;
  } else {
    initialWishlistState = false;
  }
  const [isOnWishlist, setIsOnWishlist] = useState(initialWishlistState);

  const {
    sendRequest: singleProductRequest,
    // status: productStatus,
    data: product,
  } = useHttp(fetchSingleProduct);

  const {
    sendRequest: reviewsRequest,
    // status: reviewsStatus,
    data: reviews,
  } = useHttp(fetchProductReviews);

  const {
    sendRequest: deleteReviewRequest,
    // status: deleteReviewStatus,
    // data: reviews,
  } = useHttp(deleteReview);

  useEffect(() => {
    // console.log('get single product request');
    singleProductRequest(productName, productId);
  }, [singleProductRequest, productName, productId]);

  useEffect(() => {
    // console.log('get product reviews request');
    reviewsRequest(productId);
  }, [reviewsRequest, productId]);

  // refetch the reviews when a new comment is added
  const addedCommentHandler = () => {
    reviewsRequest(productId);
  };

  const [reviewsByAuthUser, setReviewsByAuthUser] = useState([]);
  // return an array of product's reviews that is written by the logged-in user
  const getReviewsByLoggedInUser = useCallback(
    async (token) => {
      if (authCtx.isAuthenticated) {
        const userId = await getUserId(token);
        const reviewsByLoggedInUser = reviews.filter(
          (review) => review.author._id === userId
        );
        setReviewsByAuthUser(reviewsByLoggedInUser);
      }
    },
    [reviews]
  );

  useEffect(() => {
    getReviewsByLoggedInUser(authCtx.token);
  }, [getReviewsByLoggedInUser, authCtx.token]);

  const addToWishlistHandler = async () => {
    // check if the user is logged in
    // if yes, send the data to database
    // if no, send user to login page
    if (authCtx.isAuthenticated) {
      const updatedWishlist = await addToWishlist(authCtx.token, product._id);
      setIsOnWishlist(true);
      sessionStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      console.log('added to wishlist');
    } else {
      history.replace('/sign-in');
    }
  };

  const removeFromWishlistHandler = async () => {
    if (authCtx.isAuthenticated) {
      const updatedWishlist = await removeFromWishlist(
        authCtx.token,
        product._id
      );
      setIsOnWishlist(false);
      sessionStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      console.log('removed from wishlist');
    } else {
      history.replace('/sign-in');
    }
  };

  const deleteReviewHandler = async (reviewId) => {
    await deleteReviewRequest(authCtx.token, reviewId);
    // if the review is deleted successfully, refetch reviews data
    reviewsRequest(productId);
    console.log('deleted review');
  };

  const { _id, images, name, rating, price, material, description } = product;

  return (
    <div className="product">
      <div className="product__content">
        <div className="product__images-container">
          <img src={images} alt={`${name}`} />
          {/* {images.map((image) => (
            <img src={image} alt={`${name}`} />
          ))} */}
        </div>

        <div className="product__right">
          <h1 className="product__heading">{name}</h1>
          <div className="product__rating">
            {/* stars */}
            <p className="product__rating-text">
              {parseFloat(rating).toFixed(1)}
            </p>
            <p className="product__price-text">${price}</p>
            <a href="#reviews" className="product__view-reviews">
              See 20 Reviews
            </a>
          </div>
          <div>{material}</div>
          <div className="product__description">
            <h4 className="product__description-heading">Description</h4>
            <div className="product__description-text">{description}</div>
          </div>
          <div className="product__actions">
            <Button
              className="btn-primary"
              // onClick={() => cartCtx.onAddItem(product)}
              onClick={() => cartCtx.onAddItem(_id, name, price, images)}
            >
              Add to Cart
            </Button>
            {/* wishlist actions */}
            {!isOnWishlist ? (
              <Button className="btn-tertiary" onClick={addToWishlistHandler}>
                Add to Wishlist
              </Button>
            ) : (
              <Button
                className="btn-tertiary"
                onClick={removeFromWishlistHandler}
              >
                Remove From Wishlist
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* display reviews */}
      <div className="product__reviews" id="reviews">
        <h2 className="heading--2">Reviews</h2>
      </div>
      {/* only display review form when user is logged in */}
      {authCtx.isAuthenticated && (
        <ReviewForm onAddedComment={addedCommentHandler} />
      )}

      {/* fetch reviews */}
      <ul className="reviews">
        {reviews.map((review) => {
          return (
            <li className="" key={`review-${review._id}`}>
              <div>{review.author.email}</div>
              <div>{review.rating}</div>
              <div>{review.text}</div>

              {/* only logged in user who is also the review author can see the delete button   */}
              {authCtx.isAuthenticated &&
                !!reviewsByAuthUser.find(
                  (reviewByAuth) => reviewByAuth._id === review._id
                ) && (
                  <Button
                    className=""
                    onClick={deleteReviewHandler.bind(null, review._id)}
                  >
                    DELETE
                  </Button>
                )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductDetail;
