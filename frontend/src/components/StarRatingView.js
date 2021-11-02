// source: https://www.30secondsofcode.org/react/s/star-rating
// new component added based on the source

import { useEffect, useState } from 'react';
import Star from './Star';

const StarRatingView = (props) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(props.value);
  }, []);

  return (
    <div>
      {Array.from({ length: 5 }, (el, i) => (
        <Star
          starId={i + 1}
          key={`star_${i + 1}`}
          marked={i + 1 <= rating ? true : false}
        />
      ))}
    </div>
  );
};

export default StarRatingView;
