import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import arrorimg from '../photo/greater-than-solid.svg';
import maleimg from '../photo/mars-solid.svg';
import femaleimg from '../photo/venus-solid.svg';
import othersimg from '../photo/genderless-solid.svg';
import '../component-css/UpdateGender.css';
import { Link, useLocation } from 'react-router-dom';
import ProgressBar from '../component/ProgressBar';

export default function UpdatePhone() {
  const [gender, setGender] = useState('');

  const renderGender = (gender)=>{
    setGender(gender);
    console.log('hello')
  }
  return (
    <>
      <Navbar />
      <div className='mt-40 flex justify-center items-center'>
        <ProgressBar path={useLocation().pathname} />
      </div>
      <div className='flex flex-col gap-4 justify-center items-center mt-52'>
        <p className='text-base font-medium -ml-44'>Gender</p>
        <div>
          <div className='flex justify-center items-center gap-5'>
            {/* Male Icon */}
            <div className='cursor-pointer relative' onMouseEnter={()=> renderGender("Male")}>
              <div className='w-12 h-12 rounded-full hover:rounded-full hover:bg-orange-500 hover:w-12 hover:h-12 transition-colors ease-in-out duration-300 flex justify-center items-center'>
                <img className='w-7 h-7' src={maleimg} alt='maleimg' />
              </div>
              <p className='mt-3 text-black'>{gender}</p>
            </div>
            
            {/* Female Icon */}
            <div className='relative' onMouseEnter={()=> renderGender("Female")}>
              <div className='w-12 h-12 rounded-full hover:rounded-full hover:bg-orange-500 hover:w-12 hover:h-12 transition-colors ease-in-out duration-300 flex justify-center items-center'>
                <img className='w-7 h-7' src={femaleimg} alt='femaleimg' />
              </div>
              <p className='mt-3 text-black'>{gender}</p>
            </div>

            {/* Others Icon */}
            <div className='relative' onMouseEnter={()=> renderGender("Others")}>
              <div className='w-12 h-12 rounded-full hover:rounded-full hover:bg-orange-500 hover:w-12 hover:h-12 transition-colors ease-in-out duration-300 flex justify-center items-center'>
                <img className='w-7 h-7' src={othersimg} alt='othersimg' />
              </div>
              <p className='mt-3 text-black'>{gender}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-[400px]'>
        <Footer />
      </div>
    </>
  );
}
