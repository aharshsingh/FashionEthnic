import React, {useState, useContext} from 'react'
import '../component-css/Signup.css'
import signupImage from '../photo/64e74bb7657e506338faa8c9_1692879799068.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../Context/UserContext'
export default function Signin() {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate(); 
const { updateUserId } = useContext(UserContext);

const handleFormSubmission = async(e) =>{
  e.preventDefault();
  try {
    const response = await axios.post('https://fashionethnic.onrender.com/signin',{
      email,
      password
    })
    localStorage.setItem("token" , response.data.token);
    await updateUserId(response.data.token);
    if (response.status === 200) {
      navigate('/');
    }
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div style={{display:'flex', justifyContent:'space-around', marginTop:'50px'}}>
        <div style={{ paddingTop: '100px', position: 'relative', height: '80vh', width: '600px' }}>
    <img
      style={{ height: '100%', width: '100%', objectFit: 'cover' }}
      src={signupImage}
      alt="signupImage"
    />
    <div className="fadeOverlay"></div>
  </div>
      <div className='LoginFormContainer'>
        <p className='FormHeading'>Welcome, Login here</p>
        <form>
            <div className='inputDiv'>
            <label>What's your email?</label><br/>
            <input 
            type='text' 
            placeholder='Enter your Email address'
            className='userInput'
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}/>
            </div>
            <div className='inputDiv'>
            <label>Your password</label><br/>
            <input 
            type='text' 
            placeholder='Enter your password'
            className='userInput'
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}/>
            </div>
            <button type='submit' className='submitLoginForm' onClick={handleFormSubmission}>Log into account</button>
        </form>
    </div>
    </div>
    
  )
}
