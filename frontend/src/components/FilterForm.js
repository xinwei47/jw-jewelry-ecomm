import FilterInput from './FilterInput';
import Button from '../UI/Button';

const FilterForm = (props) => {
  const updatedFilterResults = {};

  const filterInputHandler = (key, data) => {
    const resultIndex = data
      .map((item, ind) => (item === true ? ind : ''))
      .filter((item) => item !== '');

    const resultsArr = resultIndex.map((ind) => props.filters[key][ind]);

    updatedFilterResults[key] = resultsArr;
  };

  console.log(updatedFilterResults);
  props.onUpdatedFilterResults(updatedFilterResults);

  return (
    <form onSubmit={props.onFiltersSubmit}>
      {Object.keys(props.filters).map((key, ind) => {
        return (
          <FilterInput
            onFilterInputData={filterInputHandler.bind(null, key)}
            filterName={key}
            filterCriteria={props.filters[key]}
          />
        );
      })}

      <Button className='btn-secondary' type='submit'>
        Apply Filters
      </Button>
    </form>
  );
};

export default FilterForm;
