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
import { Users } from 'lucide-react';

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
      await axios.patch(`https://fashionethnic.onrender.com/api/users/update/${user._id}`,{
        gender: hoveredGender
      })
      const result = await getUser(user._id);
      setUser(result);
      toast.success('Gender updated successfully!', { position: "top-center" })
    } catch (error) {
      toast.error('Failed to update gender!', { position: "top-center" })
    }
  }

  const genders = [
    { label: 'Male', img: maleimg },
    { label: 'Female', img: femaleimg },
    { label: 'Others', img: othersimg },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-20 pt-24 sm:px-6 lg:pt-28">
        <div className="w-full max-w-md">
          <ProgressBar path={useLocation().pathname} />
        </div>

        <section className="animate-fade-up mt-10 w-full max-w-md rounded-3xl border border-navy/5 bg-white p-8 shadow-card">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-coral/10 text-coral">
            <Users className="h-6 w-6" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-navy">Update Gender</h1>
          <p className="mt-1 text-sm text-navy/60">
            Select a gender to update your profile.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {genders.map(({ label, img }) => {
              const active = hoveredGender === label;
              return (
                <button
                  key={label}
                  type="button"
                  className={`flex cursor-pointer flex-col items-center gap-3 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${
                    active
                      ? 'border-coral bg-coral/5 ring-1 ring-coral/20'
                      : 'border-navy/10 bg-cream/50 hover:border-coral/40'
                  }`}
                  onMouseEnter={() => renderGender(label)}
                  onMouseLeave={removeGender}
                  onClick={handleGender}
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-full transition-colors duration-300 ${
                      active ? 'bg-coral' : 'bg-navy/5'
                    }`}
                  >
                    <img className='h-6 w-6' src={img} alt={label} />
                  </span>
                  <span className={`text-sm font-semibold ${active ? 'text-coral' : 'text-navy/70'}`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
