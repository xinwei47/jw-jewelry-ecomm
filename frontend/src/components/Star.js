// source: https://www.30secondsofcode.org/react/s/star-rating

const Star = (props) => {
  return (
    <span data-star-id={props.starId} className='star' role='button'>
      {/* half star: U+2BE8 */}
      {props.marked ? '\u2605' : '\u2606'}
      {/* {props.marked ? '\u2605' : undefined ? '\u2BE8' : '\u2606'} */}
    </span>
  );
};

export default Star;
