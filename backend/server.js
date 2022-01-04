import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo'; // create a MongoDB store for express session data rather than using the memory by default
import passport from 'passport';
import LocalStrategy from 'passport-local';
import passportjwt from 'passport-jwt';

import connectDB from './config/mongodb.js';
import User from './models/userModel.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();
connectDB(); // connect to mongoDB

const app = express();

// parse req.body
app.use(express.urlencoded({ extended: true }));
// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json());

// When in heroku production, use react build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
}

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
app.use('/shop', productRoutes);
app.use('/user', userRoutes);
app.use('/:prodId/reviews', reviewRoutes);

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

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port 8000`);
});
