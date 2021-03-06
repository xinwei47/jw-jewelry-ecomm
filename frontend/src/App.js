import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from './layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import AuthContext from './store/auth-context';
import CartContext from './store/cart-context';
import OrderConfirmation from './pages/OrderConfirmation';
import Orders from './pages/Orders';
import Order from './pages/Order';

import './App.scss';

function App() {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>

        <Route path='/shop/products/:productName/:productId'>
          <ProductDetail />
        </Route>

        <Route path='/shop/:category'>
          <Products />
        </Route>

        <Route path='/about'>
          <About />
        </Route>

        <Route path='/user/sign-in'>
          <Auth />
        </Route>

        <Route path='/user/profile'>
          {authCtx.isAuthenticated && <Profile />}
          {!authCtx.isAuthenticated && <Auth />}
        </Route>

        <Route path='/user/wishlist'>
          {authCtx.isAuthenticated && <Wishlist />}
          {!authCtx.isAuthenticated && <Auth />}
        </Route>

        <Route path='/user/orders/:orderId'>
          {authCtx.isAuthenticated && <Order />}
          {!authCtx.isAuthenticated && <Auth />}
        </Route>

        <Route path='/user/orders'>
          {authCtx.isAuthenticated && <Orders />}
          {!authCtx.isAuthenticated && <Auth />}
        </Route>

        <Route path='/user/order-confirmation'>
          <OrderConfirmation />
        </Route>

        <Route path='/cart'>
          <Cart />
        </Route>

        <Route path='/checkout'>
          {cartCtx.totalCount !== 0 && <Checkout />}
          {cartCtx.totalCount === 0 && <Redirect to='/' />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
