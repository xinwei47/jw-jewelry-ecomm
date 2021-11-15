import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

const getSingleProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate('reviews');
    return res.json(product);
  } catch (error) {
    return res.status(400).send('Product is not found.');
  }
};

const getProducts = async (req, res) => {
  try {
    const { category } = req.params;
    const paramObj = req.query;

    let products;
    if (category === 'all') {
      products = await Product.find({ ...paramObj });
    } else {
      const { _id: categoryId } = await Category.findOne({ name: category });
      console.log(`categoryId: ${categoryId}`);
      products = await Product.find({
        category: categoryId,
        ...paramObj,
      });
    }
    return res.json(products);
  } catch (error) {
    res.status(400).send('Page is not found.');
  }
};

const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
};

export { getSingleProduct, getProducts, getCategories };
