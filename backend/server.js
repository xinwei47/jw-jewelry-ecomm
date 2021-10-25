import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/mongodb.js';

import Product from './models/productModel.js';
import Category from './models/categoryModel.js';

dotenv.config();
connectDB(); // connect to mongoDB

const app = express();

// parse req.body
app.use(express.urlencoded({ extended: true }));
// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json());

app.get('/shop/:category', async (req, res) => {
  const category = req.params.category;
  const paramObj = req.query;
  // console.log('***request parameter***');
  // console.log(`category: ${category}`);
  console.log(paramObj);
  // console.log('******');

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

  // console.log(products[0].priceTier); // '100-200'
  res.json(products);
});

app.get('/categories', async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

app.listen(8000, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port 8000`);
});
