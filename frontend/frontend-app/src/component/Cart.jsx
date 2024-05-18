import React, {useContext, useEffect} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import {CartContext} from '../Context/CartContext'
import Productsnippet from './Product_snippet'
import '../component-css/Cart.css'
import {Link} from 'react-router-dom'

export default function Cart() {

  const { cart } = useContext(CartContext);
  // const { setUserId } = useContext(UserContext);
  useEffect(() =>{
    if(!cart.items)
      return;
  },[])
  return (
    <>
    <Navbar/>
    <div className='cart-outer-container'>
      <div className='cart-inner-container1'>
      <Productsnippet/>
      </div>
      <div className='cart-inner-container2'>
      <p className='snippet-text1' id='txt'>Check delivery services: </p>
      <input className='pincheck' type='text' placeholder='Enter PIN code'></input>
      <button className='enter'>Enter</button>
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
      <Link to='/Bill'><button className='order-button'>PLACE ORDER</button></Link>
      </div>
    </div>
    <Footer/>
    </>
  )
}

