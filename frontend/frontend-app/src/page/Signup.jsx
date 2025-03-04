import React, { useState } from 'react';
import '../component-css/Signup.css';
import signupImage from '../photo/64e74bb7657e506338faa8c9_1692879799068.jpg';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../photo/Screenshot_2025-02-08_232617-removebg-preview.png';
import toast from 'react-hot-toast';
export default function Signin() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", userName: "", password: "" });

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: "", userName: "", password: "" };

    if (!userName.trim()) {
      newErrors.userName = "Username is required";
      isValid = false;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); 
    try {
      const response = await axios.post('https://fashionethnic.onrender.com/signup', {
        userName,
        email,
        password
      });
      if (response.status === 200) {
        toast.success('Sign up successfully'); 
        navigate('/signin');
      }
    } catch (error) {
      console.log(error);
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
          <img
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            src={signupImage}
            alt="signupImage"
          />
          <div className="fadeOverlay"></div>
        </div>
        <div className='flex flex-col justify-center items-center lg:mt-28 mt-5'>
          <p className='lg:text-4xl text-2xl'>Create an account</p>
          <Link to='/signin'><p className='cursor-pointer FormSubHeading lg:text-base text-xs text-center'>Already have an account? Log in</p></Link>
          <form className='flex flex-col justify-center items-center' onSubmit={handleFormSubmission}>
            <div className='mt-12 text-sm'>
              <div className="flex justify-between items-center">
                <label className='text-base'>What should we call you?</label>
                {errors.userName && <p className="text-red-500 text-xs">{errors.userName}</p>}
              </div>
              <input
                type='text'
                placeholder='Enter your profile name'
                className='userInput md:w-[400px] lg:w-[600px] w-[350px] pl-2'
                required
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </div>

            <div className='mt-12 text-base'>
              <div className="flex justify-between items-center">
                <label className='text-base'>What's your email?</label>
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>
              <input
                type='text'
                placeholder='Enter your Email address'
                className='userInput md:w-[400px] lg:w-[600px] w-[350px] pl-2'
                required
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div className='mt-12'>
              <div className="flex justify-between items-center">
                <label className='text-base'>Create your password</label>
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>
              <input
                type='password'
                placeholder='Enter your password'
                className='userInput md:w-[400px] lg:w-[600px] w-[350px] pl-2'
                required
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            
            <p className='mt-12 ml-2'>By creating an account, you agree to the <span className='termsSpan'>Terms of use</span> and <span className='termsSpan'>Privacy Policy</span></p>
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
                  Signing up...
                </div>
              ) : (
                'Create an account'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
