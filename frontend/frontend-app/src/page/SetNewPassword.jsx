import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import signupImage from "../photo/64e74bb7657e506338faa8c9_1692879799068.jpg";
import "../component-css/Signup.css";
import logo from "../photo/Screenshot_2025-02-08_232617-removebg-preview.png";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import axios from "axios";

export default function ForgotPassword({ length = 6 }) {
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state;

  const handleFormSubmission = async(event) => {
    event.preventDefault();
    let validationErrors = {};
    if(!password){
        validationErrors.password = "Password is required";
    }
    if (password !== confirmPassword) {
        validationErrors.confirmPassword = "Passwords do not match";
      }
      const enteredOtp = otp.join("");
      if (enteredOtp.length !== length) {
        validationErrors.otp = "Please enter the full OTP";
      }
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }  
    setErrors({});
    setLoading(true);
    try {
        console.log(enteredOtp, password, email)
        await axios.patch('https://fashionethnic.onrender.comapi/api/auth/reset_password',{
            password,
            otp: enteredOtp,
            email
        });

        console.log(enteredOtp, password, email)
        setLoading(false);
        toast.success('Password updated');
        navigate('/signin');
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };


  return (
    <div>
      <div className="flex justify-center items-center mt-6 lg:justify-start lg:items-start lg:mt-0">
        <img className="w-40 lg:w-28" src={logo} alt="logo" />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div
          className="hidden lg:block"
          style={{
            paddingTop: "100px",
            position: "relative",
            height: "80vh",
            width: "600px",
          }}
        >
          <img
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            src={signupImage}
            alt="signupImage"
          />
          <div className="fadeOverlay"></div>
        </div>
        <div className="flex flex-col justify-center items-center lg:mt-28 mt-5">
          <p className="lg:text-4xl text-2xl">Reset your password</p>
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleFormSubmission}
          >
            <div className="mt-12 text-sm">
              <div className="flex justify-between items-center">
                <label className="text-base">Enter new password</label>
              </div>
              <input
                type="password"
                placeholder="*********"
                className="userInput md:w-[400px] lg:w-[600px] w-[350px] pl-2"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div className="mt-12 text-sm">
              <div className="flex justify-between items-center">
                <label className="text-base">Confirm password</label>
              </div>
              <input
                type="password"
                placeholder="*********"
                className="userInput md:w-[400px] lg:w-[600px] w-[350px] pl-2"
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="flex space-x-2 justify-center mt-4 flex-col items-center">
                <div>
                    {otp.map((digit, index) => (
                        <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="w-12 h-12 border text-center text-lg rounded"
                        value={digit}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        />
                    ))}
                </div>
                <p className="mt-2">Enter OTP</p>
            </div>
            <div className="text-center">
              {errors.auth && (
                <p className="text-red-500 mt-4 -mb-5">{errors.auth}</p>
              )}
            </div>
            {/* <Link to='/setnewpassword'> */}
            <button
              className={`submitRegisterForm transition-colors duration-300 ease-in-out md:w-[400px] lg:w-[600px] w-[350px] mt-12 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                    viewBox="0 0 24 24"
                  ></svg>
                  Reseting password...
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
}
