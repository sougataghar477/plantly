'use client';
// context/SearchContext.js
import { createContext, useState, useEffect,useCallback  } from 'react';

// Create the context
export const SearchContext = createContext();

// Create the provider
export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const updateQuery = (q) => setQuery(q);

  // Initialize cart state with data from localStorage, if it exists
  const [cart, setCart] = useState([]);

  // Function to add items to the cart and update localStorage
  const addToCart = (item) => {
    setCart((prev) => {
      const updatedCart = [...prev, item];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  const deleteFromCart = (id) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
 
  const emptyCart = useCallback(() => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
     // Clear cart state
  }, []);
  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <SearchContext.Provider value={{ query, updateQuery, cart, addToCart,deleteFromCart,emptyCart }}>
      {children}
    </SearchContext.Provider>
  );
};
