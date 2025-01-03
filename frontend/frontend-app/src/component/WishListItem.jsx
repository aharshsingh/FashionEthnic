import React from 'react'
import {Link} from 'react-router-dom'
import ratingimg from '../photo/star-solid.svg'
import '../component-css/WishListItem.css'
import xmarkimg from '../photo/xmark-solid.svg';

export default function Product({ product, handleRemove }) {
  return (
    <>
  <div className='cardW' style={{ position: 'relative' }}>
  <img
    src={xmarkimg}
    alt="Remove"
    onClick={() => handleRemove(product._id)}
    style={{
      position: 'absolute',
      top: '5px',
      right: '5px',
      width: '20px',
      height: '20px',
      cursor: 'pointer',
    }}
  />
  <Link className='product-link' to={`productDetails/${product._id}`}>
    <img className='productImg' src={product.image} alt="Product" />
    <div className='carContainerW'>
      <p className='productNameW'>{product.name}</p>
      <div className='clg'>
        <p className='rating'>{product.rating}</p>
        <img className='rating-img' src={ratingimg} alt="Rating" />
      </div>
    </div>
    <p className='priceW'>Rs.{product.price}<span className='discount'>(67% off)</span></p>
  </Link>
</div>

    </>
  )
}
