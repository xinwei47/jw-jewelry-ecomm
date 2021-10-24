import { useEffect, useState } from 'react';
import FilterInput from './FilterInput';
import Button from '../UI/Button';

const filtersData = {
  material: ['Yellow Gold', 'White Gold', 'Diamond', 'Silver'],
  price: ['0-100', '100-200', '200-300', '300+'],
  // style: ['classic', 'chic', 'modern'],
};

const FilterForm = (props) => {
  const [filterResults, setFilterResults] = useState({});

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

  const filterFormSubmitHandler = (event) => {
    event.preventDefault();
    setFilterResults(updatedFilterResults);
  };

  const { onFiltersSubmittedData } = props;
  useEffect(() => {
    onFiltersSubmittedData(filterResults);
  }, [onFiltersSubmittedData, filterResults]);

  return (
    <form onSubmit={filterFormSubmitHandler}>
      {Object.keys(filtersData).map((key, ind) => {
        return (
          <FilterInput
            key={`${key}-${ind}`}
            onFilterInputData={filterInputHandler.bind(null, key)}
            filterName={key}
            filterType={filtersData[key]}
          />
        );
      })}

      <Button className="btn-secondary" type="submit">
        Apply Filters
      </Button>
    </form>
  );
};

export default FilterForm;
