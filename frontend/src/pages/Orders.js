import { useContext, useEffect } from 'react';
import AuthContext from '../store/auth-context';
import useHttp from '../hooks/use-http';
import { getOrders } from '../lib/api';
import OrderItem from './OrderItem';

import '../styles/pages/_orders.scss';

const Orders = () => {
  const authCtx = useContext(AuthContext);

  const {
    sendRequest: sendOrdersRequest,
    data: orders,
    // error: ordersRequestError,
  } = useHttp(getOrders);
  console.log(orders);

  useEffect(() => {
    sendOrdersRequest(authCtx.token);
  }, [sendOrdersRequest, authCtx.token]);

  return (
    <div className='orders'>
      <h1 className='heading--1 page-heading'>My Orders</h1>
      {orders.length !== 0 ? (
        <>
          <div className='orders__column-headings'>
            <p className='orders__column-heading'>Order Date</p>
            <p className='orders__column-heading'>Order Number</p>
            <p className='orders__column-heading'>Shipping</p>
            <p className='orders__column-heading'>Details</p>
          </div>
          <ul className='orders__list'>
            {orders.map((order, ind) => {
              return <OrderItem key={`order-item-${ind}`} item={order} />;
            })}
          </ul>
        </>
      ) : (
        <div className='orders__text-box'>
          <p className='orders__text'>You have no orders.</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
