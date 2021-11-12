// authorized by jwt token
import passport from 'passport';
import passportjwt from 'passport-jwt';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js';
import User from '../models/userModel.js';

export const jwtAuthentication = async (req, res, next) => {
  passport.authenticate('jwt', function (err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res
        .status(401)
        .send('You are not authorized to do that. Please login first.');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log(user);
      next();
    });
  })(req, res, next);
};
