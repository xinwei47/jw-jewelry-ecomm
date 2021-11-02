import { Link } from 'react-router-dom';
import '../styles/components/_card.scss';

const Card = (props) => {
  return (
    <Link className="card" to={props.link}>
      <div className="card__img-container">
        <img className="card__img" src={props.src} alt={props.alt} />
      </div>
      <div className="card__text">
        <p className="card__title">{props.title}</p>
        {props.children}
      </div>
    </Link>
  );
};

export default Card;
