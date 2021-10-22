import { NavLink, Link } from 'react-router-dom';
import '../styles/layout/_mainnavi.scss';

const MainNavi = () => {
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
          <li className='nav__menu-item'>
            <NavLink className='nav__menu-link' to='/sign-in'>
              Sign In/Up
            </NavLink>
          </li>
          <li className='nav__menu-item'>
            <NavLink className='nav__menu-link' to='/cart'>
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavi;
