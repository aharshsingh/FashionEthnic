import React from 'react';
import '../component-css/Product-snippet.css'
import xmarkimg from '../photo/xmark-solid.svg'
export default function Product_snippet({ product, handleRemove }) {
  return (
    <>
    <div className='flex justify-center items-center'>
    <div className='snippet-container lg:w-[550px] lg:h-[350px] w-80 h-52 flex mt-4'>
        <img className='snippet-product-img lg:h-[280px] lg:w-[200px] w-20 lg:ml-10 lg:mt-10 mt-7 ml-5 h-40' src={product.image} alt="logo" />
        <div className='text-snippet-container'>
        <div className='flex justify-end'>
        <img className='w-5 h-5 cursor-pointer ml-40' src={xmarkimg} alt="logo" onClick={()=> handleRemove(product.product)} />
        </div>
        <p className='snippet-name lg:text-xl text-base'>{product.name}</p>
        <p className='snippet-short-detail lg:text-base lg:block hidden'>{product.about}</p>
        <div className='inner-snippet-container mt-3 lg:mt-6'>
          <p className='snippet-product-size p-[3px] text-xs lg:p-[5px] lg:text-sm'>SIZE: {product.size}</p>
          <p className='snippet-product-size p-[3px] text-xs lg:p-[5px] lg:text-sm'>QTY: {product.quantity}</p>
        </div>
        <p className='snippet-product_price text-sm lg:text-base'>{product.price}<span className='discount'>  ({product.discount}% OFF)</span></p>
        <p className='tax text-xm lg:text-base'>inclusive of all taxes</p>
        </div>
    </div> 
    </div>
    </>
  )
}
