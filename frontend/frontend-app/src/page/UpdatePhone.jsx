import React, { useState, useContext } from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import '../component-css/UpdatePhone.css'
import { useLocation } from 'react-router-dom'
import ProgressBar from '../component/ProgressBar'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'
import toast from 'react-hot-toast'

export default function UpdatePhone() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const { user } = useContext(UserContext)

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      console.log(user._id)

      const response = await axios.patch(`http://localhost:7000/updateuser/${user._id}`, {
        phoneNumber
      });
      toast.success('Phone number updated successfully!')
    } catch (error) {
      toast.error('Failed to update phone number!')
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
          placeholder='00-0000-0000'
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
