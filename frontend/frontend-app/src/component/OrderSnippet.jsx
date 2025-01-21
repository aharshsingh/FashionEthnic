import React, { useEffect, useState } from 'react';
import '../component-css/Product-snippet.css'
import axios from 'axios';

export default function Ordersnippet({ order }) {
    const [product, setProduct] = useState({});
    useEffect(()=>{
        const getProduct = async()=>{
            try {
                const response = await axios.get(`https://fashionethnic.onrender.com/${order.productId}`);
                setProduct(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        getProduct();
    })
  return (
    <>
    <div className='snippet-container'>
        <img className='snippet-product-img' src={product.image} alt="logo" />
        <div className='text-snippet-container'>
        <p className='snippet-name'>{product.name}</p>
        <p className='snippet-short-detail'>{product.about}</p>
        <div className='inner-snippet-container'>
          <p className='snippet-product-size'>SIZE: {product.size}</p>
          <p className='qunatity'>QTY: {order.quantity}</p>
        </div>
        <p className='snippet-product_price'>{product.price}<span className='discount'>  ({product.discount}% OFF)</span></p>
        <p className='tax'>inclusive of all taxes</p>
        </div>
    </div> 
    </>
  )
}
