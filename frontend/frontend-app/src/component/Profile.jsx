import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Logoutbtn from './Logoutbtn';
import Dashboard from '../page/Dashboard.jsx';
import Orders from './Orders';
import ShippingAddress from './Shippingaddress.jsx';
import '../component-css/Profile.css';
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function Profile() {
  const { isAuthenticated, user } = useAuth0();
  const [activeSection, setActiveSection] = useState('');

  const renderSection = () => {
    // console.log(activeSection);
    switch (activeSection) {
      case 'Dashboard':
        return <Dashboard/>;
      case 'Orders':
        return <Orders/>;
      case 'ShippingAddress':
        return <ShippingAddress/>;
      default:
        return null; 
    }
  };

  return (
    <>
      <Navbar/>
      <p className='ac'>Account</p>                                                                               
      {isAuthenticated && <p className='username'> {user.name}</p>}
      <div className='profile-underline'></div>
      <div className='profile-outer-container'>
        <ul className='list'>
          <li className='list-content' onClick={() => setActiveSection('Dashboard')}>Dashboard</li>
          <li className='list-content' onClick={() => setActiveSection('Orders')}>Orders</li>
          <Link to='/Cart' className='link'><li className='list-content'>Cart</li></Link>
          <li className='list-content' onClick={() => setActiveSection('ShippingAddress')}>Shipping Address</li>
          <Link to='/Wishlist' className='link'><li className='list-content'>Wishlist</li></Link>
          <Link to='/ContactUs' className='link'><li className='list-content'>Contact Us</li></Link>
          {isAuthenticated  ?  <li className='list-content'><Logoutbtn/></li> : <p></p>}
          <Link to='/TermsofUse' className='link'><li className='list-content'>Terms of Use</li></Link>
          <Link to='/PrivacyPolicy' className='link'><li className='list-content'>Privacy Policy</li></Link>
        </ul>
        <div className='profile-underline1'></div>
        <div className='component-div'>
          {renderSection()}
        </div>
      </div>
      <Footer/>
    </>
  );
}
