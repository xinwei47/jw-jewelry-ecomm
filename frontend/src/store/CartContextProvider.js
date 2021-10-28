import { useReducer } from 'react';
import CartContext from './cart-context';

const cartReducer = (prevState, action) => {
  if (action.type === 'ADD_ITEM') {
    // if the product is already in cart, just increase the item count by 1
    // if the product is not found, add the item to the cart
    const findProd = prevState.products.find(
      (product) => product._id === action.item._id
    );
    let updatedProducts;
    if (findProd) {
      findProd.qty += 1;
      updatedProducts = [...prevState.products];
    } else {
      updatedProducts = [...prevState.products, { ...action.item, qty: 1 }];
    }

    const updatedCartState = {
      products: updatedProducts,
      totalCount: prevState.totalCount + 1,
      totalAmount: prevState.totalAmount + action.item.price,
    };
    sessionStorage.setItem('cart', JSON.stringify(updatedCartState));
    return updatedCartState;
  }

  if (action.type === 'REMOVE_ITEM') {
    const findProd = prevState.products.find(
      (product) => product._id === action.item._id
    );
    console.log(findProd);
    let updatedProducts;
    if (findProd.qty >= 1) {
      findProd.qty -= 1;
      updatedProducts = [...prevState.products];
    }
    if (findProd.qty === 0) {
      updatedProducts = prevState.products.filter(
        (product) => product._id !== action.item._id
      );
    }
    const updatedCartState = {
      products: updatedProducts,
      totalCount: prevState.totalCount - 1,
      totalAmount: prevState.totalAmount - action.item.price,
    };
    sessionStorage.setItem('cart', JSON.stringify(updatedCartState));
    return updatedCartState;
  }
};

const CartContextProvider = (props) => {
  // check session storage and see if there is a cart object
  const initialCartState = sessionStorage.getItem('cart')
    ? JSON.parse(sessionStorage.getItem('cart'))
    : {
        products: [],
        totalCount: 0,
        totalAmount: 0,
      };

  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  const addItemHandler = (item) => {
    // console.log(item);
    cartDispatch({ type: 'ADD_ITEM', item });
  };
  const removeItemHandler = (item) => {
    // console.log(item);
    cartDispatch({ type: 'REMOVE_ITEM', item });
  };

  console.log(cartState);

  const cartContextValue = {
    products: cartState.products,
    totalCount: cartState.totalCount,
    totalAmount: cartState.totalAmount,
    onAddItem: addItemHandler,
    onRemoveItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
