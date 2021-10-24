import { Link } from 'react-router-dom';
import FilterForm from './FilterForm';

const Sidebar = (props) => {
  return (
    <>
      {/* menu */}
      <ul>
        {props.menuList.map((item, ind) => {
          return (
            <Link to={`/shop/${item.name}`} key={`${item}-${ind}`}>
              {item.name}
            </Link>
          );
        })}
      </ul>

      {/* filters */}
      <FilterForm onFiltersSubmittedData={props.onFiltersSubmittedData} />
    </>
  );
};

export default Sidebar;
