import { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from '../store/auth-context';
import Button from '../UI/Button';
import StarRatingView from './StarRatingView';

import '../styles/components/_review-item.scss';

const ReviewItem = (props) => {
  const authCtx = useContext(AuthContext);

  const [reviewDate, setReviewDate] = useState();

  // remove the timestamp from the date received from mongoDB
  const mongoDateReformat = useCallback((date) => {
    const newDate = new Date(date);
    const mm = newDate.getMonth();
    const dd = newDate.getDate();
    const yy = newDate.getFullYear();

    const reformatDate = `${mm}/${dd}/${yy}`;
    setReviewDate(reformatDate);
  }, []);

  useEffect(() => {
    mongoDateReformat(props.review.date);
  }, [mongoDateReformat, props.review.date]);

  return (
    <li className='review'>
      {/* <p className="review__date">{props.review.date}</p> */}
      <p className='review__date'>{reviewDate}</p>
      <p className='review__author'>{props.review.author.email}</p>
      {/* <p className="review__rating">{props.review.rating}</p> */}
      <StarRatingView value={props.review.rating} />
      <p className='review__text'>{props.review.text}</p>

      {/* only logged in user who is also the review author can see the delete button   */}
      <div className='review__actions'>
        {authCtx.isAuthenticated &&
          !!props.reviewsByAuthUser.find(
            (reviewByAuth) => reviewByAuth._id === props.review._id
          ) && (
            <Button
              className='btn-tertiary review__delete-btn'
              onClick={props.onDeleteReview.bind(null, props.review._id)}
            >
              DELETE
            </Button>
          )}
      </div>
    </li>
  );
};

export default ReviewItem;
