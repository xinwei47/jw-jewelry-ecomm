import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Banner from '../UI/Banner';
import Button from '../UI/Button';
import Gallery from '../components/Gallery';

import '../styles/pages/_home.scss';

const Home = () => {
  const [categories, setCategories] = useState([]);
  // *** fetch Categories Data ***
  const fetchCategories = useCallback(async () => {
    const { data } = await axios.get('/categories');
    setCategories(data);
  }, []);
  // ******

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const shopBtnClickHandler = () => {};
  const aboutBtnClickHandler = () => {};
  return (
    <>
      <Banner src='https://images.unsplash.com/photo-1620656798579-1984d9e87df7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'>
        <h1 className='heading--1'>Jewelry designed for every day.</h1>
        <Button className='btn-primary' onClick={shopBtnClickHandler}>
          SHOP ALL
        </Button>
      </Banner>

      <section className='section shop'>
        <h3 className='heading--3'>Shop Jewelry By Category</h3>
        <Gallery className='shop__gallery' items={categories} />
      </section>

      <section className='section about'>
        <div className='about__img-container'>
          <img
            src='https://images.unsplash.com/photo-1608508644127-ba99d7732fee?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZWFycmluZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
            alt=''
          />
        </div>
        <div className='about__content'>
          <h3 className='about__heading'>About</h3>
          <p className='about__text'>Ethically made.</p>
          <p className='about__text'>Designed to last.</p>
          <Button className='btn-primary' onClick={aboutBtnClickHandler}>
            Learn more
          </Button>
        </div>
      </section>
    </>
  );
};

export default Home;
