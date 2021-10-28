import mongoose from 'mongoose';
const { Schema } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  orders: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
});

// append passport-local-mongoose package to userSchema which will will automatically
// add a username, hash and salt field to store the username, the hashed password and the salt value.
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export default mongoose.model('User', userSchema);
