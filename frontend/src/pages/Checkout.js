import { useContext, useState, useEffect, useRef } from 'react';
import AuthContext from '../store/auth-context';
import { fetchUserData, getUserId, postOrder } from '../lib/api';

import Button from '../UI/Button';
import '../styles/pages/_checkout.scss';
import '../styles/components/_form.scss';
import CartContext from '../store/cart-context';
import OrderSummary from '../components/OrderSummary';
import AddressFormInput from '../components/AddressFormInput';
import PaymentFormInput from '../components/PaymentFormInput';

import { useHistory } from 'react-router-dom';

const Checkout = (props) => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [checkedBillingAddress, setCheckedBillingAddress] = useState(true);
  const [freeShipping, setFreeShipping] = useState(0);
  const [expeditedShipping, setExpeditedShipping] = useState(0);
  const [overnightShipping, setOvernightShipping] = useState(0);

  const emailInputRef = useRef();
  const freeShippingInputRef = useRef();
  const expeditedShippingInputRef = useRef();
  const overnightShippingInputRef = useRef();
  const firstNameInputRef = useRef();
  const lasttNameInputRef = useRef();

  const billingAddressCheckHandler = () => {
    setCheckedBillingAddress((prevState) => !prevState);
  };

  const emailChangeHandler = (event) => setEmail(event.target.value);

  useEffect(() => {
    if (authCtx.token) {
      const getUserEmail = async () => {
        const user = await fetchUserData(authCtx.token);
        setEmail(user.email);
      };
      getUserEmail();
    }
  }, [authCtx.token]);

  const [shippingFee, setShippingFee] = useState(0);
  useEffect(() => {
    setShippingFee(
      Math.max(freeShipping, expeditedShipping, overnightShipping)
    );
  }, [freeShipping, expeditedShipping, overnightShipping]);

  // set defaul userId as null that matches the Order model
  const [userId, setUserId] = useState();
  useEffect(() => {
    const getUser = async () => {
      if (authCtx.token) {
        const userId = await getUserId(authCtx.token);
        setUserId(userId);
      }
    };
    getUser();
  }, [authCtx.token]);

  const checkoutformSubmitHandler = async (event) => {
    event.preventDefault();

    // redirect user to order-confirmation page
    // meanwhile pass the new order data to the order-confirmation component
    const orderData = {
      user: userId,
      name: {
        firstName: firstNameInputRef.current.value,
        lastName: lasttNameInputRef.current.value,
      },
      email,
      orderItems: cartCtx.products,
      shipping: {
        method:
          shippingFee === 0
            ? '5-Day Free Shipping'
            : shippingFee === 8
            ? '2-Day Expedited Shipping'
            : 'Overnight Shipping',
        cost: shippingFee,
      },
      taxAmount: cartCtx.taxAmount,
      totalAmount: cartCtx.totalAmount,
      shippingAddress,
      billingAddress,
    };

    // clear cart
    cartCtx.onClearCart();
    const order = await postOrder(userId, orderData);

    history.push({
      pathname: '/user/order-confirmation',
      // state: order,
      state: order._id,
    });
  };

  const [shippingAddress, setShippingAddress] = useState({
    shippingStreet: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
  });

  const [billingAddress, setBillingAddress] = useState({});
  useEffect(() => {
    if (checkedBillingAddress) {
      setBillingAddress({
        billingStreet: shippingAddress.shippingStreet,
        billingCity: shippingAddress.shippingCity,
        billingState: shippingAddress.shippingState,
        billingZip: shippingAddress.shippingZip,
      });
    } else {
      setBillingAddress({
        billingStreet: '',
        billingCity: '',
        billingState: '',
        billingZip: '',
      });
    }
  }, [checkedBillingAddress, shippingAddress]);

  const shippingAddressInputHandler = (event) => {
    const { name, value } = event.target;
    setShippingAddress((prevState) => ({ ...prevState, [name]: value }));
  };

  const billingAddressInputHandler = (event) => {
    // if (!checkedBillingAddress) {
    const { name, value } = event.target;
    setBillingAddress((prevState) => ({ ...prevState, [name]: value }));
    // }
  };

  return (
    <>
      <div className='checkout'>
        {/* display email for logged in user */}
        <h1 className=''>Checkout</h1>

        <div className='checkout__container'>
          <form action='' className='form' onSubmit={checkoutformSubmitHandler}>
            {/* only ask for email for visitors. auto fill in email for logged-in users  */}
            <div className='form__group-control checkout__email'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                value={email ? email : ''}
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
                  <input
                    ref={firstNameInputRef}
                    type='text'
                    id='firstName'
                    name='firstName'
                  />
                </div>
                <div className='form__group-control'>
                  <label htmlFor='lastName'>Last Name</label>
                  <input
                    ref={lasttNameInputRef}
                    type='text'
                    id='lastName'
                    name='lastName'
                  />
                </div>

                <AddressFormInput
                  addressType='shipping'
                  onAddressInputChange={shippingAddressInputHandler}
                />
              </div>
            </div>
            <hr />

            <div className='form__section'>
              <h3 className='heading--3 form__section-heading'>2. Payment</h3>
              <div className='form__section-content'>
                <PaymentFormInput />
              </div>
            </div>

            <div className='form__section'>
              <h4 className='form__section-subheading'>Billing address</h4>
              <div className='form__section-content'>
                <div className='form__checkbox'>
                  <input
                    type='checkbox'
                    id='billingAddress'
                    onChange={billingAddressCheckHandler}
                    checked={checkedBillingAddress}
                  />
                  <label htmlFor='billingAddress'>
                    Same as shipping address
                  </label>
                </div>
                {!checkedBillingAddress && (
                  <AddressFormInput
                    addressType='billing'
                    onAddressInputChange={billingAddressInputHandler}
                  />
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
                shippingCost={shippingFee}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
