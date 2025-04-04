import React from 'react'
import { Footerdemo } from "../components/ui/footer-section";

// import instaimg from '../photo/instagram (2).svg'
// import facebookimg from '../photo/facebook (2).svg'
// import twitterimg from '../photo/twitter (1).svg'
// import youtubeimg from '../photo/youtube.svg'
// import {Link} from 'react-router-dom'
export default function Footer() {
  return (
    <div className="block">
      <Footerdemo />
    </div>
    // <div className='bg-[#132C48] h-[500px]'>
    //   <h1 className='text-xl text-[#FFEFFF] text-center font-bold pt-36'>CUSTOMER POLICIES</h1>
    //   <div className='flex justify-center items-center gap-14 mt-3 text-[#FFEFFF] text-base'>
    //     <Link to='/ContactUs'><p>Contact Us</p></Link>
    //     <p>FAQ</p>
    //     <p>T&C</p>
    //     <Link to='/TermsofUse'><p>Terms of use</p></Link>
    //   </div>
    //   <div className='flex justify-center items-center gap-10 text-[#FFEFFF] text-base'>
    //     <p>About Us</p>
    //     <p>Track Order</p>
    //     <Link to='/PrivacyPolicy'><p>Privacy Policy</p></Link>
    //   </div>
    //   <p className='text-xl text-[#FFEFFF] text-center pt-14'>KEEP IN TOUCH</p>
    //   <div className='flex justify-center items-center gap-14 mt-3'>
    //     <img className='w-6 h-6' src={instaimg} alt="logo" />
    //     <img className='w-6 h-6' src={facebookimg} alt="logo" />
    //     <img className='w-6 h-6' src={twitterimg} alt="logo" />
    //     <img className='w-6 h-6' src={youtubeimg} alt="logo" />
    //   </div>
    // </div>
  )
}
