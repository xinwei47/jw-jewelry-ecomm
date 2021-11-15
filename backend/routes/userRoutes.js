import express from 'express';
import passport from 'passport';
const router = express.Router();

import {
  addToUserWishlist,
  changeUserPassword,
  getUserAuth,
  getUserProfile,
  getUserWishlist,
  loginUser,
  logoutUser,
  registerUser,
  removeFromUserWishlist,
} from '../controllers/userControllers.js';

router.route('/profile').get(getUserProfile);
router.route('/sign-in').post(loginUser);
router.route('/sign-up').post(registerUser);
router.route('/logout').get(logoutUser);
router
  .route('/change-password')
  .put(passport.authenticate('jwt', { session: false }), changeUserPassword);
router.route('/wishlist').get(getUserWishlist);
router
  .route('/add-to-wishlist')
  .post(passport.authenticate('jwt', { session: false }), addToUserWishlist);
router
  .route('/remove-from-wishlist')
  .put(
    passport.authenticate('jwt', { session: false }),
    removeFromUserWishlist
  );
router
  .route('/get-authentication')
  .get(passport.authenticate('jwt', { session: false }), getUserAuth);

export default router;
