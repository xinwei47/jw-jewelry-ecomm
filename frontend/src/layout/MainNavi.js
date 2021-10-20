import { NavLink, Link } from 'react-router-dom';

const MainNavi = () => {
  return (
    <header className='header'>
      <Link className='nav__logo-link' to='/'>
        <h1 className='nav__logo'>JW Jewelry</h1>
      </Link>
      <nav className='nav'>
        <ul className='nav__list'>
          <li className='nav__item'>
            <NavLink className='nav__link' to='/shop'>
              Shop
            </NavLink>
          </li>
          <li className='nav__item'>
            <NavLink className='nav__link' to='/about'>
              About
            </NavLink>
          </li>
          <li className='nav__item'>
            <NavLink className='nav__link' to='/sign-in'>
              Sign In/Up
            </NavLink>
          </li>
          <li className='nav__item'>
            <NavLink className='nav__link' to='/cart'>
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavi;
