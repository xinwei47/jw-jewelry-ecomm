import { useLocation } from 'react-router-dom';
import OrderDetails from '../components/OrderDetails';

import '../styles/pages/_order-confirmation.scss';

const OrderConfirmation = (props) => {
  const location = useLocation();
  const orderId = location.state;

  return (
    <div className='order-confirm'>
      <h1 className='heading--1 order-confirm__heading'>
        We have received your order!
      </h1>
      <div className='order-confirm__paragraph-box'>
        <p className='order-confirm__paragraph'>
          You will recieve an order confirmation email from us shortly. Once
          your package is shipped, we will send you a tracking number.
        </p>
      </div>

      <OrderDetails orderId={orderId} />
    </div>
  );
};

export default OrderConfirmation;
