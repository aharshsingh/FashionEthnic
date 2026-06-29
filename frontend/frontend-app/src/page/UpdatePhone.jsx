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
import { Phone } from 'lucide-react'

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
      await axios.patch(`https://fashionethnic.onrender.com/api/users/update/${user._id}`, {
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
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-20 pt-24 sm:px-6 lg:pt-28">
        <div className="w-full max-w-lg">
          <ProgressBar path={useLocation().pathname} />
        </div>

        <section className="animate-fade-up mt-10 w-full max-w-md rounded-3xl border border-navy/5 bg-white p-8 shadow-card">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-coral/10 text-coral">
            <Phone className="h-6 w-6" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-navy">Update Phone Number</h1>
          <p className="mt-1 text-sm text-navy/60">
            Enter a valid 10-digit mobile number for your account.
          </p>

          {user?.phoneNumber && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1.5 text-sm text-navy/70">
              Current: <span className="font-semibold text-navy">{user.phoneNumber}</span>
            </p>
          )}

          <label className="mt-6 block text-sm font-semibold text-navy" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            className="mt-2 w-full rounded-xl border border-navy/15 bg-cream/50 px-4 py-3 text-navy placeholder:text-navy/30 transition-all focus:border-coral focus:bg-white focus:outline-none focus:ring-4 focus:ring-coral/20"
            type='tel'
            placeholder='0000000000'
            value={phoneNumber}
            onChange={handlePhoneChange}
          />

          <button
            className='btn-primary mt-6 w-full'
            type='button'
            onClick={handleSubmit}
          >
            Update
          </button>
        </section>
      </main>

      <Footer />
    </div>
  )
}
