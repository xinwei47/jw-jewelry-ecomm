import Banner from '../UI/Banner';
import Button from '../UI/Button';
import CategoryGallery from '../components/CategoryGallery';

const Home = () => {
  const shopBtnClickHandler = () => {};
  const aboutBtnClickHandler = () => {};
  return (
    <>
      <section>
        <Banner src='https://images.unsplash.com/photo-1620656798579-1984d9e87df7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'>
          <h1>Jewelry designed for every day.</h1>
          <Button onClick={shopBtnClickHandler}>SHOP ALL</Button>
        </Banner>
      </section>

      <hr />

      <section>
        <h2>Shop Jewelry By Category</h2>
        <CategoryGallery />
      </section>

      <hr />

      <section>
        <h2>About</h2>
        <div>
          <img
            src='https://images.unsplash.com/photo-1608508644127-ba99d7732fee?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZWFycmluZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
            alt=''
          />
        </div>
        <div>
          <h3>Ethically made. Designed to last.</h3>
        </div>
        <Button onClick={aboutBtnClickHandler}>Learn more</Button>
      </section>
    </>
  );
};

export default Home;
