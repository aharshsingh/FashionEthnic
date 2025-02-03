import React, { useState, useContext } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import maleimg from '../photo/mars-solid.svg';
import femaleimg from '../photo/venus-solid.svg';
import othersimg from '../photo/genderless-solid.svg';
import '../component-css/UpdateGender.css';
import { useLocation } from 'react-router-dom';
import ProgressBar from '../component/ProgressBar';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import toast from 'react-hot-toast'
import {getUser} from '../utlis/user/getUser';

export default function UpdatePhone() {
  const [hoveredGender, setHoveredGender] = useState('');
  const {user, setUser} = useContext(UserContext);
  const renderGender = (gender) => {
    setHoveredGender(gender);
  };

  const removeGender = () => {
    setHoveredGender('');
  };

  const handleGender = async()=>{
    try {
      const response = await axios.patch(`http://localhost:7000/updateuser/${user._id}`,{
        gender: hoveredGender
      })
      const result = await getUser(user._id);
      setUser(result);
      toast.success('Gender updated successfully!')
    } catch (error) {
      toast.error('Failed to update gender!')
    }
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
            <div 
              className='cursor-pointer relative' 
              onMouseEnter={() => renderGender('Male')} 
              onMouseLeave={removeGender}
              onClick={handleGender}
            >
              <div className='w-12 h-12 rounded-full hover:rounded-full hover:bg-orange-500 hover:w-12 hover:h-12 transition-colors ease-in-out duration-300 flex justify-center items-center'>
                <img className='w-7 h-7' src={maleimg} alt='maleimg' />
              </div>
              <p 
                className={`mt-3 ml-1 text-black transition-opacity duration-200 ${hoveredGender === 'Male' ? 'opacity-100' : 'opacity-0'}`}
              >
                Male
              </p>
            </div>
            <div 
              className='cursor-pointer relative' 
              onMouseEnter={() => renderGender('Female')} 
              onMouseLeave={removeGender}
              onClick={handleGender}
            >
              <div className='w-12 h-12 rounded-full hover:rounded-full hover:bg-orange-500 hover:w-12 hover:h-12 transition-colors ease-in-out duration-300 flex justify-center items-center'>
                <img className='w-7 h-7' src={femaleimg} alt='femaleimg' />
              </div>
              <p 
                className={`mt-3 text-black transition-opacity duration-200 ${hoveredGender === 'Female' ? 'opacity-100' : 'opacity-0'}`}
              >
                Female
              </p>
            </div>
            <div 
              className='cursor-pointer relative' 
              onMouseEnter={() => renderGender('Others')} 
              onMouseLeave={removeGender}
              onClick={handleGender}
            >
              <div className='w-12 h-12 rounded-full hover:rounded-full hover:bg-orange-500 hover:w-12 hover:h-12 transition-colors ease-in-out duration-300 flex justify-center items-center'>
                <img className='w-7 h-7' src={othersimg} alt='othersimg' />
              </div>
              <p 
                className={`mt-3 text-black transition-opacity duration-200 ${hoveredGender === 'Others' ? 'opacity-100' : 'opacity-0'}`}
              >
                Others
              </p>
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
