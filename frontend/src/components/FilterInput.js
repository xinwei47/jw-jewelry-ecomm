import { forwardRef, useState, useImperativeHandle } from 'react';
import '../styles/components/_filter-input.scss';
import '../styles/components/_form.scss';

const FilterInput = forwardRef((props, ref) => {
  const [filterCheckedState, setFilterCheckedState] = useState(
    new Array(props.filterType.length).fill(false)
  );

  // forward the 'setFilterCheckedState' function to the parent filterForm
  useImperativeHandle(ref, () => ({
    clearCheckedInput() {
      return setFilterCheckedState([false, false, false, false]);
    },
  }));

  const checkedStateHandler = (index) => {
    setFilterCheckedState((prevState) => {
      return prevState.map((item, ind) => (ind === index ? !item : item));
    });
  };

  props.onFilterInputData(filterCheckedState);
  // console.log(filterCheckedState); //[true, false, false, false]

  return (
    <>
      <div className='filter'>
        <legend className='filter__heading'>{props.filterName}</legend>

        {props.filterType.map((filter, index) => {
          return (
            <div
              className='form__checkbox filter__item'
              key={`${props.filterName}-${index}`}
            >
              <input
                // className='form__checkbox'
                type='checkbox'
                id={`${props.filterName}-checkbox-${index}`}
                name={filter}
                value={filter}
                checked={filterCheckedState[index]}
                onChange={() => {
                  checkedStateHandler(index);
                }}
              />
              <label
                className='filter__label'
                htmlFor={`${props.filterName}-checkbox-${index}`}
              >
                {filter}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
});

export default FilterInput;
