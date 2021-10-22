import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Button from '../UI/Button';
// import Filter from './FilterInput';
import FilterForm from './FilterForm';

const filters = {
  materials: ['Yellow Gold', 'White Gold', 'Diamond', 'Silver'],
  prices: ['0-100', '100-200', '200-300', '300+'],
};

const Sidebar = (props) => {
  const [filterResults, setFilterResults] = useState({});
  const history = useHistory();

  let updatedFilterResults;
  const updatedFilterResultsHandler = (data) => {
    console.log(data);
    updatedFilterResults = data;
    // console.log(updatedFilterResults);
  };

  const filtersSubmitHandler = async (event) => {
    event.preventDefault();
    setFilterResults(updatedFilterResults);

    // console.log(filterResults);
  };

  props.onFilterData(filterResults);

  return (
    <>
      {/* menu */}
      <ul>
        {props.menuList.map((item, ind) => {
          return <Link to={`/shop/${item.name}`}>{item.name}</Link>;
        })}
      </ul>

      {/* filters */}

      <FilterForm
        onFiltersSubmit={filtersSubmitHandler}
        filters={filters}
        onUpdatedFilterResults={updatedFilterResultsHandler}
      />
    </>
  );
};

export default Sidebar;
