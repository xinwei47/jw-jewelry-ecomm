const Banner = (props) => {
  return (
    <div className='banner'>
      <div className='banner__image-container'>
        <img className='banner__image' src={props.src} alt={props.alt} />
      </div>
      <div className='banner__content'>{props.children}</div>
    </div>
  );
};

export default Banner;
