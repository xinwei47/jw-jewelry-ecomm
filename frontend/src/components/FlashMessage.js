import '../styles/components/_flash-message.scss';

const FlashMessage = (props) => {
  return (
    <div className='flash'>
      <p className='flash__text'>{props.children}</p>

      <div className='flash__close-btn'>
        <span className='flash__close-icon'>X</span>
      </div>
    </div>
  );
};
export default FlashMessage;
