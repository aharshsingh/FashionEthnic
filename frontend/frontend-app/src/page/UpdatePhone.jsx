import React from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import arrorimg from '../photo/greater-than-solid.svg'
import '../component-css/UpdatePhone.css'
import DropCode from '../component/Dropdowncode'
import {Link} from 'react-router-dom'
export default function UpdatePhone() {
  return (
    <>
    <Navbar/>
    <div className='update-container'>
    <h3 className='update-heading'>Enter your Phone Number</h3>
    <div className='phone-container'>
        <DropCode/>
        <input className='phone-input' type="tel" placeholder='0000-000-000'/>
        <Link to='/UpdateGender'><img className='arrow-img' src={arrorimg} alt='img not loaded'/></Link>
    </div>  
    </div>
    <Footer/>
    </>
  )
}
