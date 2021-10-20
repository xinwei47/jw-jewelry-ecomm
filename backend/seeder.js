import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import productsData from './data/productsData.js';
import Product from './models/productModel.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany({});

    await Product.insertMany(productsData);
  } catch (error) {
    console.log(error);
  }
};

importData();
