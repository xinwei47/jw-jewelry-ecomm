import { useContext } from 'react';
import { fetchWishList } from '../lib/api';
import AuthContext from '../store/auth-context';
import useHttp from '../hooks/use-http';

import '../styles/pages/_wishlist.scss';
import { useEffect } from 'react';
import { ProductsGallery } from '../components/Gallery';

const Wishlist = () => {
  const authCtx = useContext(AuthContext);
  const { token } = authCtx;

  const {
    sendRequest: sendWishlistRequest,
    // status: wishlistRequest,
    data: wishlist,
  } = useHttp(fetchWishList);

  useEffect(() => {
    sendWishlistRequest(token);
  }, [sendWishlistRequest, token]);

  return (
    <>
      <div className='wishlist'>
        <h1 className='heading--1 wishlist__heading'>
          My Wishlist ({wishlist.length})
        </h1>
        <ProductsGallery className='wishlist__gallery' items={wishlist} />
      </div>
    </>
  );
};

export default Wishlist;
