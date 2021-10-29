import { useState } from 'react';
import axios from 'axios';
import AuthContext from './auth-context';

const AuthContextProvider = (props) => {
  const initialToken = sessionStorage.getItem('token');
  const initialWishlist = JSON.parse(sessionStorage.getItem('wishlist'));

  const [token, setToken] = useState(initialToken);
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [isAdmin, setisAdmin] = useState(false);
  // convert token to true/false value
  const isAuthenticated = !!token;

  const registerHandler = async (userInputData) => {
    const { data } = await axios.post('/sign-up', {
      ...userInputData,
    });
    console.log(data);
    if (data.token) {
      const { token } = data;
      setToken(token);
      sessionStorage.setItem('token', token);
    }
  };

  const loginHandler = async (userInputData) => {
    const { data } = await axios.post('/sign-in', {
      ...userInputData,
    });
    console.log(data);

    if (data.token) {
      const { token, wishlist } = data;
      setToken(token);
      setWishlist(wishlist);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  };

  const logoutHandler = async () => {
    const { data } = await axios.get('/logout');
    console.log(data);
    setToken(null);
    setWishlist(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('wishlist');
  };

  console.log(`isLoggedIn: ${isAuthenticated}`);

  const authContextValue = {
    token,
    isAuthenticated,
    isAdmin: isAdmin,
    wishlist,
    onRegister: registerHandler,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
