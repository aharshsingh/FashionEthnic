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
import { Calendar } from 'lucide-react'

export default function UpdatePhone() {
  const [dob, setDob] = useState('');
  const {user, setUser} = useContext(UserContext);

  const handlePhoneChange = (event)=>{
    setDob(event.target.value);
  }

  const handleSubmit = async ()=>{
    try {
      console.log(user._id)
      await axios.patch(`https://fashionethnic.onrender.com/api/users/update/${user._id}`, {
        dob
      });
      const result = await getUser(user._id);
      setUser(result);
      toast.success('Date of birth updated successfully!', { position: "top-center" })
    } catch (error) {
      toast.error('Failed to update date of birth!', { position: "top-center" })
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar/>

      <main className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-20 pt-24 sm:px-6 lg:pt-28">
        <div className="w-full max-w-md">
          <ProgressBar path={useLocation().pathname}/>
        </div>

        <section className="animate-fade-up mt-10 w-full max-w-md rounded-3xl border border-navy/5 bg-white p-8 shadow-card">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-coral/10 text-coral">
            <Calendar className="h-6 w-6" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-navy">Update Date of Birth</h1>
          <p className="mt-1 text-sm text-navy/60">
            We use this to personalize your experience.
          </p>

          <label className="mt-6 block text-sm font-semibold text-navy" htmlFor="dob">
            Date of Birth
          </label>
          <input
            id="dob"
            className="mt-2 w-full rounded-xl border border-navy/15 bg-cream/50 px-4 py-3 text-navy placeholder:text-navy/30 transition-all focus:border-coral focus:bg-white focus:outline-none focus:ring-4 focus:ring-coral/20"
            type="date"
            placeholder='DD-MM-YYYY'
            value={dob}
            onChange={handlePhoneChange}
          />

          <button className='btn-primary mt-6 w-full' onClick={handleSubmit} type='button'>
            Update
          </button>
        </section>
      </main>

      <Footer/>
    </div>
  )
}
