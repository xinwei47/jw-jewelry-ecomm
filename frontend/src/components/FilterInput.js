import { useState } from 'react';

const FilterInput = (props) => {
  const [filterCheckedState, setFilterCheckedState] = useState(
    new Array(props.filterCriteria.length).fill(false)
  );

  const checkedStateHandler = (index) => {
    setFilterCheckedState((prevState) => {
      return prevState.map((item, ind) => (ind === index ? !item : item));
    });
  };

  props.onFilterInputData(filterCheckedState);

  return (
    <>
      <legend className='heading--4'>{props.filterName}</legend>

      {props.filterCriteria.map((filter, index) => {
        return (
          <div>
            <input
              type='checkbox'
              id={`${props.filterName}-checkbox-${index}`}
              name={filter}
              value={filter}
              checked={filterCheckedState[index]}
              onChange={() => {
                checkedStateHandler(index);
              }}
            />
            <label htmlFor={`${props.filterName}-checkbox-${index}`}>
              {filter}
            </label>
          </div>
        );
      })}
    </>
  );
};

export default FilterInput;
