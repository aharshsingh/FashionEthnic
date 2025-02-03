import React from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import '../component-css/UpdatePhone.css'
import DropCode from '../component/Dropdowncode'
import {useLocation } from 'react-router-dom'
import ProgressBar from '../component/ProgressBar'
export default function UpdatePhone() {
  return (
    <>
    <Navbar/>
    <div className='mt-40 flex justify-center items-center'>
    <ProgressBar path={useLocation().pathname}/>
    </div>
    <div className='flex flex-col gap-2 justify-center items-center  mt-52'>
      <p className='text-base font-medium -ml-44'>Phone Number</p>
      <input className='border-1 border-[#a1a1a1] w-72 h-10 pl-3' type="tel" placeholder='00-0000-0000'/>
      <button className='-ml-52 bg-[#FE8551] text-[#132C48] p-1 text-sm rounded-sm w-20 h-8'>Update</button>
    </div>
    <div className='mt-[400px]'>
      <Footer/>
    </div>
    </>
  )
}
