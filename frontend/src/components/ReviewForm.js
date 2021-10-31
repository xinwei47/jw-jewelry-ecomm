import { useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import Button from '../UI/Button';
import { postReview } from '../lib/api';
import useHttp from '../hooks/use-http';

const ReviewForm = (props) => {
  const authCtx = useContext(AuthContext);
  const reviewInputRef = useRef();
  const ratingInputRef = useRef();
  const { productId } = useParams();

  const { sendRequest: reviewRequest, status: reviewRequestStatus } = useHttp(
    postReview
  );

  const { token } = authCtx;
  const reviewFormSubmitHandler = async (event) => {
    event.preventDefault();
    const reviewText = reviewInputRef.current.value;
    const reviewRating = ratingInputRef.current.value;
    const reviewContent = {
      text: reviewText,
      rating: reviewRating,
    };
    await reviewRequest(token, productId, reviewContent);
    reviewInputRef.current.value = '';
    ratingInputRef.current.value = 3;

    // notify parent (ProductDetails) that a comment is added
    props.onAddedComment();
  };

  return (
    <>
      <h3>Write a review</h3>
      <form
        action=''
        onSubmit={reviewFormSubmitHandler}
        className='form review-form'
      >
        <div className='review-form__group-control'>
          <label htmlFor=''>Rating</label>
          <input
            type='range'
            min='1'
            max='5'
            defaultValue='3'
            ref={ratingInputRef}
          />
        </div>
        <div className='review-form__group-control'>
          {/* <label htmlFor='reviewText'>Write a review</label> */}
          <textarea
            id='reviewText'
            rows='5'
            cols='100'
            ref={reviewInputRef}
            placeholder='Enter your review...'
          />
        </div>

        <Button type='submit' className='btn-primary'>
          Submit
        </Button>
      </form>
    </>
  );
};

export default ReviewForm;
