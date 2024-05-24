import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define initial state
const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

// Create context
const CartContext = createContext();

// Define reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        cartItems: action.payload,
      };
    case 'ADD_TO_CART':
      localStorage.setItem('cartItems', JSON.stringify([action.payload])); // Store only the last added item in localStorage
      return {
        ...state,
        cartItems: [action.payload], // Store only the last added item in the cart state
      };
      case 'RESET_CART':
      localStorage.removeItem('cartItems'); // Clear cartItems from localStorage
      return {
        ...state,
        cartItems: [], // Reset cartItems state to empty array
      };
      
    // Add more cases for other actions like removing from cart, updating quantity, etc.
    default:
      return state;
  }
}

// Create provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Define actions
  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const resetCart = () => {
    dispatch({ type: 'RESET_CART' });
  };
  const setCartItems = (items) => {
    dispatch({ type: 'SET_CART_ITEMS', payload: items });
  };



  useEffect(() => {
    // Update local storage whenever cart items change
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  return (
    <CartContext.Provider value={{ cart: state.cartItems, addToCart , resetCart , setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to consume the context
export const useCart = () => useContext(CartContext);
