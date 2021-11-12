import '../styles/pages/_about.scss';

const About = () => {
  return (
    <div className='about'>
      <div className='about__row'>
        <div className='about__heading'>
          <h1 className='heading--1'>About Us</h1>
          <p className=''>Design jewelry for everyday wear.</p>
        </div>
        <div className='about__img-container'>
          <img src='images/about-1.jpg' alt='' className='about__img' />
        </div>
      </div>

      <div className='about__row'>
        <div className='about__img-container'>
          <img src='images/about-2.jpg' alt='' className='about__img' />
        </div>
        <p className='about__text'>
          Totam nobis distinctio in dolores, perferendis natus quis? Ad at a
          nulla similique esse qui quos omnis aspernatur magni. Ducimus veniam a
          voluptatibus! Rem qui tenetur praesentium debitis perferendis
          consequuntur! Blanditiis nemo unde ex. Nihil, deserunt! Est quia dolor
          eius delectus accusamus porro enim, quis, itaque in animi illum
          repellendus iusto eum soluta tempore temporibus a. Quam harum unde
          repellendus!
        </p>
      </div>
      <div className='about__row'>
        <p className='about__text'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
          minus dicta unde quos perferendis, non illo, magnam ex cum cumque
          maxime repellat sunt neque natus architecto ipsam cupiditate nostrum.
          Ea. Totam nobis distinctio in dolores, perferendis natus quis? Ad at a
          nulla similique esse qui quos omnis aspernatur magni. Ducimus veniam a
          voluptatibus! Rem qui tenetur praesentium debitis perferendis
          consequuntur!
        </p>
        <div className='about__img-container'>
          <img src='images/about-3.jpg' alt='' className='about__img' />
        </div>
      </div>
    </div>
  );
};

export default About;
