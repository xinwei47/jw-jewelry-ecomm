import React from 'react';

const CartContext = React.createContext({
  products: [],
  totalCount: 0,
  totalAmount: 0,
  taxAmount: 0,
  onAddItem: (item) => {},
  onRemoveItem: (itemId) => {},
  onClearCart: () => {},
});

export default CartContext;
