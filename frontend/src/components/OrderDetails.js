import { useEffect, useState } from 'react';
import { getSingleOrder } from '../lib/api';
import mongoDateReformat from '../lib/reformat-date';

import '../styles/components/_order-details.scss';

const OrderDetails = (props) => {
  const [order, setOrder] = useState();

  useEffect(() => {
    const getOrder = async (id) => {
      const order = await getSingleOrder(id);
      console.log(order);
      setOrder(order);
    };
    getOrder(props.orderId);
  }, [props.orderId]);

  if (order) {
    const {
      name,
      shipping,
      shippingAddress,
      billingAddress,
      user,
      date,
      email,
      orderItems,
      taxAmount,
      totalAmount,
    } = order;

    const {
      shippingStreet,
      shippingCity,
      shippingState,
      shippingZip,
    } = shippingAddress;

    const {
      billingStreet,
      billingCity,
      billingState,
      billingZip,
    } = billingAddress;

    const reformattedDate = mongoDateReformat(date);

    return (
      <>
        <div className='order'>
          <div className=''>
            <h2 className='heading--2 order__summary-heading'>Order Summary</h2>
            <p className='order__id'>
              <span className=''>Order Number: </span>
              {props.orderId}
            </p>
            <p className='order__date'>
              <span className=''>Order Date: </span>
              {reformattedDate}
            </p>
          </div>

          <div className='order__summary'>
            <div className='order__summary-section order__shipping-to'>
              <h3 className='heading--3 order__section-heading'>
                Shipping To:
              </h3>
              <p>
                {name.firstName} {name.lastName}
              </p>
              <p>
                {shippingStreet} {shippingCity}
              </p>
              <p>
                {shippingState} {shippingZip}
              </p>
            </div>

            <div className='order__summary-section order__billing-to'>
              <h3 className='heading--3 order__section-heading'>Billing To:</h3>
              <p>
                {billingStreet} {billingCity}
              </p>
              <p>
                {billingState} {billingZip}
              </p>
            </div>

            <div className='order__summary-section order__shipping-method'>
              <h3 className='heading--3 order__section-heading'>
                Shipping Method:
              </h3>
              <p>{shipping.method}</p>
            </div>

            <div className='order__summary-section order__payment'>
              <h3 className='heading--3 order__section-heading'>Payment:</h3>
              <p>Charged to Credit Card: ${totalAmount}</p>
            </div>
          </div>

          <div className='order__items'>
            <div className='order__items-heading'>
              <h3 className='heading--3'>Order Items</h3>
              <h3 className='heading--3'>Amount</h3>
            </div>
            <hr className='divider order__divider' />
            <ul className='order__items-list'>
              {orderItems.map((item) => {
                return (
                  <li
                    className='order__item'
                    key={`order-item-${item._id._id}`}
                  >
                    <div className='order__image-container'>
                      <img
                        src={item._id.images[0]}
                        alt=''
                        className='order__item-image'
                      />
                    </div>

                    <div className='order__item-details'>
                      <p className='order__item-name'>{item._id.name}</p>
                      <p className='order__item-price'>
                        Price: ${item._id.price.toFixed(2)}
                      </p>
                      <p className='order__item-qty'>Qty: {item.qty}</p>
                    </div>

                    <div className='order__item-amount'>
                      <p>${(item.qty * item._id.price).toFixed(2)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className='order__cost'>
            <div className='order__cost-item'>
              <p className=''>Shipping: </p>
              <p>${shipping.cost.toFixed(2)}</p>
            </div>
            <div className='order__cost-item'>
              <p className=''>Tax: </p>
              <p>${taxAmount.toFixed(2)}</p>
            </div>
            <hr className='divider order__divider' />
            <div className='order__cost-item'>
              <p className=''>Total:</p>
              <p>${(totalAmount + shipping.cost + taxAmount).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
  return '';
};

export default OrderDetails;
