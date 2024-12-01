import React from 'react'
import '../component-css/Signup.css'
export default function Signin() {
  
  return (
    <div className='registerFormContainer'>
        <p className='FormHeading'>Create an account</p>
        <p className='FormSubHeading'>Already have an account? Log in</p>
        <form>
            <div className='inputDiv'>
            <label >What should we call you?</label><br/>
            <input 
            type='text' 
            placeholder='Enter your profile name'
            className='userInput'/>
            </div>
            <div className='inputDiv'>
            <label>What's your email?</label><br/>
            <input 
            type='text' 
            placeholder='Enter your Email address'
            className='userInput'/>
            </div>
            <div className='inputDiv'>
            <label>Create your password</label><br/>
            <input 
            type='text' 
            placeholder='Enter your password'
            className='userInput'/>
            </div>
            <p className='rgisterLabel'>By creating an account, you agree to the <span className='termsSpan'>Terms of use</span> and <span className='termsSpan'>Privacy Policy</span></p>
            <button type='submit' className='submitRegisterForm'>Create an account</button>
        </form>
    </div>
  )
}
