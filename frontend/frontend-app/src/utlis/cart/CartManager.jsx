import { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";
import { fetchCartFromDB, syncCartToDB } from "./CartFunction";

const CartManager = ({ userId }) => {
  const { cart, setCart } = useCart();
  const [isInitialFetch, setIsInitialFetch] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      if (userId) {
        const dbCart = await fetchCartFromDB(userId);
        setCart(dbCart); 
        localStorage.setItem("userCart", JSON.stringify(dbCart)); 
        setIsInitialFetch(false);  
      }
    };
    fetchCart();
  }, [userId, setCart]);

  useEffect(() => {
    const updateDBCart = async () => {
      if (userId && !isInitialFetch && cart.productArray.length > 0) {
        await syncCartToDB(userId, cart); 
      }
    };
    updateDBCart();
  }, [cart, userId, isInitialFetch]);

  return null; 
};

export default CartManager;
