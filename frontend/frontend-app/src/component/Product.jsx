import React from 'react'
import {Link} from 'react-router-dom'
import ratingimg from '../photo/star-solid.svg'
import '../component-css/Products.css'

export default function Product(props) {
  // debugger;
  const { product } = props; // Destructuring for easier access

  return (
    <>
  <Link className='product-link' to={`productDetails/${product._id}`}>
      <div className='card'>
        {console.log(product.image)}
        <img className='product-img' src={product.image} alt="Product" />
        <div className='card-container'>
          <p className='product-name'>{product.name}</p>
          <div className='clg'>
          <p className='rating'>{product.rating}</p>
          <img className='rating-img' src={ratingimg} alt="Rating" />
          </div>
        </div>
        {/* <p className='product-intro'>{product.productShortDetail}</p> */}
        <p className='price'>Rs.{product.price}<span className='discount'>(67% off)</span></p>
      </div>
      </Link>
    </>
  )
}
