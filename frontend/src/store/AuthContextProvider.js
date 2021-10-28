import { useState } from 'react';
import axios from 'axios';
import AuthContext from './auth-context';

const AuthContextProvider = (props) => {
  const initialToken = sessionStorage.getItem('token');

  const [token, setToken] = useState(initialToken);
  // const [userId, setUserId] = useState(null);
  const [isAdmin, setisAdmin] = useState(false);

  // convert token to true/false value
  const isAuthenticated = !!token;

  const registerHandler = async (userInputData) => {
    const { data } = await axios.post('/sign-up', {
      ...userInputData,
    });
    console.log(data);
    if (data.token) {
      const { _id: userId, token } = data;
      // setUserId(userId);
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
      const { _id: userId, token } = data;
      // setUserId(userId);
      setToken(token);
      sessionStorage.setItem('token', token);
    }
  };

  const logoutHandler = async () => {
    const { data } = await axios.get('/logout');
    console.log(data);
    setToken(null);
    sessionStorage.removeItem('token');
  };

  console.log(`isLoggedIn: ${isAuthenticated}`);

  const authContextValue = {
    token,
    isAuthenticated,
    isAdmin: isAdmin,
    // userId,
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
