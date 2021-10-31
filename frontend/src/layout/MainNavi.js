import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import CartContext from '../store/cart-context';
import Button from '../UI/Button';

import '../styles/layout/_main-navi.scss';

const MainNavi = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  const logoutHandler = async () => {
    await authCtx.onLogout();
  };

  return (
    <header className='nav'>
      <div className='nav__logo'>
        <Link className='nav__logo-link' to='/'>
          <h1 className='nav__logo-text'>JW</h1>
        </Link>
      </div>
      <nav className='nav__menu'>
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
              <NavLink className='nav__menu-link' to='/sign-in'>
                Sign In/Up
              </NavLink>
            </li>
          )}
          {/* only show logout when user is logged in */}
          {authCtx.isAuthenticated && (
            <>
              <li className='nav__menu-item'>
                <NavLink className='nav__menu-link' to='/profile'>
                  Profile
                </NavLink>
              </li>
              <li className='nav__menu-item'>
                <NavLink className='nav__menu-link' to='/wishlist'>
                  Wishlist
                </NavLink>
              </li>
            </>
          )}

          <li className='nav__menu-item'>
            <NavLink className='nav__menu-link' to='/cart'>
              Cart {cartCtx.totalCount}
            </NavLink>
          </li>

          {authCtx.isAuthenticated && (
            <li className='nav__menu-item'>
              <Button className='btn btn-logout' onClick={logoutHandler}>
                Logout
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavi;
