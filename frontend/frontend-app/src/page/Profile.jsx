import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../component/Dashboard.jsx';
import Orders from '../component/Orders.jsx';
import ShippingAddress from '../component/Shippingaddress.jsx';
import '../component-css/Profile.css';
import Navbar from '../component/Navbar.jsx';
import Footer from '../component/Footer.jsx';
import { UserContext } from '../Context/UserContext.jsx';

export default function Profile() {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const { user } = useContext(UserContext);

  const renderSection = () => {
    switch (activeSection) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Orders':
        return <Orders />;
      case 'ShippingAddress':
        return <ShippingAddress />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className='mt-28 mb-2'>
        <p className='ac font-semibold'>Account</p>
        <p className='ml-[470px] text-sm'>{user.userName}</p>
      </div>
      <div className='profile-underline border-[#dddddd]'></div>
      <div className='profile-outer-container'>
        <ul className='list'>
          <li className='list-content cursor-pointer' onClick={() => setActiveSection('Dashboard')}>Dashboard</li>
          <li className='list-content cursor-pointer' onClick={() => setActiveSection('Orders')}>Orders</li>
          <Link to='/Cart' className='link'><li className='list-content'>Cart</li></Link>
          <li className='list-content cursor-pointer' onClick={() => setActiveSection('ShippingAddress')}>Shipping Address</li>
          <Link to='/Wishlist' className='link'><li className='list-content'>Wishlist</li></Link>
          <Link to='/ContactUs' className='link'><li className='list-content'>Contact Us</li></Link>
          <Link to='/TermsofUse' className='link'><li className='list-content'>Terms of Use</li></Link>
          <Link to='/PrivacyPolicy' className='link'><li className='list-content'>Privacy Policy</li></Link>
        </ul>
        <div className='profile-underline1 border-[#dddddd]'></div>
        <div className='component-div'>
          {renderSection()}
        </div>
      </div>
      <Footer />
    </>
  );
}
