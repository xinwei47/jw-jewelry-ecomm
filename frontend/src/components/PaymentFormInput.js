const PaymentFormInput = (props) => {
  return (
    <>
      <div className='form__group-control'>
        <label htmlFor='cardNumber'>Card Number*</label>
        <input
          type='text'
          id='cardNumber'
          name='cardNumber'
          onChange={props.onPaymentInputChange}
        />
      </div>
      <div className='form__group-control'>
        <label htmlFor='cardMonth'>MM*</label>
        <input
          type='text'
          id='cardMonth'
          name='cardMonth'
          onChange={props.onPaymentInputChange}
        />
      </div>
      <div className='form__group-control'>
        <label htmlFor='cardYear'>YY*</label>
        <input
          type='text'
          id='cardYear'
          name='cardYear'
          onChange={props.onPaymentInputChange}
        />
      </div>
      <div className='form__group-control'>
        <label htmlFor='cardCvv'>CVV/CVC*</label>
        <input
          type='text'
          id='cardCvv'
          name='cardCvv'
          onChange={props.onPaymentInputChange}
        />
      </div>
      <div className='form__group-control'>
        <label htmlFor='cardFirstName'>First Name*</label>
        <input
          type='text'
          id='cardFirstName'
          name='cardFirstName'
          onChange={props.onPaymentInputChange}
        />
      </div>
      <div className='form__group-control'>
        <label htmlFor='cardLastName'>Last Name*</label>
        <input
          type='text'
          id='cardLastName'
          name='cardLastName'
          onChange={props.onPaymentInputChange}
        />
      </div>
    </>
  );
};

export default PaymentFormInput;
