export const addCart = (product, size, setCart, name, about, price, discount, setError) => {
    if(size === ''){
      return setError("Please select a size")
    }
    setCart((prevCart) => {
      const { productArray, totalItems } = prevCart;
  
      const updatedProductArray = [...productArray];
      const existingIndex = updatedProductArray.findIndex(
        (item) => item.product === product && item.size === size
      );
  
      if (existingIndex !== -1) {
        updatedProductArray[existingIndex].quantity += 1;
      } else {
        const uniqueId = Math.floor(Math.random() * 100000);
        updatedProductArray.push({ id: uniqueId, product, quantity: 1, size, name, about, price, discount,});
      }

      const updatedTotalItems = totalItems + 1;

      const updatedCart = {
        productArray: updatedProductArray,
        totalItems: updatedTotalItems,
      };
      return updatedCart; 
    });
  };

  