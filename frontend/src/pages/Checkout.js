import Button from '../UI/Button';
import '../styles/pages/_checkout.scss';

const Checkout = () => {
  return (
    <>
      <div className='checkout'>
        <h1 className=''>Checkout Page</h1>
        {/* display email for logged in user */}
        <p>Email: test@test.com</p>
        <form action=''>
          {/* only ask for email for visitors  */}
          <div>
            <label htmlFor='email'>Email</label>
            <input type='text' id='email' />
          </div>
          <h3>1. Shipping address</h3>
          <div>
            <label htmlFor='firstName'>First Name</label>
            <input type='text' id='firstName' />
          </div>
          <div>
            <label htmlFor='lasttName'>Last Name</label>
            <input type='text' id='lasttName' />
          </div>
          <div>
            <label htmlFor='street'>Street Address</label>
            <input type='text' id='street' />
          </div>
          <div>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' />
          </div>
          <div>
            <label htmlFor='state'>State</label>
            <input type='text' id='state' />
          </div>
          <div>
            <label htmlFor='zip'>Zip Code</label>
            <input type='text' id='zip' />
          </div>

          <hr />

          <h3>2. Payment</h3>
          <div>
            <label htmlFor='cardNumber'>Card Number</label>
            <input type='text' id='cardNumber' />
          </div>
          <div>
            <label htmlFor='cardMonth'>MM</label>
            <input type='text' id='cardMonth' />
          </div>
          <div>
            <label htmlFor='cardYear'>YY</label>
            <input type='text' id='cardYear' />
          </div>
          <div>
            <label htmlFor='cardCvv'>CVV/CVC</label>
            <input type='text' id='cardCvv' />
          </div>
          <div>
            <label htmlFor='cardFirstName'>First Name</label>
            <input type='text' id='cardFirstName' />
          </div>
          <div>
            <label htmlFor='cardLastName'>Last Name</label>
            <input type='text' id='cardLastName' />
          </div>
          <h4>Billing address</h4>
          <div>
            <input type='checkbox' id='billingAddress' />
            <label htmlFor='billingAddress'>Same as shipping address</label>
          </div>
          <div>
            <label htmlFor='street'>Street Address</label>
            <input type='text' id='street' />
          </div>
          <div>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' />
          </div>
          <div>
            <label htmlFor='state'>State</label>
            <input type='text' id='state' />
          </div>
          <div>
            <label htmlFor='zip'>Zip Code</label>
            <input type='text' id='zip' />
          </div>
          <hr />

          <h3>3. Delivery</h3>
          <select name='' id=''>
            <option value='free'>5-Dday Free Shipping</option>
            <option value='expedited'>2-Dday Expedited Shipping</option>
            <option value='overnight'>Overnight shipping</option>
          </select>
          <div>
            <Button className='btn-primary' type='submit'>
              Place Order
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
