import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/mongodb.js';

import Product from './models/productModel.js';

dotenv.config();
connectDB(); // connect to mongoDB

const app = express();

// parse req.body
app.use(express.urlencoded({ extended: true }));
// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json());

app.get('/shop', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

app.listen(8000, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port 8000`);
});
