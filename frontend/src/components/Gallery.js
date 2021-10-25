import Card from './Card';

const Gallery = (props) => {
  return (
    <div className={props.className}>
      {props.items.map((item) => {
        return (
          <Card
            key={item._id}
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
