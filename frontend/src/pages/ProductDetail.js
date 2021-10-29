import { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchSingleProduct } from '../lib/api';
import useHttp from '../hooks/use-http';
import CartContext from '../store/cart-context';
import AuthContext from '../store/auth-context';

import Button from '../UI/Button';
import '../styles/pages/_product-detail.scss';
import axios from 'axios';

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
  // console.log(`isOnWishlist: ${isOnWishlist}`);

  const {
    sendRequest: singleProductRequest,
    // status: productStatus,
    data: product,
  } = useHttp(fetchSingleProduct);
  const { _id, image, name, rating, price, material, description } = product;

  const addToWishlistHandler = async () => {
    // check if the user is logged in
    // if yes, send the data to database
    // if no, send user to login page
    if (authCtx.isAuthenticated) {
      const { data } = await axios.post(
        '/add-to-wishlist',
        { prodId: product._id },
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      );
      console.log(data);
      setIsOnWishlist(true);
      sessionStorage.setItem('wishlist', JSON.stringify(data.wishlist));
    } else {
      history.replace('/sign-in');
    }
  };

  const removeFromWishlistHandler = async () => {
    if (authCtx.isAuthenticated) {
      const { data } = await axios.put(
        '/remove-from-wishlist',
        { prodId: product._id },
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      );
      console.log(data);
      setIsOnWishlist(false);
      sessionStorage.setItem('wishlist', JSON.stringify(data.wishlist));
    } else {
      history.replace('/sign-in');
    }
  };

  useEffect(() => {
    singleProductRequest(productName, productId);
  }, [singleProductRequest, productName, productId]);

  return (
    <div className="product">
      <div className="product__content">
        <div className="product__image-container">
          <img src={image} alt={`${name}`} />
        </div>

        <div className="product__right">
          <h1 className="product__heading">{name}</h1>
          <div className="product__rating">
            {/* stars */}
            <p className="product__rating-text">{rating}</p>
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
              onClick={() => cartCtx.onAddItem(_id, name, price, image)}
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
    </div>
  );
};

export default ProductDetail;
