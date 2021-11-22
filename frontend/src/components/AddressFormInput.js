import { useRef } from 'react';

const AddressFormInput = (props) => {
  // const streetInputRef = useRef();
  // const cityInputRef = useRef();
  // const stateInputRef = useRef();
  // const zipInputRef = useRef();

  return (
    <>
      <div className='form__group-control'>
        <label htmlFor={`${props.addressType}Street`}>Street Address</label>
        <input
          type='text'
          id={`${props.addressType}Street`}
          name={`${props.addressType}Street`}
          onChange={props.onAddressInputChange}
          required
        />
      </div>
      <div className='form__group-control'>
        <label htmlFor={`${props.addressType}City`}>City</label>
        <input
          type='text'
          id={`${props.addressType}City`}
          name={`${props.addressType}City`}
          onChange={props.onAddressInputChange}
          required
        />
      </div>
      <div className='form__group-control'>
        <label htmlFor={`${props.addressType}State`}>State</label>
        <input
          type='text'
          id={`${props.addressType}State`}
          name={`${props.addressType}State`}
          onChange={props.onAddressInputChange}
          required
        />
      </div>
      <div className='form__group-control'>
        <label htmlFor={`${props.addressType}Zip`}>Zip Code</label>
        <input
          type='text'
          id={`${props.addressType}Zip`}
          name={`${props.addressType}Zip`}
          onChange={props.onAddressInputChange}
          required
        />
      </div>
    </>
  );
};

export default AddressFormInput;
