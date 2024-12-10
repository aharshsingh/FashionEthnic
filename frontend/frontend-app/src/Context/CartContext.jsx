import { useState, useEffect, createContext, useContext } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { userLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const storedCart = window.localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.product === item.product && cartItem.size === item.size
    );
    setCart((prevCart) => [...prevCart, item]);

    if (userLoggedIn) {
      try {
        await axios.patch('', { item }); 
      } catch (error) {
        console.error('Error updating cart on backend:', error);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
