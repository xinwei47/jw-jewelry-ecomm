import { useCallback, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import Gallery from '../components/Gallery';
import Sidebar from '../components/Sidebar';

import '../styles/pages/_products.scss';

const Products = () => {
  const { category } = useParams();
  // const history = useHistory();

  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState();

  const [categories, setCategories] = useState([]);

  // ****** fetch data ******

  const fetchProducts = useCallback(async (category, params = {}) => {
    const { data } = await axios.get(`/shop/${category}`, {
      params,
    });
    console.log(data);
    const dataCount = data.length;
    setProducts(data);
    setProductsCount(dataCount);
  }, []);

  const fetchCategories = useCallback(async () => {
    const { data } = await axios.get('/categories');

    setCategories(data);
  }, []);

  // ******************

  const submittedFilterResultsHandler = useCallback(
    async (filterParams) => {
      if (filterParams) {
        console.log(filterParams);
        fetchProducts(category, filterParams);
      }
    },
    [fetchProducts, category]
  );

  useEffect(() => {
    fetchProducts(category);
  }, [fetchProducts, category]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    submittedFilterResultsHandler();
  }, [submittedFilterResultsHandler]);

  return (
    <div className="products">
      {/* breadcrumb */}
      {/* sidebar */}
      <Sidebar
        menuList={categories}
        onFiltersSubmittedData={submittedFilterResultsHandler}
      />

      <p>{productsCount} items</p>
      <Gallery items={products} />
    </div>
  );
};

export default Products;
