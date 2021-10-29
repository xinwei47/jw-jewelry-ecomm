import { useContext } from 'react';
import { fetchWishList } from '../lib/api';
import AuthContext from '../store/auth-context';
import useHttp from '../hooks/use-http';

import '../styles/pages/_wishlist.scss';
import { useEffect } from 'react';

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
        <h1 className='wishlist__heading'>Wishlist</h1>
        <ul className='wishlist__list'>
          {wishlist.map((item) => {
            return (
              <li className='wishlist__item' key={`wishlist-${item._id}`}>
                {/* <img src={item.image} alt='' /> */}
                <p>{item.name}</p>
                <p>price: ${item.price}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Wishlist;
