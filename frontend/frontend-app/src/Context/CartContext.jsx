import {useState, useEffect, useContext, createContext} from 'react';

export const CartContext = createContext();

export const CartProvider = ({children}) =>{
  const [cart, setCart] = useState({
    productArray: [], 
    totalItems: 0,    
  });
  useEffect(() => {
    try {
      const savedCartString = localStorage.getItem("userCart");
      const savedCart = savedCartString
        ? JSON.parse(savedCartString)
        : { productArray: [], totalItems: 0 }; 
      setCart(savedCart);
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      setCart({ productArray: [], totalItems: 0 }); 
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);