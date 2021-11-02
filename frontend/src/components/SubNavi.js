import { NavLink } from 'react-router-dom';

import '../styles/components/_sub-navi.scss';

const SubNavi = (props) => {
  return (
    <ul className="sub-navi">
      <li className="sub-navi__item" key="shopall-0">
        <NavLink
          className="sub-navi__link"
          activeClassName="sub-navi__active-link"
          to={'/shop/all'}
        >
          Shop All
        </NavLink>
      </li>
      {props.menuList.map((item, ind) => {
        return (
          <li className="sub-navi__item" key={`${item}-${ind + 1}`}>
            <NavLink
              className="sub-navi__link"
              activeClassName="sub-navi__active-link"
              to={`/shop/${item.name}`}
            >
              {item.name}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default SubNavi;
