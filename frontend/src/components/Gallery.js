import Card from './Card';
import '../styles/components/_gallery.scss';

const Gallery = (props) => {
  return (
    <div className='gallery'>
      {props.items.map((item) => {
        return (
          <Card
            key={item.id}
            src={item.image}
            title={item.name}
            alt={`shop by ${item.name}`}
          >
            {item.price ? <p>${item.price}</p> : ''}
          </Card>
        );
      })}
    </div>
  );
};

export default Gallery;
