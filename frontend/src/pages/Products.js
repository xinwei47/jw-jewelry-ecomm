import axios from 'axios';
import { useCallback, useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    const { data } = await axios.get('/shop');
    // console.log(data);

    setProducts(data);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <h2>Products Page</h2>
      {products.map((product) => {
        return (
          <>
            <div>
              <div>{product.name}</div>
              <div>${product.price}</div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Products;
