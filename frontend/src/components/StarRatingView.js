// source: https://www.30secondsofcode.org/react/s/star-rating
// new component added based on the source

import { useEffect, useState } from 'react';
import Star from './Star';

const StarRatingView = (props) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(props.value);
  }, [props.value]);

  return (
    <div>
      {Array.from({ length: 5 }, (el, i) => (
        <Star
          starId={i + 1}
          key={`star_${i + 1}`}
          marked={i + 1 <= rating ? true : false}
          // marked={
          //   rating - (i + 1) >= 1
          //     ? true
          //     : rating - (i + 1) < 1 && rating - (i + 1) > 0
          //     ? false
          //     : undefined
          // }
        />
      ))}
    </div>
  );
};

export default StarRatingView;
