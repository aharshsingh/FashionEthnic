import React from 'react'
import Navbar from '../component/Navbar'
import '../component-css/Home.css'
import homeimg from '../photo/K15R-_1_600x.webp'
import {Link} from 'react-router-dom'
import Footer from '../component/Footer'
import Products from '../component/Products'
import Pagination from '../component/Paginationcount'
import Dropdown from '../component/Dropdown'
// import CardCarousel from './CardCarousel'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';


export default function Home() {
  
  // const [userInfo, setUserInfo] = useState({});
  const {isAuthenticated, user} = useAuth0();
  const { setId } = useContext(UserContext);
  useEffect(() => {
    if (isAuthenticated && user) {
      setId(user._id);
      axios.post('http://localhost:7000/register', {
        userName: user.name,
        email: user.email
      })
      .then(response => {
        console.log('User data saved successfully:', response.data);
      })
      .catch(error => {
        console.error('Error saving user data:', error.response ? error.response.data : error);
    });
    }
    // axios.get('http://localhost:7000/userInfo')
    // .then((response) =>{
    //   setUserInfo(response.data);
    // })
    // .catch((error)=>{
    //   console.log('Error in fetching the user data');
    // });
  }, [isAuthenticated, user, setId]);
  return (
    <>
    <Navbar/>
    <div className='outer-container3'>
      <div>
      <p className='para1'>Vibrant. Cultural.<br/> Trendsetting.</p>
      <p className='para2'>Elevate your style, celebrate diversity-<br/>where tradition meets trends in every thread.</p>
      <Link className='link' to='/Products'><button className='button'><p className='para3'>Shop New Arrivals</p></button></Link>
      </div>
      <img className='home-img' src={homeimg} alt="img" />
    </div>
    <p className='line'>_________________________________________________________________________________________________________________________________________________________________</p>
    <div className='filter-container'>
      <button className='filter'>FILTERS</button>
      <Dropdown/>
    </div>
    <div className='product-container'>
    <Products/>
    </div>
    <div className='paginationcount'>
    <Pagination/>
    </div>
    {/* <CardCarousel/> */}
    <Footer/>
    </>
  )
}
