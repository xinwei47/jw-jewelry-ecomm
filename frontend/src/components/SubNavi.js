import { Link } from 'react-router-dom';

import '../styles/components/_sub-navi.scss';

const SubNavi = (props) => {
  return (
    <ul className='sub-navi'>
      <li className='sub-navi__item'>
        <Link className='sub-navi__link' to={'/shop/all'} key='shopall-0'>
          Shop All
        </Link>
      </li>
      {props.menuList.map((item, ind) => {
        return (
          <li className='sub-navi__item'>
            <Link
              className='sub-navi__link'
              to={`/shop/${item.name}`}
              key={`${item}-${ind + 1}`}
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SubNavi;
