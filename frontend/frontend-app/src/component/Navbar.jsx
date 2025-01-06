import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heartimg from '../photo/heart-solid.svg';
import cartimg from '../photo/cart-shopping-solid.svg';
import '../component-css/Navbar.css';
import NavDrawer from './NavDrawer';
import { CartContext } from '../Context/CartContext.jsx';
import axios from 'axios';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [userInfo, setUserInfo] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      const id = localStorage.getItem('userId');
      if (id) {
        setIsLoggedIn(true);
        try {
          const response = await axios.get(`http://localhost:7000/userDetails/${id}`);
          setUserInfo(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error.response?.data || error.message);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    getUserInfo();
  }, []);

  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 50);
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
        <div className="burger-img">
          <NavDrawer />
        </div>
        <div className="inner-container">
          {isLoggedIn ? (
            <Link className="link" to="/Profile">
              <p className="name" id="name1">{userInfo.userName || 'User'}</p>
            </Link>
          ) : (
            <Link className="link login-link" to="/Signup">
              <button className="name" id="name1">Signup</button>
            </Link>
          )}
          <img className="heart-img" src={heartimg} alt="Wishlist Icon" />
          <Link className={`link ${scrolled ? 'wishlist-link' : ''}`} to="/wishlist/">
            <p className="name" id="name2">Wishlist</p>
          </Link>
          <Link to="/Cart">
            <img className="cart-img" src={cartimg} alt="Cart Icon" />
          </Link>
          <p className="name" id="name3">{cart?.totalItems || 0}</p>
        </div>
      </div>
    </>
  );
}
