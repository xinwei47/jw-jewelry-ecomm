import { useCallback, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { ProductsGallery } from '../components/Gallery';
import Sidebar from '../components/Sidebar';
import { fetchCategories, fetchProducts } from '../lib/api';

import '../styles/pages/_products.scss';
import useHttp from '../hooks/use-http';

const Products = () => {
  const { category } = useParams();
  const history = useHistory();

  const {
    sendRequest: categoriesRequest,
    // status: categoriesStatus,
    data: categories,
  } = useHttp(fetchCategories);

  useEffect(() => {
    categoriesRequest();
  }, [categoriesRequest]);

  const {
    sendRequest: productsRequest,
    // status: productsStatus,
    data: products,
    dataLength: productsCount,
  } = useHttp(fetchProducts);

  useEffect(() => {
    productsRequest(category);
  }, [productsRequest, category]);

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
        // console.log(filterParams);

        const paramArr = reformatFilterResults(filterParams).flat();
        const queryString = paramArr.flat().join('&');
        console.log(queryString);

        history.push(`/shop/${category}?${queryString}`);
        await productsRequest(category, filterParams);
      }
    },
    [category, history, productsRequest]
  );

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
        <ProductsGallery
          className='products__gallery'
          type='products'
          items={products}
        />
      </div>
    </div>
  );
};

export default Products;
