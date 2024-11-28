'use client';
 
import { createContext, useState, useEffect,useCallback  } from 'react';
 
// Create the context
export const SearchContext = createContext();
 
export const SearchProvider = ({ children }) => {
 
 
  const [cart, setCart] = useState([]);

  
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
     
  }, []);
   
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
 
  return (
    <SearchContext.Provider value={{ cart, addToCart,deleteFromCart,emptyCart }}>
      {children}
    </SearchContext.Provider>
  );
};
