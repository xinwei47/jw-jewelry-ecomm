import React from 'react';

const AuthContext = React.createContext({
  token: null,
  isAuthenticated: null,
  isAdmin: false,
  wishlist: [],
  // userId: null,
  onRegister: () => {},
  onLogin: () => {},
  onLogout: () => {},
});

export default AuthContext;
