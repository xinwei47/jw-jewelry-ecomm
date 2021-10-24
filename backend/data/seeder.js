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

    for (let i = 0; i < 100; i++) {
      const random4 = Math.floor(Math.random() * 4);
      const random6 = Math.floor(Math.random() * 6);
      const price = Math.floor(Math.random() * 200 + 20);
      const countInStock = Math.floor(Math.random() * 20 + 5);
      const rating = Math.floor(Math.random() * 5 + 1);

      const product = new Product({
        // user:
        name: `${sample(descriptors)} ${categories[random6].name}`,
        category: categories[random6]._id,
        material: materials[random4],
        image: [
          'https://images.unsplash.com/photo-1561828995-aa79a2db86dd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8amV3ZWxyeXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        ],
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
