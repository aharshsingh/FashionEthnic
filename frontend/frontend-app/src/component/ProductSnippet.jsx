import React from 'react'
import productimg from '../photo/Screenshot 2024-01-18 195928.png'
import '../component-css/Product-snippet.css'
import xmarkimg from '../photo/xmark-solid.svg'
export default function Product_snippet(props) {
  const { product } = props;
  return (
    <>
    <div className='snippet-container'>
        <img className='snippet-product-img' src={productimg} alt="logo" />
        <div className='text-snippet-container'>
        <img className='xmark-img' src={xmarkimg} alt="logo" />
        <p className='snippet-name'>Elegant Kurta</p>
        <p className='snippet-short-detail'>A pure cotton kurta in navy blue, perfect for casual and semi-formal wear.</p>
        <div className='inner-snippet-container'>
          <p className='snippet-product-size'>SIZE: M</p>
          <p className='qunatity'>QTY: 1</p>
        </div>
        <p className='snippet-product_price'>Rs. 1200<span className='discount'>  (35% OFF)</span></p>
        <p className='tax'>inclusive of all taxes</p>
        </div>
    </div> 
    </>
  )
}
