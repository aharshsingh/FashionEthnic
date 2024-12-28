import axios from "axios";

export const fetchCartFromDB = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:7000/getcart/${userId}`);
    let cart = {
      productArray: response.data.result.item, 
      totalItems: response.data.result.totalItems,    
    };
    return cart;
  } catch (error) {
    console.error("Error fetching cart from database:", error);
    return {
        productArray: [], 
        totalItems: 0,    
      };
  }
};

export const syncCartToDB = async (userId, cart) => {
  try {
    await axios.post(`http://localhost:7000/updateCart/${userId}`, { cart });
  } catch (error) {
    console.error("Error syncing cart to database:", error);
  }
};
