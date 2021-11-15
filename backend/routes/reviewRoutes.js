import express from 'express';
import passport from 'passport';
import {
  deleteProdReview,
  getProdReviews,
  postProdReview,
} from '../controllers/reviewControllers.js';
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), postProdReview)
  .get(getProdReviews);

router
  .route('/:reviewId')
  .delete(passport.authenticate('jwt', { session: false }), deleteProdReview);

export default router;
