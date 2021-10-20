const CategoryCard = (props) => {
  return (
    <div className='category__card'>
      <div className='category__img-container'>
        <img className='category__img' src={props.src} alt={props.alt} />
      </div>
      <h3 className='category__text'>{props.children}</h3>
    </div>
  );
};

export default CategoryCard;
