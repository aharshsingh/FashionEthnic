import React, {useContext, useState} from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import '../component-css/UpdateDOB.css'
import {useLocation } from 'react-router-dom'
import ProgressBar from '../component/ProgressBar'
import { UserContext } from '../Context/UserContext';
import axios from 'axios'
import toast from 'react-hot-toast'
import {getUser} from '../utlis/user/getUser';

export default function UpdatePhone() {
  const [dob, setDob] = useState('');
  const {user, setUser} = useContext(UserContext);

  const handlePhoneChange = (event)=>{
    setDob(event.target.value);
  }

  const handleSubmit = async ()=>{
    try {
      console.log(user._id)
      const response = await axios.patch(`https://fashionethnic.onrender.com/updateuser/${user._id}`, {
        dob
      });
      const result = await getUser(user._id);
      setUser(result);
      toast.success('Date of birth updated successfully!')
    } catch (error) {
      toast.error('Failed to update date of birth!')
    }
  }
  return (
    <>
    <Navbar/>
    <div className='mt-40 flex justify-center items-center'>
            <ProgressBar path={useLocation().pathname}/>
    </div>
    <div className='flex flex-col gap-2 justify-center items-center  mt-52'>
          <p className='text-base font-medium -ml-48'>Date of birth</p>
          <input className='border-1 border-[#a1a1a1] w-72 h-10 pl-3' type="date" placeholder='DD-MM-YYYY'  value={dob} onChange={handlePhoneChange} />
          <button className='-ml-52 bg-[#FE8551] text-[#132C48] p-1 text-sm rounded-sm w-20 h-8' onClick={handleSubmit} type='button'>Update</button>
        </div>
        <div className='mt-[400px]'>
          <Footer/>
        </div>
    </>
  )
}