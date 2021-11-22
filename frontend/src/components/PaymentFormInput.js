const PaymentFormInput = () => {
  return (
    <>
      <div className='form__group-control'>
        <label htmlFor='cardNumber'>Card Number</label>
        <input type='text' id='cardNumber' name='cardNumber' />
      </div>
      <div className='form__group-control'>
        <label htmlFor='cardMonth'>MM</label>
        <input type='text' id='cardMonth' name='cardMonth' />
      </div>
      <div className='form__group-control'>
        <label htmlFor='cardYear'>YY</label>
        <input type='text' id='cardYear' name='cardYear' />
      </div>
      <div className='form__group-control'>
        <label htmlFor='cardCvv'>CVV/CVC</label>
        <input type='text' id='cardCvv' name='cardCvv' />
      </div>
      <div className='form__group-control'>
        <label htmlFor='cardFirstName'>First Name</label>
        <input type='text' id='cardFirstName' name='cardFirstName' />
      </div>
      <div className='form__group-control'>
        <label htmlFor='cardLastName'>Last Name</label>
        <input type='text' id='cardLastName' name='cardLastName' />
      </div>{' '}
    </>
  );
};

export default PaymentFormInput;
