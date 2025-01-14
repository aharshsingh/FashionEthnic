import React, {useState, useEffect, useContext} from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import '../component-css/Bill.css'
import chat from '../photo/comment-solid.svg'
import {Link} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import { TextField } from '@mui/material'

export default function Bill() {
  const [order, setOrder] = useState({
    items: JSON.parse(localStorage.getItem('items')) || [],
    mrpAmount: localStorage.getItem('mrpAmount') || 0,
    discountAmount: localStorage.getItem('discountAmount') || 0,
    totalAmount: localStorage.getItem('totalAmount') || 0,
  });
  const [newAddress, setNewAddress] = useState('');
  const [show, setShow] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const [error, setError] = useState('');

  const handleOrder = async()=>{
    setOrder((prev) =>({
      ...prev,
      userName: user.userName,
      address: user.address
    }));
    try {
      const response = await axios.post(`http://localhost:7000/addorder/${user._id}`,
        order);
    } catch (error) {
        console.log(error);
    }
}

const handleAddAddress = async() => {
  if(newAddress !== ''){
  try {
    const response = await axios.patch(`http://localhost:7000/updateuser/${user._id}`,{
      address: newAddress
    });
    setUser((prev)=>({
      ...prev,
      address: newAddress,
    }))
    setShow(false);
    setNewAddress(''); 
    setError('');
  } catch (error) {
    console.log(error);
    setError('Failed to update address. Please try again.');
  }}else{
    setError('Enter a address');
    setNewAddress('');
  }
};
  return (
    <>
    <Navbar/>
      <div className='cart-outer-container'>
      <div className='cart-inner-container1'>
      <p id='del' className='snippet-text2'>Select Delivery Address:</p>
      {user.address ? (
        <>
        <div className='address-card'>
        <p id='name'>Aharsh Singh</p>
        <p id='address'>{user.address}</p>
        <p className='phone'>Phone no. {user.phoneNumber ? user.phoneNumber : <span>N/A</span>}</p>
      </div>
      <div className='button-div'>
      <button className='address-button ' onClick={()=> setShow(true)}>+Add New Address</button>
    </div>
    </>
      ):(
      <div className='button-div'>
        <button className='address-button' onClick={()=> setShow(true)}>+Add New Address</button>
      </div>)}
      {show && (
            <div>
              <p className='ml-[400px] mt-4'>Add Address:</p>
              <div className='ml-[398px]'>
              <TextField
              className='w-[400px] w-[452px] mt-3'
                label="Enter Address"
                value={newAddress}
                onChange={(e)=> setNewAddress(e.target.value)}
              /> <div>{error && <span style={{ color: 'red', marginTop:'5px' }}>*{error}</span>}</div>
              </div>
              <div>
              <button className='ml-[740px] mt-2' variant="contained" color="primary" onClick={handleAddAddress}> Save Address </button>
              </div>
            </div>
          )}
      </div>
      <div className='cart-inner-container2'>
      <p className='snippet-text2'>Price Details</p>
      <div className='snippet-text-container1'>
        <p className='snippet-text1'>Total MRP  </p>
        <p className='snippet-text1'>{order.mrpAmount}</p>
      </div>
      <div className='snippet-text-container2'>
        <p className='snippet-text1'>Discount</p>
        <p className='snippet-text1'>- {order.discountAmount}</p>
      </div>
      <div className='snippet-text-container3'>
        <p className='snippet-text1'>Shipping Charges</p>
        <p className='snippet-text1'>+50</p>
      </div>
      <p>________________________________</p>
      <div className='snippet-text-container4'>
        <p className='snippet-text1'>Total Amount</p>
        <p className='snippet-text1'>Rs.{order.totalAmount}</p>
      </div>
      <button className='order-button' onClick={handleOrder}>PAY NOW</button>
      </div>
    </div>
    <div className='chat-div'>
      <Link className='talktous-link' to='/contactus'><p className='chat-text'>Need Help? Talk to us</p></Link>
        <img className='chat-img' src={chat} alt="logo" />
    </div>
    <Footer/>
    </>
  )
}
