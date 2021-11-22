import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';

import '../styles/components/_order-item.scss';
import mongoDateReformat from '../lib/reformat-date';

const OrderItem = (props) => {
  const [reformattedDate, setReformattedDate] = useState();

  useEffect(() => {
    const date = mongoDateReformat(props.item.date);
    setReformattedDate(date);
  }, [props.item.date]);

  return (
    <>
      <li className='order-item'>
        <p className='order-item__date'>{reformattedDate}</p>
        <p className='order-item__id'>{props.item._id}</p>
        <p className='order-item__shipping'>{props.item.shipping.method}</p>
        <Link
          className='order-item__link'
          to={`/user/orders/${props.item._id}`}
        >
          <Button className='btn-secondary order-item__btn'>
            View Details
          </Button>
        </Link>
      </li>
      <hr className='divider order-item__divider' />
    </>
  );
};

export default OrderItem;
