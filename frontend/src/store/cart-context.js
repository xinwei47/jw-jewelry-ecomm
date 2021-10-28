import React from 'react';

const CartContext = React.createContext({
  products: [],
  totalCount: 0,
  totalAmount: 0,
  onAddItem: (item) => {},
  onRemoveItem: (itemId) => {},
});

export default CartContext;
