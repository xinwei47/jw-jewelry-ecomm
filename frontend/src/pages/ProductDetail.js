import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../lib/api';
import useHttp from '../hooks/use-http';

import '../styles/pages/_product-detail.scss';

const ProductDetail = () => {
  const { productName, productId } = useParams();

  const {
    sendRequest: singleProductRequest,
    // status: productStatus,
    data: product,
  } = useHttp(fetchSingleProduct);

  const { image, name, rating, material, description } = product;

  console.log(product);

  useEffect(() => {
    singleProductRequest(productName, productId);
  }, [singleProductRequest, productName, productId]);

  return (
    <div className='product'>
      <div className='product__content'>
        <div className='product__image-container'>
          <img src={image} alt={`${name}`} />
        </div>

        <div className='product__right'>
          <h1 className='product__heading'>{name}</h1>
          <div className='product__rating'>
            {/* stars */}
            <p className='product__rating-text'>{rating}</p>
            <a href='#reviews' className='product__view-reviews'>
              See 20 Reviews
            </a>
          </div>
          <div>{material}</div>
          <div className='product__description'>
            <h4 className='product__description-heading'>Description</h4>
            <div className='product__description-text'>{description}</div>
          </div>
        </div>
      </div>

      {/* display reviews */}
      <div className='product__reviews' id='reviews'>
        <h2 className='heading--2'>Reviews</h2>
      </div>
    </div>
  );
};

export default ProductDetail;
