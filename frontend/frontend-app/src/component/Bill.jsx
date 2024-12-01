import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import '../component-css/Bill.css'
import chat from '../photo/comment-solid.svg'
import {Link} from 'react-router-dom'
export default function Bill() {
  return (
    <>
    <Navbar/>
      <div className='cart-outer-container'>
      <div className='cart-inner-container1'>
      <p id='del' className='snippet-text2'>Select Delivery Address:</p>
      <div className='address-card'>
        <p id='name'>Aharsh Singh</p>
        <p id='address'>House no. E-62 Neel Vihar Colony Ramnagar 
           Ayodhya - 224001 
           Uttar Pradesh</p>
        <p className='phone'>Phone no. 8005198273</p>
        {/* <button className='edit'>Edit</button> */}
      </div>
      <div className='button-div'>
        <button className='address-button'>+Add New Address</button>
      </div>
      </div>
      <div className='cart-inner-container2'>
      <p className='snippet-text2'>Price Details</p>
      <div className='snippet-text-container1'>
        <p className='snippet-text1'>Total MRP  </p>
        <p className='snippet-text1'>2999</p>
      </div>
      <div className='snippet-text-container2'>
        <p className='snippet-text1'>Discount</p>
        <p className='snippet-text1'>-1,299</p>
      </div>
      <div className='snippet-text-container3'>
        <p className='snippet-text1'>Shipping Charges</p>
        <p className='snippet-text1'>+50</p>
      </div>
      <p>________________________________</p>
      <div className='snippet-text-container4'>
        <p className='snippet-text1'>Total Amount</p>
        <p className='snippet-text1'>Rs.1,199</p>
      </div>
      <button className='order-button'>PAY NOW</button>
      </div>
    </div>
    <div className='chat-div'>
      <Link className='talktous-link' to='/Talktous'><p className='chat-text'>Need Help? Talk to us</p></Link>
        <img className='chat-img' src={chat} alt="logo" />
    </div>
    <Footer/>
    </>
  )
}
