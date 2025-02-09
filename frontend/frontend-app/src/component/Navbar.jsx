import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heartimg from '../photo/heart-solid.svg';
import cartimg from '../photo/cart-shopping-solid.svg';
import '../component-css/Navbar.css';
import NavDrawer from './NavDrawer';
import { CartContext } from '../Context/CartContext.jsx';
import { UserContext } from '../Context/UserContext.jsx';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, isLoggedIn } = useContext(UserContext);
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
        <div className="mt-2 lg:ml-3 ml-1">
          <NavDrawer />
        </div>
        <div className="flex mt-[15px] flex-row gap-4 lg:gap-16 lg:mr-12 mr-3">
          {isLoggedIn ? (
            <Link className="link" to="/Profile">
              <p className="name lg:text-xl text-base">{user.userName || 'User'}</p>
            </Link>
          ) : (
            <Link className="link login-link" to="/Signup">
              <button className="name lg:text-xl text-base">Signup</button>
            </Link>
          )}
          <div className='flex'>
          <img className="heart-img w-6 h-6" src={heartimg} alt="Wishlist Icon" />
          <Link className={`link ${scrolled ? 'wishlist-link' : ''}`} to="/wishlist/">
          <p className="name lg:text-xl text-base">Wishlist</p>
          </Link>
          </div>
          <div className='flex'>
          <Link to="/Cart">
            <img className="cart-img lg:w-5 lg:h-5" src={cartimg} alt="Cart Icon" />
          </Link>
          <p className="name text-xl" id="name3">{cart?.totalItems || 0}</p>
          </div>
        </div>
      </div>
    </>
  );
}
