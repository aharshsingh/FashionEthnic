import React from 'react'
import {Link} from 'react-router-dom'
import ratingimg from '../photo/star-solid.svg'
import '../component-css/Products.css'

export default function Product(props) {
  
  const { product } = props;

  return (
    <div>
  <Link to={`Productdetails/${product._id}`}>
      <div className=' w-[250px] h-[500px] mt-[100px]'>
        <img className='product-img' src={product.image} alt="Product" />
        <div className='card-container'>
          <p className='product-name'>{product.name}</p>
          <div className='clg'>
          <p className='rating'>{product.rating}</p>
          <img className='rating-img' src={ratingimg} alt="Rating" />
          </div>
        </div>
        <p className='price'>Rs.{product.price}<span className='discount'>({product.discount} % off)</span></p>
      </div>
      </Link>
    </div>
  )
}
