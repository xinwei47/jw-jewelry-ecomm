import { useContext } from 'react';
import CartContext from '../store/cart-context';
import Button from '../UI/Button';
import '../styles/components/_order-summary.scss';

const OrderSummary = (props) => {
  const cartCtx = useContext(CartContext);

  return (
    <div className={`order-summary ${props.className}`}>
      <div className='order-summary__cost'>
        <div className='order-summary__cost-item'>
          <p>Subtotal: </p>
          <p>${cartCtx.totalAmount.toFixed(2)}</p>
        </div>
        <div className='order-summary__cost-item'>
          <p>Shipping & Handling: </p>
          <p>${props.shippingCost.toFixed(2)}</p>
        </div>
        <div className='order-summary__cost-item'>
          <p>Tax: </p>
          <p>${cartCtx.taxAmount.toFixed(2)}</p>
        </div>
        <hr />
        <div className='order-summary__cost-item order-summary__total-amt'>
          <p className=''>Total:</p>
          {/* <p className=''>${cartCtx.totalAmount.toFixed(2)}</p> */}
          <p className=''>
            ${(cartCtx.totalAmount * (1 + 0.1) + props.shippingCost).toFixed(2)}
          </p>
        </div>
      </div>

      <ul className='order-summary__list'>
        {cartCtx.products.map((product) => {
          // console.log(product);
          return (
            <li
              className='order-summary__item'
              key={`order-summary-item-${product._id}`}
            >
              <div className='order-summary__img-container'>
                <img
                  className='order-summary__item-img'
                  src={product.images[0]}
                  alt=''
                />
              </div>
              <div className='order-summary__item-summary'>
                <div className='order-summary__item-detail'>
                  <h4 className='heading--4 order-summary__item-name'>
                    {product.name}
                  </h4>
                  <p className='order-summary__item-price'>
                    price: ${product.price}
                  </p>
                  <p className='order-summary__item-qty'>qty: {product.qty}</p>
                </div>
                <div className='order-summary__actions'>
                  <Button
                    className='btn-secondary order-summary__delete-item'
                    onClick={() =>
                      cartCtx.onRemoveItem(product._id, product.price)
                    }
                  >
                    -
                  </Button>
                  <Button
                    className='btn-secondary order-summary__add-item'
                    onClick={() =>
                      cartCtx.onAddItem(
                        product._id,
                        product.name,
                        product.price,
                        product.images
                      )
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderSummary;
