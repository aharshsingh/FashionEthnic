import React,{useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom'; 
import heartimg from '../photo/heart-solid.svg'
import cartimg from '../photo/cart-shopping-solid.svg'
import '../component-css/Navbar.css'
import downimg from '../photo/caret-down-solid.svg'
import NavDrawer from './NavDrawer'
import { useAuth0 } from "@auth0/auth0-react";
import {CartContext} from '../Context/CartContext.jsx'

export default function Navbar() {

  const {cart} = useContext(CartContext);
  const {isAuthenticated, user} = useAuth0();
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
    <img className='down-img' src={downimg} alt="logo" />
    {isAuthenticated && <img className='profile-img' src={user.picture} alt={user.name} />}
    <Link className='link' to="/Profile">{ isAuthenticated && <p className='name' id='name1'>{user.name}</p>}</Link>
    <img className='heart-img' src={heartimg} alt="logo" />
    <Link className={`link ${scrolled ? 'wishlist-link' : ''}`} to="/Wishlist"><p className='name' id='name2'>Wishlist</p></Link>
    <Link to='/Cart'><img className='cart-img' src={cartimg} alt="logo" /></Link>
    <p className='name' id='name3'>{cart.totalitems}</p>
    </div>
    </div>
    </>
  )
}
