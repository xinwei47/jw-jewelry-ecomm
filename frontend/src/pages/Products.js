import { useCallback, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import Gallery from '../components/Gallery';
import Sidebar from '../components/Sidebar';

import '../styles/pages/_products.scss';

const Products = () => {
  const { category } = useParams();
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState();
  const [categories, setCategories] = useState([]);

  // ****** fetch data from db ******
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

  // ******************************************************
  // *** Reformating filter results to param string ***
  const reformatFilterResults = (obj) => {
    return Object.keys(obj).map((key) => {
      return obj[key].map((item) => {
        return `${key}=${item}`.toLowerCase().replace(/\s/g, '-');
      });
    });
  };
  // ******************************************************

  const submittedFilterResultsHandler = useCallback(
    async (filterParams) => {
      if (filterParams) {
        console.log(filterParams);

        const paramArr = reformatFilterResults(filterParams).flat();
        const queryString = paramArr.flat().join('&');
        console.log(queryString);

        history.push(`/shop/${category}?${queryString}`);
        await fetchProducts(category, filterParams);
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

  return (
    <div className='products'>
      {/* breadcrumb */}
      {/* sidebar */}
      <Sidebar
        className='products__sidebar'
        menuList={categories}
        onFiltersSubmittedData={submittedFilterResultsHandler}
      />
      <div className='products__content'>
        <p className='products__count'>{productsCount} items</p>
        <Gallery className='products__gallery' items={products} />
      </div>
    </div>
  );
};

export default Products;
