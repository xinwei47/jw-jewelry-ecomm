// source: https://www.30secondsofcode.org/react/s/star-rating
// code with customization

import { useEffect, useState } from 'react';
import Star from './Star';

const StarRating = (props) => {
  const [rating, setRating] = useState(0);
  const [selection, setSelection] = useState(0);

  const hoverOver = (event) => {
    let val = 0;
    if (event && event.target && event.target.getAttribute('data-star-id'))
      val = event.target.getAttribute('data-star-id');
    setSelection(val);
  };

  const selectRatingHandler = (event) => {
    setRating(event.target.getAttribute('data-star-id') || rating);
  };

  useEffect(() => {
    props.onRatingSelected(rating);
  }, [props.onRatingSelected, rating]);

  return (
    <div
      onMouseOut={() => hoverOver(null)}
      onClick={selectRatingHandler}
      onMouseOver={hoverOver}
    >
      {Array.from({ length: 5 }, (el, i) => (
        <Star
          starId={i + 1}
          key={`star_${i + 1}`}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </div>
  );
};

export default StarRating;
