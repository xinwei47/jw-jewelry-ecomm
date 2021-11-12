import { Link } from 'react-router-dom';
import Button from '../UI/Button';

import '../styles/components/_error.scss';

const Error = (props) => {
  return (
    <div className='error'>
      <h1 className='heading--1 error__heading'>Oops!</h1>
      <p className='error__text'>
        {props.errStatus} - {props.errMsg}
      </p>
      <div className='error__actions'>
        <Link to='/'>
          <Button className='btn-primary error__btn'>Go To Homepage</Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
