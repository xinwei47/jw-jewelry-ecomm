import { useContext, useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import CartContext from '../store/cart-context';
import Button from '../UI/Button';

import '../styles/layout/_main-navi.scss';

const MainNavi = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const node = useRef();

  const [showAcctMenu, setShowAcctMenu] = useState(false);
  const [btnAnimated, setBtnAnimated] = useState(false);

  const toggleAcctMenuHandler = () => {
    setShowAcctMenu((prevState) => !prevState);
  };

  const logoutHandler = async () => {
    await authCtx.onLogout();
  };

  const handleOutsideClick = (e) => {
    // if the click happens within the node (nav), no action
    if (node.current.contains(e.target)) {
      return;
    }
    // if the click happens outside of the nav, close the dropdown
    setShowAcctMenu(false);
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleOutsideClick);
    // performs cleanup: return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // apply dynamic styling to "cart" navi link
  const btnClasses = `nav__cart-btn ${btnAnimated ? 'bump' : ''}`;
  // const btnClasses = btnAnimated ? 'bump' : '';

  useEffect(() => {
    if (cartCtx.products.length === 0) return;
    setBtnAnimated(true);

    const timeoutId = setTimeout(() => {
      setBtnAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [cartCtx.products]);

  return (
    <header className='nav'>
      <div className='nav__logo'>
        <Link className='nav__logo-link' to='/'>
          <h1 className='nav__logo-text'>JW</h1>
        </Link>
      </div>
      <nav className='nav__menu' ref={node}>
        <ul className='nav__menu-list'>
          <li className='nav__menu-item'>
            <NavLink className='nav__menu-link' to='/shop/all'>
              Shop
            </NavLink>
          </li>
          <li className='nav__menu-item'>
            <NavLink className='nav__menu-link' to='/about'>
              About
            </NavLink>
          </li>
          {!authCtx.isAuthenticated && (
            <li className='nav__menu-item'>
              <NavLink className='nav__menu-link' to='/user/sign-in'>
                Sign In/Up
              </NavLink>
            </li>
          )}
          {authCtx.isAuthenticated && (
            <li
              className='nav__menu-item nav__account'
              onClick={toggleAcctMenuHandler}
            >
              My Account
              {authCtx.isAuthenticated && showAcctMenu && (
                <ul className='nav__nested-menu'>
                  {/* show 'profile', 'wishlist', 'logout' under 'My Account' as nested menu */}
                  <li className='nav__nested-item'>
                    <NavLink className='nav__menu-link' to='/user/profile'>
                      My Profile
                    </NavLink>
                  </li>
                  <li className='nav__nested-item'>
                    <NavLink className='nav__menu-link' to='/user/wishlist'>
                      My Wishlist
                    </NavLink>
                  </li>
                  <li className='nav__nested-item'>
                    <NavLink className='nav__menu-link' to='/user/orders'>
                      My Orders
                    </NavLink>
                  </li>
                  <li className='nav__nested-item'>
                    <Button
                      className='btn btn-tertiary'
                      onClick={logoutHandler}
                    >
                      Logout
                    </Button>
                  </li>
                </ul>
              )}
            </li>
          )}

          <li className='nav__menu-item'>
            <NavLink className='nav__menu-link' to='/cart'>
              <Button className={btnClasses}>
                Cart ({cartCtx.totalCount})
              </Button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavi;
