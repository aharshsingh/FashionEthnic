import React, { useState, useContext } from 'react';
import '../component-css/Signup.css';
import signupImage from '../photo/64e74bb7657e506338faa8c9_1692879799068.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import logo from '../photo/FashionEthnic_mark.svg';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', auth: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { updateUserId } = useContext(UserContext);

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
    if (!validateForm()) {
      const firstError = !email.trim()
        ? 'Email is required'
        : !/^\S+@\S+\.\S+$/.test(email)
          ? 'Enter a valid email address'
          : 'Password is required';
      toast.error(firstError);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://fashionethnic.onrender.com/api/auth/signin', {
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
      let message;
      if (error.response) {
        const data = error.response.data;
        const serverMsg = typeof data === 'string' ? data : (data?.message || data?.error);
        message = error.response.status === 401
          ? 'Invalid email or password'
          : (serverMsg || 'Invalid email or password');
      } else {
        message = 'Network error. Check your connection.';
      }
      setErrors({ email: '', password: '', auth: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
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
                  <Sparkles className="h-3.5 w-3.5" /> Welcome Back
                </span>
                <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-white xl:text-5xl">
                  Where heritage meets modern elegance.
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
                  Sign in to explore curated ethnic wear, track your orders, and unlock a wardrobe crafted just for you.
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
                <span className="eyebrow">Sign In</span>
                <h1 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl">
                  Welcome, login here
                </h1>
                <p className="mt-2 text-sm text-navy-500">
                  Enter your details to access your account.
                </p>
              </div>

              <form className="mt-8 space-y-5" onSubmit={handleFormSubmission}>
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-sm font-medium text-navy">What's your email?</label>
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/40" />
                    <input
                      type="text"
                      placeholder="Enter your Email address"
                      className="w-full rounded-xl border border-navy/15 bg-white py-3 pl-11 pr-4 text-sm text-navy outline-none transition placeholder:text-navy/40 focus:border-coral focus:ring-2 focus:ring-coral/20"
                      required
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-sm font-medium text-navy">Your password</label>
                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-navy/15 bg-white py-3 pl-11 pr-11 text-sm text-navy outline-none transition placeholder:text-navy/40 focus:border-coral focus:ring-2 focus:ring-coral/20"
                      required
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy/40 transition hover:text-coral"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link to="/forgotpassword" className="text-sm font-medium text-coral transition hover:text-coral-600">
                    Forgot Password?
                  </Link>
                </div>

                {errors.auth && (
                  <p className="rounded-xl bg-red-50 px-4 py-2.5 text-center text-sm text-red-500">{errors.auth}</p>
                )}

                <button
                  type="submit"
                  className={`btn-primary w-full ${loading ? 'cursor-not-allowed opacity-60' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="mr-2 h-5 w-5 animate-spin rounded-full border-t-2 border-white" viewBox="0 0 24 24"></svg>
                      Logging in...
                    </span>
                  ) : (
                    <>
                      Log into account
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              {/* <button
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-full border border-navy/15 bg-white py-3 font-semibold text-navy transition hover:border-navy/40 hover:bg-navy-50"
                onClick={googleLogin}
              >
                <img className="h-5 w-5" src={googleImg} alt="googleImg" />
                <span>Login with Google</span>
              </button> */}

              <p className="mt-8 text-center text-sm text-navy-500">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-coral transition hover:text-coral-600">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
