import React, { useState,useEffect, useContext } from 'react'
import { useParams, Link} from 'react-router-dom'
import axios from 'axios'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import bagimg from '../photo/bag-shopping-solid.svg'
import likeimg from '../photo/heart-regular.svg'
import '../component-css/Productdetails.css'
import { useCart } from '../Context/CartContext'
import { UserContext } from '../Context/UserContext'
import {addCart} from '../utlis/cart/AddCart'
import LoadingAnimation from '../component/LoadingAnimation';
import toast from 'react-hot-toast'
import ProductCarouselPhone from '../component/ProductCarouselPhone'
export default function Productdetails() {

  const {user} = useContext(UserContext);
  const [product,setProduct] = useState({});
  const [size, setSize] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { setCart } = useCart();
  const params = useParams();

  const handleWishList = async ()=>{
    try{
    const response = await axios.post('https://fashionethnic.onrender.com/addProductWishList',{
      userId: user._id,
      productId: params.id
    }) 
    if(response.status === 200){
      toast.success('Added to wishlist', {
        position: "top-center",
      });
    }
    if(response.status === 201){
      toast.success('Already in wishlist', {
        position: "top-center",
      });
      return;
    }
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    alert('Failed to add product to wishlist');
  }
  }

  useEffect(() =>{
    const fetchProductDetails = async () => {
    await axios.get(`https://fashionethnic.onrender.com/productDetails/${params.id}`)
    .then((response) => {
      setProduct(response.data);
      setLoading(false)
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
    {
      loading ? (
      <LoadingAnimation/>
    ) : (
      <>
      <div className='lg:hidden flex justify-center items-center mt-20'>
      <ProductCarouselPhone productId={product._id} />
      </div>
<div className='detail-container flex lg:mt-24 mt-5 justify-around'>
      <div className='hidden lg:block mt-10'>
      <div className='image-container1 flex gap-6 '>
        <Link to={`/productCarousel/${product._id}`}><img className='w-[350px] h-[530px]' src={product.image} alt="logo" /></Link>
        <Link to={`/productCarousel/${product._id}`}><img className='w-[350px] h-[530px]' src={product.image} alt="logo" /></Link>
      </div>
      <div className='image-container1 flex gap-6 mt-6'>
      <Link to={`/productCarousel/${product._id}`}><img className='w-[350px] h-[530px]' src={product.image} alt="logo" /></Link>
      <Link to={`/productCarousel/${product._id}`}><img className='w-[350px] h-[530px]' src={product.image} alt="logo" /></Link>
      </div>
      </div>
      <div className=' lg:mt-[100px]'>
        <p className='name ml-2'>{product.name}</p>
        <p className='short-detail ml-2 lg:text-base text-sm'>{product.about}</p>
        <p className='product_price ml-2'>Rs.{product.price}<span className='discount font-semibold'>  ({product.discount}% OFF)</span></p>
        <p className='tax ml-2'>inclusive of all taxes</p>
        <div className='detail-line hidden lg:block'></div>
        <p className='size-text ml-2'>SELECT SIZE <span className='chart'><Link to={`/sizechart/${product.gender}`}>SIZE CHART {'>'}</Link></span></p>
        <div className='size ml-2'> 
          <button className={`size-button ${size === 'S'? 'text-[#132C48] bg-[#FE8551] border-1 border-[#FE8551]':''}`} value='S' onClick={(event)=> {setSize(event.target.value); setError('')}}>S</button>
          <button className={`size-button ${size === 'M'? 'text-[#132C48] bg-[#FE8551] border-1 border-[#FE8551]':''}`}value='M' onClick={(event)=> {setSize(event.target.value); setError('')}}>M</button>
          <button className={`size-button ${size === 'L'? 'text-[#132C48] bg-[#FE8551] border-1 border-[#FE8551]':''}`} value='L' onClick={(event)=> {setSize(event.target.value); setError('')}}>L</button>
          <button className={`size-button ${size === 'XL'? 'text-[#132C48] bg-[#FE8551] border-1 border-[#FE8551]':''}`} value='XL' onClick={(event)=> {setSize(event.target.value); setError('')}}>XL</button>
          <button className={`size-button ${size === 'XXL'? 'text-[#132C48] bg-[#FE8551] border-1 border-[#FE8551]':''}`} value='XXL' onClick={(event)=> {setSize(event.target.value); setError('')}}>XXL</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className='button-container ml-3'>
          <button className='flex justify-center items-center gap-2 bg-[#132C48] lg:text-[15px] text-sm text-white lg:h-[50px] lg:w-[150px] h-[40px] w-[120px]'onClick={() => {
          if (!size) {
          setError('Please select a size');
          return;
          }
          addCart(product._id, size, setCart, product.name, product.about, product.price, product.discount, setError);
          toast.success('Added to cart', { position: "top-center" });
          }}><img src={bagimg} alt='logo' />Add to bag</button>
          <button className='flex justify-center items-center gap-2 bg-[#132C48] lg:text-[15px] text-sm text-white lg:h-[50px] lg:w-[150px] h-[40px] w-[120px]' onClick={handleWishList}><img src={likeimg} alt="logo" />Wishlist</button>
        </div>
        <div className='detail-line hidden lg:block'></div>
        <ul className='product_detail_list ml-2'>Product details
          <li className='p_d_l'>Colour: {product.colour}</li>
          <li className='p_d_l'>{product.fit}</li>
        </ul>
        <ul className='product_detail_list ml-2'>Material & Care
          <li className='p_d_l'>{product.material}</li>
          <li className='p_d_l'>{product.care}</li>
        </ul>
        <div className='detail-line hidden lg:block'></div>
        <p className='product-rating ml-2'>RATINGS</p>
        <p className='rate-num ml-2'>{product.rating}</p>
      </div>
    </div>
    </>
    )
    }
    <div style={{marginTop: '400px'}}>
    <Footer/>
    </div>
    </>
  )
}
