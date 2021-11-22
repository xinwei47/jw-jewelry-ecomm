import { useRef, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import Button from '../UI/Button';
import { postReview } from '../lib/api';
import useHttp from '../hooks/use-http';

import '../styles/components/_review-form.scss';
import '../styles/components/_form.scss';
import StarRating from './StarRating';

const ReviewForm = (props) => {
  const authCtx = useContext(AuthContext);
  const reviewInputRef = useRef();
  const [rating, setRating] = useState();

  const [ratingHasError, setRatingHasError] = useState(false);
  const [reviewHasError, setReviewHasError] = useState(false);

  const { productId } = useParams();
  const {
    sendRequest: reviewRequest,
    status: reviewRequestStatus,
    data: reviewRequestData,
  } = useHttp(postReview);

  const { token } = authCtx;

  const ratingSelectedHandler = (event) => {
    setRating(event.target.getAttribute('data-star-id') || rating);
  };

  const reviewFormSubmitHandler = async (event) => {
    event.preventDefault();
    const reviewText = reviewInputRef.current.value;

    if (!!rating === false) setRatingHasError(true);
    if (reviewText === '') setReviewHasError(true);

    if (reviewText && rating) {
      const reviewContent = {
        text: reviewText,
        rating,
      };

      await reviewRequest(token, productId, reviewContent);

      // notify parent (ProductDetails) that a comment is added
      props.onAddedComment();

      reviewInputRef.current.value = '';
      setRating(0); // not working
    } else {
      // display error message
      console.log('Rating and Review cannot be empty');
    }
  };

  const { onReviewData } = props;
  useEffect(() => {
    onReviewData(reviewRequestStatus, reviewRequestData);
  }, [onReviewData, reviewRequestStatus, reviewRequestData]);

  return (
    <>
      <form
        action=''
        onSubmit={reviewFormSubmitHandler}
        className='review-form'
      >
        <div className='review-form__group-control'>
          {ratingHasError && (
            <p className='form__err-msg'>Please select a rating.</p>
          )}
          <div className='review-form__rating'>
            <label className='review-form__rating-heading' htmlFor=''>
              Rating:
            </label>
            <StarRating onClickRating={ratingSelectedHandler} rating={rating} />
          </div>
        </div>
        <div className='review-form__group-control'>
          {reviewHasError && (
            <p className='form__err-msg'>Review cannot be empty.</p>
          )}
          <textarea
            id='reviewText'
            rows='4'
            ref={reviewInputRef}
            placeholder='Enter your review...'
            className='review-form__text'
            // required
          />
        </div>
        <div className='review-form__actions'>
          <Button type='submit' className='btn-primary review-form__btn'>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default ReviewForm;
