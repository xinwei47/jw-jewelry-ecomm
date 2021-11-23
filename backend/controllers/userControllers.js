import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import passport from 'passport';
import cleanUserFn from '../utils/cleanUserData.js';
import generateToken from '../utils/generateToken.js';

const getUserProfile = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Invalid username or password.');

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

const getUserWishlist = async (req, res, next) => {
  if (req.user) {
    const user = await req.user.populate('wishlist');
    const wishlist = user.wishlist;
    return res.json(wishlist);
  }
};

const addToUserWishlist = async (req, res, next) => {
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

const removeFromUserWishlist = async (req, res, next) => {
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

const getUserAuth = (req, res, next) => {
  res.json(req.user._id);
  if (!req.user) {
    res.status(401).send('Not Authorized');
  }
};

const postUserOrder = async (req, res, next) => {
  const { userId, orderData } = req.body;
  const order = new Order(orderData);
  await order.save();
  if (userId) {
    const user = await User.findById(userId);
    user.orders.push(order);
    await user.save();
  }
  res.json(order);
};

const getUserOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId).populate({
      path: 'orderItems',
      populate: { path: '_id', model: 'Product' },
    });
    res.json(order);
  } catch (error) {
    res.status(500).send('Something went wrong... Please try again.');
  }
};

const getUserOrders = async (req, res, next) => {
  const user = req.user;
  await user.populate({
    path: 'orders',
    populate: {
      path: 'orderItems',
      populate: { path: '_id', model: 'Product' },
    },
  });
  res.json(user.orders);
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
  postUserOrder,
  getUserOrder,
  getUserOrders,
};
