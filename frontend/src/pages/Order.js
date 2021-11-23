import { useParams, useHistory } from 'react-router-dom';
import OrderDetails from '../components/OrderDetails';

import '../styles/pages/_order.scss';
import Button from '../UI/Button';

const Order = () => {
  const { orderId } = useParams();
  const history = useHistory();

  return (
    <>
      <div className='order-review'>
        <Button
          className='btn-tertiary order-review__btn'
          onClick={() => history.goBack()}
        >
          Go Back
        </Button>
        <OrderDetails orderId={orderId} />
      </div>
    </>
  );
};

export default Order;
