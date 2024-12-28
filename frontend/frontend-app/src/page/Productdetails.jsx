import React, { useState,useEffect, useContext } from 'react'
import { useParams, Link} from 'react-router-dom'
import axios from 'axios'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import bagimg from '../photo/bag-shopping-solid.svg'
import likeimg from '../photo/heart-regular.svg'
import '../component-css/Productdetails.css'
import { useCart } from '../Context/CartContext'
// import { UserContext } from '../Context/UserContext'
import {addCart} from '../utlis/cart/AddCart'
export default function Productdetails() {

  const id = localStorage.getItem("userId");
  const [product,setProduct] = useState({});
  const [size, setSize] = useState('');
  const [error, setError] = useState('');
  const { setCart } = useCart();
  const params = useParams();

  const handleWishList = async ()=>{
    try{
    const response = await axios.post('http://localhost:7000/addProductWishList',{
      userId: id,
      productId: params.id
    }) 
    if(response.status === 200){
      alert('Product WishListed');
    }
    if(response.status === 201){
      alert("product is added already!");
      return;
    }
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    alert('Failed to add product to wishlist');
  }
  }

  useEffect(() =>{
    const fetchProductDetails = async () => {
    await axios.get(`http://localhost:7000/productDetails/${params.id}`)
    .then((response) => {
      setProduct(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error(`Error fetching product details:`, error);
    });
    }
    fetchProductDetails();
  },[params.id])

  return (
    <>
    <Navbar/>
    <div className='detail-container'>
      <div className='image-div'>
      <div className='image-container1'>
        <Link to={`/productCarousel/${product._id}`}><img className='product-image' src={product.image} alt="logo" /></Link>
        <Link to={`/productCarousel/${product._id}`}><img className='product-image' src={product.image} alt="logo" /></Link>
      </div>
      <div className='image-container2'>
      <Link to={`/productCarousel/${product._id}`}><img className='product-image' src={product.image} alt="logo" /></Link>
      <Link to={`/productCarousel/${product._id}`}><img className='product-image' src={product.image} alt="logo" /></Link>
      </div>
      </div>
      <div className='text-detail-container'>
        <p className='name'>{product.name}</p>
        <p className='short-detail'>{product.about}</p>
        <p className='product_price'>Rs.{product.price}<span className='discount'>  ({product.discount}% OFF)</span></p>
        <p className='tax'>inclusive of all taxes</p>
        <div className='detail-line'></div>
        <p className='size-text'>SELECT SIZE <span className='chart'>SIZE CHART</span></p>
        <div className='size'> 
          <button className='size-button' value='S' onClick={(event)=> {setSize(event.target.value); setError('')}}>S</button>
          <button className='size-button' value='M' onClick={(event)=> {setSize(event.target.value); setError('')}}>M</button>
          <button className='size-button' value='L' onClick={(event)=> {setSize(event.target.value); setError('')}}>L</button>
          <button className='size-button' value='XL' onClick={(event)=> {setSize(event.target.value); setError('')}}>XL</button>
          <button className='size-button' value='XXL' onClick={(event)=> {setSize(event.target.value); setError('')}}>XXL</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className='button-container'>
          <button className='detail-button' onClick={ ()=> addCart(product._id, size, setCart, product.name, product.about, product.price, product.discount, setError) }><img className='bag-img' src={bagimg} alt='logo' />Add to bag</button>
          <button className='detail-button' onClick={handleWishList}><img className='bag-img' src={likeimg} alt="logo" />Wishlist</button>
        </div>
        <div className='detail-line'></div>
        <ul className='product_detail_list'>PRODUCT DETAILS
          <li className='p_d_l'>Colour: {product.colour}</li>
          <li className='p_d_l'>{product.fit}</li>
        </ul>
        <ul className='product_detail_list'>Material & Care
          <li className='p_d_l'>{product.material}</li>
          <li className='p_d_l'>{product.care}</li>
        </ul>
        <div className='detail-line'></div>
        <p className='product-rating'>RATINGS</p>
        <p className='rate-num'>{product.rating}</p>
      </div>
    </div>
    <div style={{marginTop: '250px'}}>
    <Footer/>
    </div>
    </>
  )
}
