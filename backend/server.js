import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo'; // create a MongoDB store for express session data rather than using the memory by default
import passport from 'passport';
import LocalStrategy from 'passport-local';
import passportjwt from 'passport-jwt';

import connectDB from './config/mongodb.js';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';
import User from './models/userModel.js';
import Review from './models/reviewModel.js';
import generateToken from './utils/generateToken.js';
import cleanUserFn from './utils/cleanUserData.js';
import catchAsync from './utils/catchAsync.js';
import asyncHandler from 'express-async-handler';

dotenv.config();
connectDB(); // connect to mongoDB

const app = express();

// parse req.body
app.use(express.urlencoded({ extended: true }));
// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json());

// configure session
const secret = process.env.SESSION_SECRET;
app.use(
  session({
    name: 'scid', // name our own session ID cookie instead of using default
    secret,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      secret,
      touchAfter: 24 * 60 * 60, // touch the file in this amount of seconds if no changes to the content and no need to resave.
    }),
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // expires after 7 days from now
      maxAge: 60 * 1000 * 60, // maxAge 1 hour
    },
  })
);

// configure passport
app.use(passport.initialize()); // 'passport.initializer()' middleware is required to initialize passport in an Express-based app
app.use(passport.session());

passport.serializeUser(User.serializeUser()); // 'serialization' tells how to store the data in a session
passport.deserializeUser(User.deserializeUser()); // 'deserialization' tells how to un-store the data in a session
// confiture passport local strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, User.authenticate())
);
// configure passport-jwt strategy
const JwtStrategy = passportjwt.Strategy;
const ExtractJwt = passportjwt.ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

// jwt_payload: an object literal containing the decoded JWT payload.
// done: a passport error first callback accepting arguments done(error, user, info)
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findById(jwt_payload.id, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        // console.log(user);
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

// ****** Routes ******
// product routes
// import { ExpressError } from './utils/catchError.js';

app.get(
  '/shop/products/:productName/:productId',
  asyncHandler(async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId).populate('reviews');

      return res.json(product);
    } catch (error) {
      return res.status(400).send('Product is not found.');
    }
  })
);

app.get('/shop/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const paramObj = req.query;

    let products;
    if (category === 'all') {
      products = await Product.find({ ...paramObj });
    } else {
      const { _id: categoryId } = await Category.findOne({ name: category });
      // console.log(`categoryId: ${categoryId}`);
      products = await Product.find({
        category: categoryId,
        ...paramObj,
      });
    }
    return res.json(products);
  } catch (error) {
    res.status(400).send('Page is not found.');
  }
});

app.get(
  '/categories',
  asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
  })
);

// user routes
app.get(
  '/get-authentication',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(req.user._id);

    if (!req.user) {
      res.status(401).send('Not Authorized');
    }
  }
);

app.get('/profile', function (req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Invalid username or password.');

    return res.json(req.user);
  })(req, res, next);
});

// 'register(user, password, cb)' is a statics method added by password-local-mongoose.
// It helps to register a new user instance by hashed a given password and also check if username is unique.
// It also saves data to Mongo automatically.
app.post('/sign-up', async (req, res) => {
  const { email, password } = req.body;
  // console.log(email);
  const user = new User({ email });
  try {
    const registerUser = await User.register(user, password);
    // console.log(registerUser);
    // login user automatically after new account created
    req.login(registerUser, (err) => {
      // run user input validation here on server
      const cleanUser = cleanUserFn(req.user);
      return res.json({
        ...cleanUser,
        token: generateToken(cleanUser._id),
      });
    });
  } catch (error) {
    return res.status(500).send('Something went wrong... Please try again.');
  }
});

// use custom callback for passport.authenticate: http://www.passportjs.org/docs/authenticate/
app.post('/sign-in', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) return next(err);

    if (!user) {
      return res
        .status(401)
        .send('Invalid email or password. Please try again.');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      const cleanUser = cleanUserFn(req.user);
      return res.json({
        ...cleanUser,
        token: generateToken(cleanUser._id),
      });
    });
  })(req, res, next);
});

app.get('/logout', (req, res, next) => {
  if (req.user) {
    req.logout();
    return res.send('Successfully logout!');
  }
});

app.put(
  '/change-password',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;
    // console.log(oldPassword, newPassword);

    await user.changePassword(oldPassword, newPassword, (err) => {
      if (err) {
        return res.status(500).send('Please enter correct password.');
      }
      return res.send('Password updated successfully.');
    });
  }
);

// If user is not logged in, will be redirected to login page
app.get(
  '/wishlist',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user = await req.user.populate('wishlist');
    const wishlist = user.wishlist;
    res.json(wishlist);
  }
);

app.post(
  '/add-to-wishlist',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { prodId } = req.body;

    const user = req.user; // jwt strategy was triggered to find user
    if (!user.wishlist.find((item) => item._id == prodId)) {
      user.wishlist.push(prodId);
      await user.save();
      res.json(user.wishlist);
    } else {
      res.send('Item is already in the wishlist');
    }
  }
);

app.put(
  '/remove-from-wishlist',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { prodId } = req.body;
    const { wishlist } = req.user;

    if (wishlist.find((item) => item._id == prodId)) {
      const updatedWishlist = wishlist.filter((item) => item._id != prodId);
      // by default, 'updateOne' return the document BEFORE the update
      await req.user.updateOne({ wishlist: updatedWishlist });
      const user = await User.findById(req.user._id);
      res.json(user.wishlist);
    } else {
      res.send('Item is not in the wishlist');
    }
  }
);

// review routes
app.post(
  '/review',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { _id: userId } = req.user;
    const { text, rating, product: prodId } = req.body;
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
      // return res.json(review);
      return res.send('Review is added successfully!');
    } catch (error) {
      return res.status(500).send('Something went wrong. Please try again.');
    }
  }
);

app.get('/reviews/:prodId', async (req, res) => {
  // try {
  const { prodId } = req.params;
  const reviews = await Review.find({ product: prodId }).populate('author');
  // console.log(reviews);
  res.json(reviews);
});

// only delete the review when the logged-in user is the author of the review
app.delete(
  '/review/:reviewId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
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
  }
);

// all other routes handling
app.use('*', (req, res, next) => {
  res.status(404).json('Page is not found');
  // next(error);
});

// basic error handler
app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

app.listen(8000, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port 8000`);
});
