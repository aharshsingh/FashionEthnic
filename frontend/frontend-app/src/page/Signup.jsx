import React, {useState} from 'react'
import '../component-css/Signup.css'
import signupImage from '../photo/64e74bb7657e506338faa8c9_1692879799068.jpg'
import axios from 'axios';
import { useNavigate, Link} from 'react-router-dom';
export default function Signin() {

const [email, setEmail] = useState('');
const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate(); 

const handleFormSubmission = async (e) =>{
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:7000/signup',{
      userName,
      email,
      password
    })
    if (response.status === 200) {
      navigate('/signin');
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
      <div className='registerFormContainer'>
        <p className='FormHeading'>Create an account</p>
        <Link to='/signin'><p className='FormSubHeading'>Already have an account? Log in</p></Link>
        <form>
            <div className='inputDiv'>
            <label >What should we call you?</label><br/>
            <input 
            type='text' 
            placeholder='Enter your profile name'
            className='userInput'
            required
            onChange={(event) => {
              setUserName(event.target.value);
            }}/>
            </div>
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
            <label>Create your password</label><br/>
            <input 
            type='text' 
            placeholder='Enter your password'
            className='userInput'
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}/>
            </div>
            <p className='rgisterLabel'>By creating an account, you agree to the <span className='termsSpan'>Terms of use</span> and <span className='termsSpan'>Privacy Policy</span></p>
            <button type='submit' className='submitRegisterForm' onClick={handleFormSubmission}>Create an account</button>
        </form>
    </div>
    </div>
    
  )
}
