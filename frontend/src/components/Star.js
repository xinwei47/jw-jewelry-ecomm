// source: https://www.30secondsofcode.org/react/s/star-rating

const Star = (props) => {
  return (
    <span data-star-id={props.starId} className="star" role="button">
      {props.marked ? '\u2605' : '\u2606'}
    </span>
  );
};

export default Star;
