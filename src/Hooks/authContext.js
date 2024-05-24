import React, { createContext, useState, useContext, useEffect } from 'react';
import { useCart } from './CartContext';
import axios from 'axios';


// Define the types for the authentication context
const AuthContext = createContext();

// Hook to use the authentication context safely within the app
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component with implementation of login and logout functionalities
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setCartItems } = useCart();

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      let id;
      try {
        token = localStorage.getItem('token');
        id = localStorage.getItem('id');
      } catch (e) {
        console.error('Failed to load token:', e);
      }
      console.log(token, id)
      setIsLoggedIn(!!token);
    };

    bootstrapAsync();
  }, []);

  const login = async (token, id) => {
    try {
      // Check if _id is not undefined or null before saving it to localStorage
      if (id) {
        localStorage.setItem('id', id);
        console.log('successfully id stored')
      } else {
        console.error('User id is undefined or null');
        return;
      }
      localStorage.setItem('token', token);
      console.log('successfully stored token')
      setIsLoggedIn(true);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllOrderDetails/${id}`);
      const productsArray = Array.isArray(response.data.data) ? response.data.data : [];
      setCartItems(productsArray);


    } catch (e) {
      console.error('Failed to save token:', e);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      setIsLoggedIn(false);
      window.location.href = "/";
    } catch (e) {
      console.error('Failed to delete token:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
