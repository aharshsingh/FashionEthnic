import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../photo/Screenshot 2024-01-18 195819.png'
import img2 from '../photo/Screenshot 2024-01-18 195928.png'
import img3 from '../photo/Screenshot 2024-01-18 232014.png'
import img4 from '../photo/Screenshot 2024-01-18 232037.png'

export default function CardCarousel() {
  return (
    <>
      <Carousel data-bs-theme="dark" prevIcon={null} nextIcon={null} indicators = {false}>
        <Carousel.Item interval={2000}>
          <img className="d-block w-100" src={img1} alt='productimage'/>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={img2} alt='productimage'/>
        </Carousel.Item>
        <Carousel.Item interval={1000}> 
          <img className="d-block w-100" src={img3} alt='productimage'/>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={img4} alt='productimage'/>
        </Carousel.Item>
      </Carousel>
    </>
  )
}
