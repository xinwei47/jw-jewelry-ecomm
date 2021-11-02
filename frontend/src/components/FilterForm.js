import { useEffect, useState, useRef, createRef } from 'react';
import { useHistory } from 'react-router-dom';
import FilterInput from './FilterInput';
import Button from '../UI/Button';

import '../styles/components/_filter-form.scss';

const filtersData = {
  material: ['Yellow Gold', 'White Gold', 'Diamond', 'Silver'],
  priceTier: ['0-100', '100-200', '200-300', '300+'],
  // style: ['classic', 'chic', 'modern'],
};

const FilterForm = (props) => {
  // filterResults data format:
  // {
  //   material: ['Yellow Gold', 'Diamond'],
  //   Price: ['100-200', '300+']
  // }
  const [filterResults, setFilterResults] = useState({});
  const history = useHistory();
  // console.log(history);

  // since there are multiple <FilterInput />
  // we need to create dynamic number of refs to clear the checked state
  const checkedStateRef = useRef(
    Object.keys(filtersData).map(() => createRef())
  );

  const clearFilterInputHandler = async () => {
    // console.log(checkedStateRef.current);
    checkedStateRef.current.map((el) => el.current.clearCheckedInput());
    setFilterResults({});
  };

  const updatedFilterResults = {};
  // key: materials, prices
  // data: [true, false, false, false]
  // this format can be dirrectly used as axios request parameters
  const filterInputHandler = (key, data) => {
    // only keep the filters that are checked (true)
    const resultIndex = data
      .map((item, ind) => (item === true ? ind : ''))
      .filter((item) => item !== '');
    const filterResultsArr = resultIndex.map((ind) => filtersData[key][ind]);

    updatedFilterResults[key] = filterResultsArr;
  };

  const filterFormSubmitHandler = (event) => {
    event.preventDefault();
    setFilterResults(updatedFilterResults);
  };

  const { onFiltersSubmittedData } = props;
  useEffect(() => {
    onFiltersSubmittedData(filterResults);
  }, [onFiltersSubmittedData, filterResults]);

  return (
    <form className="form filter-form" onSubmit={filterFormSubmitHandler}>
      {Object.keys(filtersData).map((key, ind) => {
        return (
          <FilterInput
            ref={checkedStateRef.current[ind]}
            key={`${key}-${ind}`}
            onFilterInputData={filterInputHandler.bind(null, key)}
            filterName={key === 'priceTier' ? 'price' : key}
            filtersData={filtersData}
            filterType={filtersData[key]}
          />
        );
      })}
      <div className="filter-form__actions">
        <Button className="btn-secondary" type="submit">
          Apply Filters
        </Button>

        <Button
          className="btn-tertiary filter-form__clear-btn "
          type="button"
          onClick={clearFilterInputHandler}
        >
          Clear All
        </Button>
      </div>
    </form>
  );
};

export default FilterForm;
