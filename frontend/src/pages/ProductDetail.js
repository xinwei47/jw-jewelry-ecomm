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
import ReviewForm from '../components/ReviewForm';

import Reviews from '../components/Reviews';
import '../styles/pages/_product-detail.scss';
import StarRatingView from '../components/StarRatingView';
import Error from '../components/Error';
import FlashMessage from '../components/FlashMessage';

const ProductDetail = () => {
  // get the initial wishlist state from user wishlist in database
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const history = useHistory();

  const { productName, productId } = useParams();

  // configure whether the product is on user's wishlist
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

  // fetch product detail, prodcut reviews and delete review
  const {
    sendRequest: singleProductRequest,
    status: productStatus,
    data: product,
    error: productError,
  } = useHttp(fetchSingleProduct);

  const {
    sendRequest: reviewsRequest,
    // status: reviewsStatus,
    data: reviews,
  } = useHttp(fetchProductReviews);

  const {
    sendRequest: deleteReviewRequest,
    data: deleteReviewData,
    status: deleteReviewStatus,
    error: deleteReviewError,
  } = useHttp(deleteReview);

  useEffect(() => {
    // console.log('get single product request');
    singleProductRequest(productName, productId);
  }, [singleProductRequest, productName, productId]);

  useEffect(() => {
    // console.log('get product reviews request');
    // only fetch reviews if product request is successful
    if (productStatus === 'success') {
      reviewsRequest(productId);
    }
  }, [productStatus, reviewsRequest, productId]);

  // find out which reviews are written by logged in user
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
    [reviews, authCtx.isAuthenticated]
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

  // input handlers
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
  const [flashMsg, setFlashMsg] = useState('');

  const deleteReviewHandler = async (reviewId) => {
    // try {
    await deleteReviewRequest(authCtx.token, reviewId);
    // if the review is deleted successfully, refetch reviews data
    await reviewsRequest(productId);
    // setFlashMsg(deleteReviewData);

    // }
    // catch (error) {
    //   console.log(error.response);
    // }
  };

  useEffect(() => {
    setFlashMsg(deleteReviewData);
  }, [deleteReviewData]);

  // console.log(deleteReviewData);
  // console.log(flashMsg);
  // console.log(deleteReviewStatus);

  const { _id, images, name, price, material, description } = product;

  const [prodRating, setProdRating] = useState(0);

  const calcProdRating = useCallback((reviews) => {
    const updatedProdRating =
      reviews.reduce((sum, curItem) => sum + curItem.rating, 0) /
      reviews.length;
    // console.log(`updatedProdRating in calcProdRating: ${updatedProdRating}`);
    setProdRating(updatedProdRating);
  }, []);

  // refresh the reviews when a new comment is added
  const addedCommentHandler = async () => {
    await reviewsRequest(productId);
    // refetch product starrating and reviews count
    calcProdRating(reviews);
  };

  // const [reviewAddedStatus, setReviewAddedStatus] = useState(null);
  // const [reviewAddedMsg, setReviewAddedMsg] = useState(null);

  const reviewDataHandler = useCallback((reviewStatus, reviewMsg) => {
    setFlashMsg(reviewMsg);
  }, []);

  console.log(flashMsg);

  useEffect(() => {
    if (reviews && reviews.length !== 0) {
      calcProdRating(reviews);
    }
  }, [reviews, reviews.length, calcProdRating]);

  // display error page if no product is found
  if (productStatus === 'error') {
    // console.log(productStatus);
    // console.log(product);
    // console.log(productError);
    return <Error errStatus={productError.status} errMsg={productError.data} />;
  }

  // console.log(reviews);
  return (
    <div className='product'>
      <div className='product__content'>
        <div className='product__left'>
          {images &&
            images.map((image, ind) => (
              <div
                key={`${name}-image-${ind}`}
                className='product__image-container'
              >
                <img src={image} alt={`${name}`} className='product__image' />
              </div>
            ))}
        </div>

        <div className='product__right'>
          <div className='product__rating-reviews'>
            <div className='product__rating'>
              <StarRatingView value={prodRating} />
              <p className='product__rating-text'>
                {prodRating === 0 ? 0 : prodRating.toFixed(1)} |
              </p>
            </div>

            <a href='#reviews' className='product__view-reviews'>
              {reviews.length === 0
                ? 'No Reviews'
                : `${reviews.length} Reviews`}
            </a>
          </div>

          <h1 className='product__heading'>{name}</h1>
          <p className='product__price'>${price}</p>

          <div className='product__material'>
            <h4 className='product__material-heading'>Material</h4>
            <p className='product__material-text'>{material}</p>
          </div>

          <div className='product__description'>
            <h4 className='product__description-heading'>Description</h4>
            <p className='product__description-text'>{description}</p>
          </div>

          <div className='product__actions'>
            <Button
              className='btn-primary product__actions-cart'
              onClick={() => cartCtx.onAddItem(_id, name, price, images)}
            >
              Add to Cart
            </Button>
            {/* wishlist actions */}
            {!isOnWishlist ? (
              <Button
                className='btn-tertiary product__actions-wishlist'
                onClick={addToWishlistHandler}
              >
                Add to Wishlist
              </Button>
            ) : (
              <Button
                className='btn-tertiary product__actions-wishlist'
                onClick={removeFromWishlistHandler}
              >
                Remove From Wishlist
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* display reviews */}
      <div className='product__reviews' id='reviews'>
        <h3 className='heading--3 product__reviews-heading'>
          Why people love us
        </h3>

        {/* only display review form when user is logged in */}
        {authCtx.isAuthenticated && (
          <div className='product__write-review'>
            <h4 className='heading--4'>Write a review</h4>
            <ReviewForm
              onAddedComment={addedCommentHandler}
              onReviewData={reviewDataHandler}
            />
          </div>
        )}

        {/* fetch reviews */}
        {flashMsg.length !== 0 ? <FlashMessage>{flashMsg}</FlashMessage> : ''}
        <div className='product__display-reviews'>
          <h4 className='heading--4 product__reviews-subheading'>
            Reviews ({reviews.length})
          </h4>
          <Reviews
            reviews={reviews}
            reviewsByAuthUser={reviewsByAuthUser}
            onDeleteReview={deleteReviewHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
