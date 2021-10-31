import { useContext } from 'react';
import { Link } from 'react-router-dom';

import CartContext from '../store/cart-context';
import Button from '../UI/Button';
import '../styles/pages/_cart.scss';

const Cart = () => {
  const cartCtx = useContext(CartContext);
  console.log('cartCtx');
  console.log(cartCtx);
  return (
    <div className='cart'>
      <h2 className='cart__heading'>Cart</h2>
      <ul className='cart__list'>
        {cartCtx.products.map((product) => {
          // console.log(product);
          return (
            <li className='cart__item' key={`cart-item-${product._id}`}>
              {/* <img src={product.image} alt="" /> */}
              <p className='cart__item-name'>item: {product.name}</p>
              <p className='cart__item-price'>price: ${product.price}</p>
              <p className='cart__item-qty'>qty: {product.qty}</p>
              <div className='cart__actions'>
                <Button
                  className='btn-secondary cart__delete'
                  onClick={() =>
                    cartCtx.onRemoveItem(product._id, product.price)
                  }
                >
                  -
                </Button>
                <Button
                  className='btn-secondary cart__add'
                  onClick={() =>
                    cartCtx.onAddItem(
                      product._id,
                      product.name,
                      product.price,
                      product.image
                    )
                  }
                >
                  +
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
      {cartCtx.totalAmount !== 0 && (
        <>
          <h3 className='cart__total-amt'>
            total amount: {cartCtx.totalAmount}
          </h3>
          {/* only land the page if there are items in the cart */}
          <Link to='/checkout'>
            <Button className='btn btn-primary'>Checkout</Button>
          </Link>
        </>
      )}
      {cartCtx.totalAmount === 0 && (
        <h3 className='cart__total-amt'>Your cart is empty.</h3>
      )}
    </div>
  );
};

export default Cart;
