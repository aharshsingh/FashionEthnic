import React,{useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom'; 
import heartimg from '../photo/heart-solid.svg'
import cartimg from '../photo/cart-shopping-solid.svg'
import '../component-css/Navbar.css'
// import downimg from '../photo/caret-down-solid.svg'
import NavDrawer from './NavDrawer'
import {CartContext} from '../Context/CartContext.jsx';
import axios from 'axios';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [userInfo, setUserInfo] = useState('');
  useEffect(() => {
    const getUserInfo = async()=>{
      try {
        const id = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:7000/userDetails/${id}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error.response?.data || error.message);
      }
    }
    getUserInfo();
  },[]);

  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
    <div className={`outer-container1 ${scrolled ? 'nav-shadow' : ''}`}>
     <div className='burger-img'>
      < NavDrawer/>
     </div>
    <div className='inner-container'>
    {/* <img className='down-img' src={downimg} alt="logo" /> */}
    {/* <img className='profile-img' src={userInfo.picture} alt={userInfo.userName} /> */}
    <Link className='link' to="/Profile"><p className='name' id='name1'>{userInfo.userName}</p></Link>
    <img className='heart-img' src={heartimg} alt="logo" />
    <Link className={`link ${scrolled ? 'wishlist-link' : ''}`} to="/wishlist/"><p className='name' id='name2'>Wishlist</p></Link>
    <Link to='/Cart'><img className='cart-img' src={cartimg} alt="logo" /></Link>
    <p className='name' id='name3'>{cart?.totalItems || 0}</p>
    </div>
    </div>
    </>
  )
}
