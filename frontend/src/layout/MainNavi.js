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

  // console.log(showAcctMenu);
  return (
    <header className="nav">
      <div className="nav__logo">
        <Link className="nav__logo-link" to="/">
          <h1 className="nav__logo-text">JW</h1>
        </Link>
      </div>
      <nav className="nav__menu" ref={node}>
        <ul className="nav__menu-list">
          <li className="nav__menu-item">
            <NavLink className="nav__menu-link" to="/shop/all">
              Shop
            </NavLink>
          </li>
          <li className="nav__menu-item">
            <NavLink className="nav__menu-link" to="/about">
              About
            </NavLink>
          </li>
          {!authCtx.isAuthenticated && (
            <li className="nav__menu-item">
              <NavLink className="nav__menu-link" to="/sign-in">
                Sign In/Up
              </NavLink>
            </li>
          )}
          {authCtx.isAuthenticated && (
            <li
              className="nav__menu-item nav__account"
              onClick={toggleAcctMenuHandler}
            >
              My Account
              {authCtx.isAuthenticated && showAcctMenu && (
                <ul className="nav__nested-menu">
                  {/* show 'profile', 'wishlist', 'logout' under 'My Account' as nested menu */}
                  <li className="nav__nested-item">
                    <NavLink className="nav__menu-link" to="/profile">
                      My Profile
                    </NavLink>
                  </li>
                  <li className="nav__nested-item">
                    <NavLink className="nav__menu-link" to="/wishlist">
                      My Wishlist
                    </NavLink>
                  </li>
                  <li className="nav__nested-item">
                    <Button
                      className="btn btn-tertiary"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Button>
                  </li>
                </ul>
              )}
            </li>
          )}

          <li className="nav__menu-item">
            <NavLink className="nav__menu-link" to="/cart">
              Cart {cartCtx.totalCount}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavi;
