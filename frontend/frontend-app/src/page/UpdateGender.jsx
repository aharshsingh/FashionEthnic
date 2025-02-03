import React from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import arrorimg from '../photo/greater-than-solid.svg'
import maleimg from '../photo/mars-solid.svg'
import femaleimg from '../photo/venus-solid.svg'
import othersimg from '../photo/genderless-solid.svg'
import '../component-css/UpdateGender.css'
import {Link} from 'react-router-dom'
export default function UpdatePhone() {
  return (
    <>
    <Navbar/>
    <div className='gender-outer-container'>
    <h3 className='gender-heading'>Your Gender</h3>
    <div className='gender-container'>
        <div className='gender-box'><img className='gender-img' src={maleimg} alt='img not loaded'/><p className='gender-para'>Male</p></div>
        <div className='vline'></div>
        <div className='gender-box'><img className='gender-img' src={femaleimg} alt='img not loaded'/><p className='gender-para'>Female</p></div>
        <div className='vline'></div>
        <div className='gender-box'><img className='gender-img' src={othersimg} alt='img not loaded'/><p className='gender-para'>Others</p></div>
        <Link to='/UpdateDOB'><img className='arrow-img' src={arrorimg} alt='img not loaded'/></Link>
    </div>  
    </div>
    <Footer/>
    </>
  )
}
