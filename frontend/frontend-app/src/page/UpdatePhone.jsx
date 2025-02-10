import React, { useState, useContext } from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import '../component-css/UpdatePhone.css'
import { useLocation } from 'react-router-dom'
import ProgressBar from '../component/ProgressBar'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'
import toast from 'react-hot-toast'
import { getUser } from '../utlis/user/getUser';

export default function UpdatePhone() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const { user, setUser } = useContext(UserContext)

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(phone);
  }

  const handleSubmit = async () => {
    if (!phoneNumber) {
      toast.error('Phone number is required!', { position: "top-center" });
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error('Enter a valid 10-digit phone number!', { position: "top-center" });
      return;
    }

    try {
      await axios.patch(`https://fashionethnic.onrender.com/updateuser/${user._id}`, {
        phoneNumber
      });
      const result = await getUser(user._id);
      setUser(result);
      toast.success('Phone number updated successfully!');
    } catch (error) {
      toast.error('Failed to update phone number!');
    }
  }

  return (
    <>
      <Navbar />
      <div className='mt-40 flex justify-center items-center'>
        <ProgressBar path={useLocation().pathname} />
      </div>
      <div className='flex flex-col gap-2 justify-center items-center mt-52'>
        <p className='text-base font-medium -ml-44'>Phone Number</p>
        <input
          className='border-1 border-[#a1a1a1] w-72 h-10 pl-3'
          type='tel'
          placeholder='0000000000'
          value={phoneNumber}
          onChange={handlePhoneChange}
        />
        <button
          className='-ml-52 bg-[#FE8551] text-[#132C48] p-1 text-sm rounded-sm w-20 h-8'
          type='button'
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
      <div className='mt-[400px]'>
        <Footer />
      </div>
    </>
  )
}
