import React, { useState } from "react";
import signupImage from "../photo/64e74bb7657e506338faa8c9_1692879799068.jpg";
import "../component-css/Signup.css";
import logo from "../photo/Screenshot_2025-02-08_232617-removebg-preview.png";
import toast from 'react-hot-toast'
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

export default function ForgotPassword() {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFormSubmission = async(event) => {
    event.preventDefault();
    let validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      validationErrors.email = "Invalid email format";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
        await axios.post('https://fashionethnic.onrender.com/api/auth/forgot_password',{
            email
        });
        toast.success('OTP sent successfully');
        setLoading(false);
    } catch (error) {
        console.log(error);
    }
    setTimeout(() => {
        navigate("/setnewpassword", {state: email});
    }, 2000);
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
          <p className="lg:text-4xl text-2xl">Forgot Your Password?</p>
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleFormSubmission}
          >
            <div className="mt-12 text-sm">
              <div className="flex justify-between items-center">
                <label className="text-base">Enter your email?</label>
              </div>
              <input
                type="text"
                placeholder="Enter your Email address"
                className="userInput md:w-[400px] lg:w-[600px] w-[350px] pl-2"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
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
                  Sending OTP...
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
