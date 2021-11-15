import { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { ProductsGallery } from '../components/Gallery';
import Sidebar from '../components/Sidebar';
import { fetchCategories, fetchProducts } from '../lib/api';

import '../styles/pages/_products.scss';
import useHttp from '../hooks/use-http';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/Error';

const Products = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { category } = useParams();
  const history = useHistory();

  const {
    sendRequest: categoriesRequest,
    status: categoriesStatus,
    data: categories,
  } = useHttp(fetchCategories);

  useEffect(() => {
    categoriesRequest();
  }, [categoriesRequest]);

  const {
    sendRequest: productsRequest,
    status: productsStatus,
    data: products,
    dataLength: productsCount,
    error: productsError,
  } = useHttp(fetchProducts);
  // console.log(products);

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
        // console.log(queryString);

        history.push(`/shop/${category}?${queryString}`);
        await productsRequest(category, filterParams);
      }
    },
    [category, history, productsRequest]
  );

  // ***** NOT WORKING *****
  // if (productsStatus === 'pending') {
  //   // setIsLoading(true);
  //   return <LoadingSpinner />;
  // }

  if (productsStatus === 'error') {
    return (
      <Error errStatus={productsError.status} errMsg={productsError.data} />
    );
  }

  console.log(productsStatus);
  // console.log(isLoading);

  return (
    <>
      {/* {isLoading && <LoadingSpinner />} */}
      {/* {!isLoading && ( */}
      <div className='products'>
        <Sidebar
          className='products__sidebar'
          menuList={categories}
          onFiltersSubmittedData={submittedFilterResultsHandler}
        />
        <div className='products__content'>
          <h3 className=' heading--3 products__heading'>
            {category === 'all' ? 'Shop ' : ''}
            {category}
          </h3>
          <p className='products__count'>{productsCount} items</p>
          <ProductsGallery
            className='products__gallery'
            type='products'
            items={products}
          />
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Products;
