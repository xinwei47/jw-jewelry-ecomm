import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchWishList, removeFromWishlist } from '../lib/api';
import AuthContext from '../store/auth-context';
import useHttp from '../hooks/use-http';

import '../styles/pages/_wishlist.scss';
import { useEffect } from 'react';
import { ProductsGallery } from '../components/Gallery';

const Wishlist = () => {
  const authCtx = useContext(AuthContext);
  const { token } = authCtx;
  const history = useHistory();

  const {
    sendRequest: sendWishlistRequest,
    // status: wishlistRequest,
    data: wishlist,
  } = useHttp(fetchWishList);

  useEffect(() => {
    sendWishlistRequest(token);
  }, [sendWishlistRequest, token]);

  console.log(wishlist);

  const removeItemHandler = async (prodId) => {
    if (authCtx.isAuthenticated) {
      const updatedWishlist = await removeFromWishlist(authCtx.token, prodId);
      sessionStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      console.log('removed from wishlist');
      await sendWishlistRequest(authCtx.token);
    } else {
      history.replace('/user/sign-in');
    }
  };

  return (
    <>
      <div className='wishlist'>
        <h1 className='heading--1 wishlist__heading'>
          My Wishlist ({wishlist.length})
        </h1>
        <ProductsGallery
          className='wishlist__gallery'
          items={wishlist}
          showRemoveBtn={true}
          onRemoveItem={removeItemHandler}
        />
      </div>
    </>
  );
};

export default Wishlist;
