import '../styles/components/_flash-message.scss';
import Button from '../UI/Button';

const FlashMessage = (props) => {
  return (
    <div className='flash'>
      <p className='flash__text'>{props.children}</p>

      <Button className='flash__close-btn' onClick={() => props.closeFlash()}>
        <span className='flash__close-icon'>X</span>
      </Button>
    </div>
  );
};
export default FlashMessage;
