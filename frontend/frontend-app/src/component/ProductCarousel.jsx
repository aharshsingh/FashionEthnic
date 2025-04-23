import React, {useEffect, useState} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../component-css/productCarousel.css';
import crossImg from '../photo/xmark-solid (1).svg'

export default function ProductCarousel() {
  const params = useParams();
  const navigate = useNavigate();
  const [productImage, setImage] = useState({});
  useEffect(()=>{
    const fetchImage = async ()=>{
       await axios.get(`https://fashionethnic.onrender.com/api/products/get_image/${params.id}`)
       .then((res) =>{
        setImage(res.data);
        console.log(res.data);
       })
       .catch((error) =>{
        console.log('Error in fetching details:', error);
       });
    }
    fetchImage();
    },[params.id])
  const handleClick = ()=>{
    navigate(-1);
  }
  return(
    <>
    <div>
      <img className='crossImg' src={crossImg} onClick = { handleClick } alt="logo"/>
    </div>
    <Carousel data-bs-theme="dark" indicators = {true}>
        <Carousel.Item interval={2000}>
          <img className="product-carousel-image" src={productImage.image} alt='productimage'/>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img className="product-carousel-image" src={productImage.image} alt='productimage'/>
        </Carousel.Item>
        <Carousel.Item interval={1000}> 
          <img className=" product-carousel-image" src={productImage.image} alt='productimage'/>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img className="product-carousel-image" src={productImage.image} alt='productimage'/>
        </Carousel.Item>
      </Carousel>
    </>
  )
}
