import '../styles/components/_card.scss';

const Card = (props) => {
  return (
    <div className='card'>
      <div className='card__img-container'>
        <img className='card__img' src={props.src} alt={props.alt} />
      </div>
      <div className='card__text'>
        <p className='card__title'>{props.title}</p>
        {props.children}
      </div>
    </div>
  );
};

export default Card;
