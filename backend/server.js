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
import generateToken from './utils/generateToken.js';

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
passport.use(
  new LocalStrategy({ usernameField: 'email' }, User.authenticate())
);
passport.serializeUser(User.serializeUser()); // 'serialization' tells how to store the data in a session
passport.deserializeUser(User.deserializeUser()); // 'deserialization' tells how to un-store the data in a session

// ================================================
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
// ================================================

// ****************************
// Helper function
const cleanUserFn = (reqUserData) => {
  const user = JSON.parse(JSON.stringify(reqUserData)); // hack to copy the req.user inro a new object
  const cleanUser = Object.assign({}, user);
  delete cleanUser.hash;
  delete cleanUser.salt;
  return cleanUser;
};

// ****************************

// Routes
// product routes
app.get('/shop/products/:productName/:productId', async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  res.json(product);
});

app.get('/shop/:category', async (req, res) => {
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

  res.json(products);
});

app.get('/categories', async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// user routes

app.get(
  '/profile',
  // passport.authenticate will trigger the jwt strategy and return the founded user data
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // console.log(req.headers.authorization); // receive the jwt token
    // console.log(req.user);
    res.json(req.user);
  }
);

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
    console.log(error);
  }
});

app.post('/sign-in', passport.authenticate('local'), (req, res) => {
  const cleanUser = cleanUserFn(req.user);
  return res.json({
    ...cleanUser,
    token: generateToken(cleanUser._id),
  });
});

// use custom callback for passport.authenticate: http://www.passportjs.org/docs/authenticate/
// app.post('/sign-in', function (req, res, next) {
//   passport.authenticate('local', function (err, user, info) {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.json({ error: 'Login failed' });
//     }
//     req.logIn(user, function (err) {
//       if (err) {
//         return next(err);
//       }
//       const cleanUser = cleanUserFn(req.user);
//       return res.json({
//         ...cleanUser,
//         token: generateToken(cleanUser._id),
//       });
//     });
//   })(req, res, next);
// });

app.get('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    return res.json({ success: 'Successfully logout!' });
  } else {
    return res.json({ error: 'You are not login.' });
  }
});

// basic error handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh no, something went wrong!';
  // res.status(statusCode).json({ error: err });
  res.status(statusCode).send('something is wrong');
});

app.listen(8000, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port 8000`);
});
