import { useEffect, useState, useRef } from 'react';
import FilterInput from './FilterInput';
import Button from '../UI/Button';

const filtersData = {
  material: ['Yellow Gold', 'White Gold', 'Diamond', 'Silver'],
  priceTier: ['0-100', '100-200', '200-300', '300+'],
  // style: ['classic', 'chic', 'modern'],
};

const FilterForm = (props) => {
  const [filterResults, setFilterResults] = useState({});
  // filterResults data format:
  // {
  //   material: ['Yellow Gold', 'Diamond'],
  //   Price: ['100-200', '300+']
  // }

  const checkedStateRef = useRef();

  const updatedFilterResults = {};
  // key: materials, prices
  // data: [true, false, false, false]
  const filterInputHandler = (key, data) => {
    // only keep the filters that are checked (true)
    const resultIndex = data
      .map((item, ind) => (item === true ? ind : ''))
      .filter((item) => item !== '');
    const filterResultsArr = resultIndex.map((ind) => filtersData[key][ind]);

    updatedFilterResults[key] = filterResultsArr;
  };

  const clearInputHandler = () => {
    console.log(checkedStateRef.current.clearCheckedInput);

    checkedStateRef.current.clearCheckedInput();
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
    <form className='filter-form' onSubmit={filterFormSubmitHandler}>
      {Object.keys(filtersData).map((key, ind) => {
        return (
          <FilterInput
            ref={checkedStateRef}
            key={`${key}-${ind}`}
            onFilterInputData={filterInputHandler.bind(null, key)}
            filterName={key === 'priceTier' ? 'price' : key}
            filtersData={filtersData}
            filterType={filtersData[key]}
          />
        );
      })}
      <div>
        <Button className='btn-secondary' type='submit'>
          Apply Filters
        </Button>

        <Button
          className='btn-secondary'
          type='button'
          onClick={clearInputHandler}
        >
          Clear All
        </Button>
      </div>
    </form>
  );
};

export default FilterForm;
