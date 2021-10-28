import React from 'react';

const AuthContext = React.createContext({
  token: null,
  isAuthenticated: null,
  isAdmin: false,
  userId: null,
  onRegister: () => {},
  onLogin: () => {},
  onLogout: () => {},
});

export default AuthContext;
