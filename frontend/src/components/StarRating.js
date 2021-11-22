// source: https://www.30secondsofcode.org/react/s/star-rating
// code with customization

import { useState } from 'react';
import Star from './Star';

const StarRating = (props) => {
  const [selection, setSelection] = useState(0);

  const hoverOver = (event) => {
    let val = 0;
    if (event && event.target && event.target.getAttribute('data-star-id'))
      val = event.target.getAttribute('data-star-id');
    setSelection(val);
  };

  return (
    <div
      onMouseOut={() => hoverOver(null)}
      // set the rating in parent ReviewForm
      onClick={props.onClickRating}
      onMouseOver={hoverOver}
    >
      {Array.from({ length: 5 }, (el, i) => (
        <Star
          key={`star_${i + 1}`}
          starId={i + 1}
          marked={selection ? selection >= i + 1 : props.rating >= i + 1}
        />
      ))}
    </div>
  );
};

export default StarRating;
