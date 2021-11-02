import ReviewItem from './ReviewItem';

const Reviews = (props) => {
  return (
    <ul className="reviews">
      {props.reviews.map((review) => {
        return (
          <ReviewItem
            key={review._id}
            review={review}
            reviewsByAuthUser={props.reviewsByAuthUser}
            onDeleteReview={props.onDeleteReview}
          />
        );
      })}
    </ul>
  );
};

export default Reviews;
