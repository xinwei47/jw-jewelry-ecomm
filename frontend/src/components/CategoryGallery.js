import CategoryCard from './CategoryCard';

const CategoryGallery = () => {
  const categories = [
    {
      name: 'earrings',
      image:
        'https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZWFycmluZ3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      numOfItems: 20,
    },
    {
      name: 'necklaces',
      image:
        'https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmVja2xhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60',
      numOfItems: 20,
    },
    {
      name: 'rings',
      image:
        'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmluZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      numOfItems: 20,
    },
    {
      name: 'bracelets',
      image:
        'https://images.unsplash.com/photo-1608543837770-dbad30f0e7c9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnJhY2VsZXRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      numOfItems: 20,
    },
  ];
  return (
    <>
      {categories.map((category) => {
        return (
          <CategoryCard src={category.image} alt={`shop by ${category.name}`}>
            {category.name}
          </CategoryCard>
        );
      })}
    </>
  );
};

export default CategoryGallery;
