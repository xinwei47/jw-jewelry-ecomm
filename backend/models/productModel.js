import mongoose from 'mongoose';

const { Schema } = mongoose;

// productSchema.set('toObject', { virtuals: true });
// productSchema.set('toJSON', { virtuals: true });

// create a virtual property to 'priceTier' that's computed from 'price'
// Mongoose virtual properties only exist in the Mongoose model representation of documents, not in MongoDB itself where the query is performed.
// Mongoose virtual properties cannot be used for field selection
// productSchema.virtual('priceTier').get(function () {
//   if (this.price < 100) {
//     return '0-100';
//   } else if (this.price < 200) {
//     return '100-200';
//   } else if (this.price < 300) {
//     return '200-300';
//   } else {
//     return '300+';
//   }
// });

const productSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  material: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
      // data: Buffer,
      // contentType: String,
      // required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceTier: {
    type: String,
    default: function () {
      if (this.price < 100) {
        return '0-100';
      } else if (this.price < 200) {
        return '100-200';
      } else if (this.price < 300) {
        return '200-300';
      } else {
        return '300+';
      }
    },
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('Product', productSchema);
