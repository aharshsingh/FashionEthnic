import React, { useState } from "react";
import signupImage from "../photo/64e74bb7657e506338faa8c9_1692879799068.jpg";
import "../component-css/Signup.css";
import logo from "../photo/Screenshot_2025-02-08_232617-removebg-preview.png";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Mail, ArrowRight, KeyRound, ArrowLeft, Sparkles } from 'lucide-react';

export default function ForgotPassword() {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFormSubmission = async (event) => {
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
      await axios.post('https://fashionethnic.onrender.com/api/auth/forgot_password', {
        email
      });
      toast.success('OTP sent successfully');
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      navigate("/setnewpassword", { state: email });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-hero-radial bg-cream">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-navy/5 lg:grid-cols-2">
          {/* Brand panel */}
          <div className="relative hidden overflow-hidden bg-navy lg:block">
            <img
              src={signupImage}
              alt="Fashion Ethnic"
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40" />
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-coral/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-coral/10 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between p-12">
              <Link to="/" className="font-display text-2xl font-bold tracking-tight text-white">
                Fashion<span className="text-coral">Ethnic</span>
              </Link>
              <div className="animate-fade-up">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-coral-200 backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5" /> Account Recovery
                </span>
                <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-white xl:text-5xl">
                  Let's get you back in.
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
                  Enter the email linked to your account and we'll send you a one-time code to reset your password.
                </p>
              </div>
              <div className="text-xs text-white/40">© Fashion Ethnic. Crafted with care.</div>
            </div>
          </div>

          {/* Form panel */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
            <div className="mx-auto w-full max-w-md">
              <div className="flex items-center justify-between lg:hidden">
                <Link to="/" className="font-display text-2xl font-bold tracking-tight text-navy">
                  Fashion<span className="text-coral">Ethnic</span>
                </Link>
                <img className="w-16" src={logo} alt="logo" />
              </div>

              <div className="mt-8 lg:mt-0">
                <span className="eyebrow">Reset</span>
                <h1 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl">
                  Forgot your password?
                </h1>
                <p className="mt-2 text-sm text-navy-500">
                  No worries, we'll send a recovery code to your inbox.
                </p>
              </div>

              <form className="mt-8 space-y-5" onSubmit={handleFormSubmission}>
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-sm font-medium text-navy">Enter your email</label>
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/40" />
                    <input
                      type="text"
                      placeholder="Enter your Email address"
                      className="w-full rounded-xl border border-navy/15 bg-white py-3 pl-11 pr-4 text-sm text-navy outline-none transition placeholder:text-navy/40 focus:border-coral focus:ring-2 focus:ring-coral/20"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                </div>

                {errors.auth && (
                  <p className="rounded-xl bg-red-50 px-4 py-2.5 text-center text-sm text-red-500">{errors.auth}</p>
                )}

                <button
                  className={`btn-primary w-full ${loading ? 'cursor-not-allowed opacity-60' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="mr-2 h-5 w-5 animate-spin rounded-full border-t-2 border-white" viewBox="0 0 24 24"></svg>
                      Sending OTP...
                    </span>
                  ) : (
                    <>
                      <KeyRound className="h-5 w-5" />
                      Reset Password
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              <Link
                to="/signin"
                className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-navy-500 transition hover:text-coral"
              >
                <ArrowLeft className="h-4 w-4" /> Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
