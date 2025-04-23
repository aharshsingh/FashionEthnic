import React, {useEffect, useState} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import '../component-css/productCarousel.css';

export default function ProductCarouselPhone({productId}) {
  const [productImage, setImage] = useState({});
  useEffect(()=>{
    const fetchImage = async ()=>{
       await axios.get(`https://fashionethnic.onrender.com//api/products/get_image/${productId}`)
       .then((res) =>{
        setImage(res.data);
       })
       .catch((error) =>{
        console.log('Error in fetching details:', error);
       });
    }
    fetchImage();
    },[productId])

  return(
    <>
    <Carousel data-bs-theme="dark" indicators = {false} interval={null}>
        <Carousel.Item>
          <img className="w-[250px] h-[400px]" src={productImage.image} alt='productimage'/>
        </Carousel.Item>
        <Carousel.Item>
          <img className="w-[250px] h-[400px]" src={productImage.image} alt='productimage'/>
        </Carousel.Item>
        <Carousel.Item> 
          <img className="w-[250px] h-[400px]" src={productImage.image} alt='productimage'/>
        </Carousel.Item>
        <Carousel.Item>
          <img className="w-[250px] h-[400px]" src={productImage.image} alt='productimage'/>
        </Carousel.Item>
      </Carousel>
    </>
  )
}
