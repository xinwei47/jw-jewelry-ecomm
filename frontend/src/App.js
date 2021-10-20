import { Route, Switch } from 'react-router-dom';

import Layout from './layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Auth from './pages/Auth';
import Cart from './pages/Cart';

import './App.css';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>

        <Route path='/shop'>
          <Products />
        </Route>

        <Route path='/about'>
          <About />
        </Route>

        <Route path='/sign-in'>
          <Auth />
        </Route>

        <Route path='/cart'>
          <Cart />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
