import { useContext } from 'react';
import { Link } from 'react-router-dom';

import CartContext from '../store/cart-context';
import Button from '../UI/Button';
import '../styles/pages/_cart.scss';
import OrderSummary from '../components/OrderSummary';

const Cart = () => {
  const cartCtx = useContext(CartContext);
  return (
    <div className='cart'>
      <h1 className='heading--1 cart__heading'>
        My Cart ({cartCtx.products.length})
      </h1>

      {cartCtx.products.length > 0 && (
        <>
          <OrderSummary className='cart__order-summary' shippingCost={0} />
          <Link to='/checkout'>
            <Button className='btn-primary cart__checkout-btn'>Checkout</Button>
          </Link>
        </>
      )}
      {cartCtx.products.length === 0 && cartCtx.totalAmount === 0 && (
        <h3 className='heading--3 cart__empty'>Your cart is empty.</h3>
      )}
    </div>
  );
};

export default Cart;
