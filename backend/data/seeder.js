import dotenv from 'dotenv';
import connectDB from '../config/mongodb.js';
import { descriptors, materials } from './seedHelpers.js';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

dotenv.config();
connectDB();

// retrieve categories data

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const importData = async () => {
  try {
    await Product.deleteMany({});

    const categories = await Category.find({});

    for (let i = 0; i < 89; i++) {
      const random4 = Math.floor(Math.random() * 4);
      const random6 = Math.floor(Math.random() * 6);
      const price = Math.floor(Math.random() * 300 + 50);
      const countInStock = Math.floor(Math.random() * 20 + 5);
      const rating = 3 + Math.random() * 2;

      const product = new Product({
        // user:
        name: `${sample(descriptors)} ${categories[random6].name}`,
        category: categories[random6]._id,
        material: materials[random4],
        image: ['https://source.unsplash.com/collection/3712204/500x500'],
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint molestias sit excepturi hic maxime laboriosam optio cupiditate ipsum deserunt aliquam repellendus nisi itaque, dolor fugiat, esse sunt. Sunt, sint perspiciatis!',
        price,
        countInStock,
        rating,
      });
      await product.save();
    }
  } catch (error) {
    console.log(error);
  }
};

importData();
