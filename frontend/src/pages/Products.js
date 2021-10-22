import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useCallback, useState, useEffect } from 'react';

import Gallery from '../components/Gallery';
import Sidebar from '../components/Sidebar';

import '../styles/pages/_products.scss';

const categories = [
  {
    id: 'c1',
    name: 'earrings',
    image:
      'https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZWFycmluZ3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    numOfItems: 20,
  },
  {
    id: 'c2',
    name: 'necklace',
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmVja2xhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    numOfItems: 20,
  },
  {
    id: 'c3',
    name: 'ring',
    image:
      'https://images.unsplash.com/photo-1620916297506-4a1df16ef17a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHJpbmdzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    numOfItems: 20,
  },
  {
    id: 'c4',
    name: 'bracelet',
    image:
      'https://images.unsplash.com/photo-1608543837770-dbad30f0e7c9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnJhY2VsZXRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    numOfItems: 20,
  },
  {
    id: 'c5',
    name: 'wedding',
    image:
      'https://images.unsplash.com/photo-1481980235850-66e47651e431?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2VkZGluZyUyMGpld2Vscnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    numOfItems: 20,
  },
  {
    id: 'c6',
    name: 'men',
    image:
      'https://images.unsplash.com/photo-1565206077202-14752579e787?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjAwfHxtZW4lMjByaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    numOfItems: 20,
  },
];

const Products = () => {
  const { category } = useParams();
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState();

  const fetchProducts = useCallback(async (category) => {
    const { data } = await axios.get(`/shop/${category}`);
    const dataCount = data.length;
    setProducts(data);
    setProductsCount(dataCount);
  }, []);

  useEffect(() => {
    fetchProducts(category);
  }, [fetchProducts, category]);

  let string = '';
  const filterDataHandler = async (data) => {
    // console.log(data);

    Object.keys(data).map((key) => {
      // console.log(data[key]);
      string.replace(/\s/g, '').toLowerCase();
      // console.log(string);
      // string.concat(string, `${key}=${data[key]}`);
    });
  };

  return (
    <div className='products'>
      {/* breadcrumb */}
      {/* sidebar */}
      <Sidebar menuList={categories} onFilterData={filterDataHandler} />

      <p>{productsCount} items</p>
      <Gallery items={products} />
    </div>
  );
};

export default Products;
