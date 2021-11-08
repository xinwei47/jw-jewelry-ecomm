import { useContext, useState, useEffect, useRef } from 'react';
import AuthContext from '../store/auth-context';
import { fetchUserData } from '../lib/api';

import Button from '../UI/Button';
import '../styles/pages/_checkout.scss';
import '../styles/components/_form.scss';
import CartContext from '../store/cart-context';
import OrderSummary from '../components/OrderSummary';

const Checkout = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const [email, setEmail] = useState('');
  const [checkedBillingAddress, setCheckedBillingAddress] = useState(true);

  const [freeShipping, setFreeShipping] = useState(0);
  const [expeditedShipping, setExpeditedShipping] = useState(0);
  const [overnightShipping, setOvernightShipping] = useState(0);

  const freeShippingInputRef = useRef();
  const expeditedShippingInputRef = useRef();
  const overnightShippingInputRef = useRef();

  const billingAddressHandler = () => {
    setCheckedBillingAddress((prevState) => !prevState);
  };

  const emailChangeHandler = () => {};

  useEffect(() => {
    if (authCtx.token) {
      const getUserEmail = async () => {
        const user = await fetchUserData(authCtx.token);
        setEmail(user.email);
      };
      getUserEmail();
    }
  }, [authCtx.token]);

  return (
    <>
      <div className='checkout'>
        {/* display email for logged in user */}
        <h1 className=''>Checkout</h1>

        <div className='checkout__container'>
          <form action='' className='form'>
            {/* only ask for email for visitors  */}
            <div className='form__group-control checkout__email'>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                id='email'
                value={email ? email : ''}
                disabled={email ? true : false}
                onChange={emailChangeHandler}
              />
            </div>

            <div className='form__section'>
              <h3 className='heading--3 form__section-heading'>
                1. Shipping address
              </h3>
              <div className='form__section-content'>
                <div className='form__group-control'>
                  <label htmlFor='firstName'>First Name</label>
                  <input type='text' id='firstName' />
                </div>
                <div className='form__group-control'>
                  <label htmlFor='lasttName'>Last Name</label>
                  <input type='text' id='lasttName' />
                </div>
                <div className='form__group-control'>
                  <label htmlFor='street'>Street Address</label>
                  <input type='text' id='street' />
                </div>
                <div className='form__group-control'>
                  <label htmlFor='city'>City</label>
                  <input type='text' id='city' />
                </div>
                <div className='form__group-control'>
                  <label htmlFor='state'>State</label>
                  <input type='text' id='state' />
                </div>
                <div className='form__group-control'>
                  <label htmlFor='zip'>Zip Code</label>
                  <input type='text' id='zip' />
                </div>
              </div>
            </div>
            <hr />

            <div className='form__section'>
              <h3 className='heading--3 form__section-heading'>2. Payment</h3>
              <div className='form__section-content'>
                <div className='form__group-control'>
                  <label htmlFor='cardNumber'>Card Number</label>
                  <input type='text' id='cardNumber' />
                </div>
                <div className='form__group-control'>
                  <label htmlFor='cardMonth'>MM</label>
                  <input type='text' id='cardMonth' />
                </div>
                <div className='form__group-control'>
                  <label htmlFor='cardYear'>YY</label>
                  <input type='text' id='cardYear' />
                </div>
                <div className='form__group-control'>
                  <label htmlFor='cardCvv'>CVV/CVC</label>
                  <input type='text' id='cardCvv' />
                </div>
                <div className='form__group-control'>
                  <label htmlFor='cardFirstName'>First Name</label>
                  <input type='text' id='cardFirstName' />
                </div>
                <div className='form__group-control'>
                  <label htmlFor='cardLastName'>Last Name</label>
                  <input type='text' id='cardLastName' />
                </div>
              </div>
            </div>

            <div className='form__section'>
              <h4 className='form__section-subheading'>Billing address</h4>
              <div className='form__section-content'>
                <div className='form__checkbox'>
                  <input
                    type='checkbox'
                    id='billingAddress'
                    onChange={billingAddressHandler}
                    checked={checkedBillingAddress}
                  />
                  <label htmlFor='billingAddress'>
                    Same as shipping address
                  </label>
                </div>
                {!checkedBillingAddress && (
                  <>
                    <div className='form__group-control'>
                      <label htmlFor='street'>Street Address</label>
                      <input type='text' id='street' />
                    </div>
                    <div className='form__group-control'>
                      <label htmlFor='city'>City</label>
                      <input type='text' id='city' />
                    </div>
                    <div className='form__group-control'>
                      <label htmlFor='state'>State</label>
                      <input type='text' id='state' />
                    </div>
                    <div className='form__group-control'>
                      <label htmlFor='zip'>Zip Code</label>
                      <input type='text' id='zip' />
                    </div>
                  </>
                )}
              </div>
            </div>
            <hr />

            <div className='form__section'>
              <h3 className='heading--3 form__section-heading'>3. Delivery</h3>
              <div className='form__section-content'>
                <div className='form__group-control form__radio'>
                  <input
                    type='radio'
                    id='free-shipping'
                    name='shipping'
                    value='0'
                    ref={freeShippingInputRef}
                    onClick={() =>
                      setFreeShipping(freeShippingInputRef.current.value)
                    }
                  />
                  <label htmlFor='free-shipping'>
                    5-Day Free Shipping - $0
                  </label>
                </div>
                <div className='form__group-control form__radio'>
                  <input
                    type='radio'
                    id='expedited-shipping'
                    name='shipping'
                    value='8'
                    ref={expeditedShippingInputRef}
                    onClick={() =>
                      setExpeditedShipping(
                        expeditedShippingInputRef.current.value
                      )
                    }
                  />
                  <label htmlFor='expedited-shipping'>
                    2-Day Expedited Shipping - $8
                  </label>
                </div>
                <div className='form__group-control form__radio'>
                  <input
                    type='radio'
                    id='overnight-shipping'
                    name='shipping'
                    value='15'
                    ref={overnightShippingInputRef}
                    onClick={() =>
                      setOvernightShipping(
                        overnightShippingInputRef.current.value
                      )
                    }
                  />
                  <label htmlFor='overnight-shipping'>
                    Overnight Shipping - $15
                  </label>
                </div>
              </div>
              <div className='form__actions form__btn'>
                <Button className='btn-primary' type='submit'>
                  Place Order
                </Button>
              </div>
            </div>
          </form>

          {cartCtx.products && (
            <div className='checkout__right'>
              <h3 className='heading--3'>Order Summary</h3>
              <OrderSummary
                className='checkout__order-summary'
                shippingCost={Math.max(
                  freeShipping,
                  expeditedShipping,
                  overnightShipping
                )}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
