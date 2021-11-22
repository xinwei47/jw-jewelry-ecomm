import Card from './Card';
import Button from '../UI/Button';

import '../styles/components/_gallery.scss';

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
          <div
            className='prod-gallery__item'
            key={`prod-gallery-item-${item._id}`}
          >
            <Card
              link={`/shop/products/${linkName}/${item._id}`}
              src={item.images[0]}
              title={item.name}
              alt={`shop by ${item.name}`}
            >
              {item.price && <p>${item.price}</p>}
            </Card>
            {props.showRemoveBtn && (
              <Button
                className='btn-tertiary prod-gallery__btn'
                onClick={props.onRemoveItem.bind(null, item._id)}
              >
                Remove
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};
