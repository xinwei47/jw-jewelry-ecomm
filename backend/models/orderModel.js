import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: {
    type: String,
    required: true,
  },
  orderItems: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      qty: {
        type: Number,
        // required: true,
        default: 1,
      },
    },
  ],
  shipping: {
    method: { type: String, required: true },
    cost: { type: Number, required: true },
  },
  taxAmount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    shippingStreet: { type: String, required: true },
    shippingCity: { type: String, required: true },
    shippingState: { type: String, required: true },
    shippingZip: { type: String, required: true },
  },
  billingAddress: {
    billingStreet: { type: String, required: true },
    billingCity: { type: String, required: true },
    billingState: { type: String, required: true },
    billingZip: { type: String, required: true },
  },
  date: {
    type: Date,
    default: Date.now,
    timestamps: false,
  },
});

export default mongoose.model('Order', orderSchema);
