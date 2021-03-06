import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../UI/Banner';
import Button from '../UI/Button';
import { CategoriesGallery } from '../components/Gallery';
import { fetchCategories } from '../lib/api';
import useHttp from '../hooks/use-http';

import '../styles/pages/_home.scss';

const Home = () => {
  const { sendRequest: categoriesRequest, data: categories } = useHttp(
    fetchCategories
  );

  useEffect(() => {
    categoriesRequest();
  }, [categoriesRequest]);

  return (
    <>
      <Banner src='images/banner.jpg'>
        <h1 className='heading--1'>Jewelry designed for every day.</h1>
        <Link to='/shop/all'>
          <Button className='btn-primary'>SHOP ALL</Button>
        </Link>
      </Banner>

      <section className='section shop-section'>
        <h3 className='heading--3'>Shop Jewelry By Category</h3>
        <CategoriesGallery
          className='shop-section__gallery'
          items={categories}
        />
      </section>

      <section className='section about-section'>
        <div className='about-section__img-container'>
          <img
            src='https://images.unsplash.com/photo-1608508644127-ba99d7732fee?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZWFycmluZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
            alt=''
            className='about-section__img'
          />
        </div>
        <div className='about-section__content'>
          <h3 className='about-section__heading'>About</h3>
          <p className='about-section__text'>Ethically made.</p>
          <p className='about-section__text'>Designed to last.</p>
          <Link to='/about'>
            <Button className='btn-primary'>Learn more</Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
