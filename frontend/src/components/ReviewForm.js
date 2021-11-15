import { useRef, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import Button from '../UI/Button';
import { postReview } from '../lib/api';
import useHttp from '../hooks/use-http';

import '../styles/components/_review-form.scss';
import StarRating from './StarRating';

const ReviewForm = (props) => {
  const authCtx = useContext(AuthContext);
  const reviewInputRef = useRef();
  const [rating, setRating] = useState();

  const { productId } = useParams();
  // console.log(productId);
  const {
    sendRequest: reviewRequest,
    status: reviewRequestStatus,
    data: reviewRequestData,
  } = useHttp(postReview);

  const { token } = authCtx;

  const ratingSelectedHandler = (rating) => {
    setRating(rating);
  };

  const reviewFormSubmitHandler = async (event) => {
    event.preventDefault();
    const reviewText = reviewInputRef.current.value;
    // const reviewRating = ratingInputRef.current.value;
    // const reviewRating = rating;

    if (reviewText && rating) {
      const reviewContent = {
        text: reviewText,
        rating,
      };

      await reviewRequest(token, productId, reviewContent);
      // ratingInputRef.current.value = 3;

      // notify parent (ProductDetails) that a comment is added
      props.onAddedComment();
      // console.log(reviewRequestData);

      reviewInputRef.current.value = '';
      setRating(0);
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
          <label className='review-form__rating-heading' htmlFor=''>
            Rating:
          </label>
          <StarRating onRatingSelected={ratingSelectedHandler} />
        </div>
        <div className='review-form__group-control'>
          <textarea
            id='reviewText'
            rows='4'
            // cols="100"
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
