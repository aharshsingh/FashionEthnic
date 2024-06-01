import React from 'react'
import productimg from '../photo/Screenshot 2024-01-18 195928.png'
import '../component-css/Product-snippet.css'
import xmarkimg from '../photo/xmark-solid.svg'
export default function Product_snippet(props) {
  const { product } = props;
  return (
    <>
    <div className='snippet-container'>
        <img className='snippet-product-img' src={product.image} alt="logo" />
        <div className='text-snippet-container'>
        <img className='xmark-img' src={xmarkimg} alt="logo" />
        <p className='snippet-name'>{product.name}</p>
        <p className='snippet-short-detail'>{product.about}</p>
        <div className='inner-snippet-container'>
          <p className='snippet-product-size'>SIZE: { product.size }</p>
          <p className='qunatity'>QTY: {product.quantity}</p>
        </div>
        <p className='snippet-product_price'>Rs. {product.price}<span className='discount'>  ({product.discount}% OFF)</span></p>
        <p className='tax'>inclusive of all taxes</p>
        </div>
    </div> 
    </>
  )
}
