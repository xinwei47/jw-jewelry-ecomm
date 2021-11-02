import Card from './Card';

export const CategoriesGallery = (props) => {
  return (
    <div className={props.className}>
      {props.items.map((item) => {
        return (
          <Card
            key={item._id}
            link={`/shop/${item.name}`}
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

export const ProductsGallery = (props) => {
  return (
    <div className={props.className}>
      {props.items.map((item) => {
        const linkName = item.name.split(' ').join('-');
        // console.log(linkName);
        return (
          <Card
            key={item._id}
            link={`/shop/products/${linkName}/${item._id}`}
            src={item.images[0]}
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
