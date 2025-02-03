import React from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import arrorimg from '../photo/greater-than-solid.svg'
import '../component-css/UpdateDOB.css'
import {Link} from 'react-router-dom'
export default function UpdatePhone() {
  return (
    <>
    <Navbar/>
    <div className='update-container'>
    <div className='phone-container'>
        <fieldset >
          <legend className='legend-input'>Date of Birth</legend>
          <input className='dob-input' type='text' placeholder='DD/MM/YYYY'></input>
        </fieldset>
        <Link to='/UpdateAltPhone'><img className='arrow-img' src={arrorimg} alt='img not loaded'/></Link>
    </div>  
    </div>
    <Footer/>
    </>
  )
}