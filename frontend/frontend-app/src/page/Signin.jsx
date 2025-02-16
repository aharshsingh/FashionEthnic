import React, { useState, useContext } from 'react';
import '../component-css/Signup.css';
import signupImage from '../photo/64e74bb7657e506338faa8c9_1692879799068.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import googleImg from '../photo/google.png';
import { auth, provider } from '../utlis/auth/Firebase';
import { signInWithPopup } from 'firebase/auth';
import logo from '../photo/Screenshot_2025-02-08_232617-removebg-preview.png';
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom'
export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', auth: '' });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { updateUserId } = useContext(UserContext);

  const googleLogin = async () => {
    const response = await signInWithPopup(auth, provider);
    console.log(response);
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: '', password: '' };

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post('https://fashionethnic.onrender.com/signin', {
        email,
        password
      });

      localStorage.setItem('token', response.data.token);
      await updateUserId(response.data.token);

      if (response.status === 200) {
        toast.success('Logged in successfully'); 
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrors({ email: '', password: '', auth: 'Invalid email or password' });
        } else {
          setErrors({ email: '', password: '', auth: 'Invalid email or password' });
        }
      } else {
        setErrors({ email: '', password: '', auth: 'Network error. Check your connection.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='flex justify-center items-center mt-6 lg:justify-start lg:items-start lg:mt-0'>
        <img className='w-40 lg:w-28' src={logo} alt='logo' />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div className='hidden lg:block' style={{ paddingTop: '100px', position: 'relative', height: '80vh', width: '600px' }}>
          <img style={{ height: '100%', width: '100%', objectFit: 'cover' }} src={signupImage} alt='signupImage' />
          <div className='fadeOverlay'></div>
        </div>
        <div className='flex flex-col justify-center items-center lg:mt-28 mt-5'>
          <p className='lg:text-4xl text-2xl'>Welcome, Login here</p>
          <form className='flex flex-col justify-center items-center' onSubmit={handleFormSubmission}>
            <div className='mt-12 text-sm'>
              <div className='flex justify-between items-center'>
                <label className='text-base'>What's your email?</label><br />
                {errors.email && <p className='text-red-500 text-xs'>{errors.email}</p>}
              </div>
              <input
                type='text'
                placeholder='Enter your Email address'
                className='userInput md:w-[400px] lg:w-[600px] w-[350px] pl-2'
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className='mt-12 text-sm'>
              <div className='flex justify-between items-center'>
                <label className='text-base'>Your password</label><br />
                {errors.password && <p className='text-red-500 text-xs'>{errors.password}</p>}
              </div>
              <input
                type='password'
                placeholder='Enter your password'
                className='userInput md:w-[400px] lg:w-[600px] w-[350px] pl-2'
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <Link to='/forgotpassword'><p className='text-xs lg:text-sm ml-60 lg:ml-[470px] mt-2 cursor-pointer'>Forgot Password?</p></Link>
            <div className='text-center'>{errors.auth && <p className='text-red-500 mt-4 -mb-5'>{errors.auth}</p>}</div>
            <button
              type='submit'
              className={`submitRegisterForm transition-colors duration-300 ease-in-out md:w-[400px] lg:w-[600px] w-[350px] mt-12 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                  Logging in...
                </div>
              ) : (
                'Log into account'
              )}
            </button>
          </form>
          <button
            className='flex justify-center items-center gap-4 border-1 border-[#d8d8d8] mt-10 rounded-full md:w-[400px] lg:w-[600px] w-[350px] h-[60px] hover:bg-[#4285F4] hover:text-white transition-colors duration-300 ease-in-out'
            onClick={googleLogin}
          >
            <span className='text-lg'>Login with Google</span>
            <img className='w-6 h-6' src={googleImg} alt='googleImg' />
          </button>
        </div>
      </div>
    </>
  );
}
