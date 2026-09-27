import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('ecotrack_admin_token') === 'true';
  });

  const login = (email, password) => {
    if (email === 'admin@ecotrack.com' && password === 'admin123') {
      localStorage.setItem('ecotrack_admin_token', 'true');
      setIsAdminAuthenticated(true);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    localStorage.removeItem('ecotrack_admin_token');
    setIsAdminAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAdminAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
