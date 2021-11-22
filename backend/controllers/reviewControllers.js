import Product from '../models/productModel.js';
import Review from '../models/reviewModel.js';

const postProdReview = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { text, rating } = req.body;
  const { prodId } = req.params;
  const review = new Review({
    product: prodId,
    author: userId,
    text,
    rating,
  });

  try {
    const product = await Product.findById(prodId);
    product.reviews.push(review);

    await review.save();
    await product.save();
    return res.send('Review is added successfully!');
  } catch (error) {
    return res.status(500).send('Something went wrong. Please try again.');
  }
};

const getProdReviews = async (req, res, next) => {
  const { prodId } = req.params;
  const reviews = await Review.find({ product: prodId }).populate('author');
  res.json(reviews);
};

const deleteProdReview = async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);
  if (review.author.equals(req.user._id)) {
    Review.findByIdAndDelete(reviewId, (err) => {
      if (err) {
        return res.send('You are not authorized.');
      }
      return res.send('Review is deleted successfully!');
    });
  }
};

export { postProdReview, getProdReviews, deleteProdReview };
