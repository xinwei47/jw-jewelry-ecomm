import User from '../models/userModel.js';
import passport from 'passport';
import cleanUserFn from '../utils/cleanUserData.js';
import generateToken from '../utils/generateToken.js';

const getUserProfile = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Invalid username or password.');

    // console.log(user);
    return res.json(req.user);
  })(req, res, next);
};

const loginUser = (req, res, next) => {
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
};

const registerUser = async (req, res, next) => {
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
};

const logoutUser = (req, res, next) => {
  if (req.user) {
    req.logout();
    return res.send('Successfully logout!');
  }
};

const changeUserPassword = async (req, res, next) => {
  const user = req.user;
  const { oldPassword, newPassword } = req.body;
  // console.log(oldPassword, newPassword);

  await user.changePassword(oldPassword, newPassword, (err) => {
    if (err) {
      return res.status(500).send('Please enter correct password.');
    }
    return res.send('Password updated successfully!');
  });
};

const getUserWishlist = async (req, res) => {
  const user = await req.user.populate('wishlist');
  const wishlist = user.wishlist;
  res.json(wishlist);
};

const addToUserWishlist = async (req, res) => {
  const { prodId } = req.body;

  const user = req.user; // jwt strategy was triggered to find user
  if (!user.wishlist.find((item) => item._id == prodId)) {
    user.wishlist.push(prodId);
    await user.save();
    res.json(user.wishlist);
  } else {
    res.send('Item is already in the wishlist');
  }
};

const removeFromUserWishlist = async (req, res) => {
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
};

const getUserAuth = (req, res) => {
  res.json(req.user._id);
  if (!req.user) {
    res.status(401).send('Not Authorized');
  }
};

export {
  getUserProfile,
  loginUser,
  registerUser,
  logoutUser,
  changeUserPassword,
  getUserWishlist,
  addToUserWishlist,
  removeFromUserWishlist,
  getUserAuth,
};
