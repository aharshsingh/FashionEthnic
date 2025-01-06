import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../component/Dashboard.jsx';
import Orders from '../component/Orders.jsx';
import ShippingAddress from '../component/Shippingaddress.jsx';
import '../component-css/Profile.css';
import Navbar from '../component/Navbar.jsx'
import Footer from '../component/Footer.jsx'

export default function Profile() {
  const [activeSection, setActiveSection] = useState('');

  const renderSection = () => {
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
      <div className='profile-underline'></div>
      <div className='profile-outer-container'>
        <ul className='list'>
          <li className='list-content' onClick={() => setActiveSection('Dashboard')}>Dashboard</li>
          <li className='list-content' onClick={() => setActiveSection('Orders')}>Orders</li>
          <Link to='/Cart' className='link'><li className='list-content'>Cart</li></Link>
          <li className='list-content' onClick={() => setActiveSection('ShippingAddress')}>Shipping Address</li>
          <Link to='/Wishlist' className='link'><li className='list-content'>Wishlist</li></Link>
          <Link to='/ContactUs' className='link'><li className='list-content'>Contact Us</li></Link>
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
