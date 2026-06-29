import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Dashboard from '../component/Dashboard.jsx';
import '../component-css/Profile.css';
import Navbar from '../component/Navbar.jsx';
import Footer from '../component/Footer.jsx';
import { UserContext } from '../Context/UserContext.jsx';
import {
  User,
  Package,
  ShoppingBag,
  MapPin,
  Heart,
  Mail,
  FileText,
  ShieldCheck,
  ChevronRight,
  LogOut,
} from 'lucide-react';

export default function Profile() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/Signin');
  };

  const initials = (user.userName || 'User')
    .trim()
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  // Actions that navigate to other routes
  const linkItems = [
    { to: '/Orders', label: 'Orders', desc: 'Track your purchases', icon: Package },
    { to: '/Profile/Shippingaddress', label: 'Shipping Address', desc: 'Manage addresses', icon: MapPin },
    { to: '/Cart', label: 'Cart', desc: 'Review your bag', icon: ShoppingBag },
    { to: '/Wishlist', label: 'Wishlist', desc: 'Saved for later', icon: Heart },
    { to: '/ContactUs', label: 'Contact Us', desc: 'Get in touch', icon: Mail },
    { to: '/TermsofUse', label: 'Terms of Use', desc: 'Our policies', icon: FileText },
    { to: '/PrivacyPolicy', label: 'Privacy Policy', desc: 'Your data, protected', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-28">
        {/* Profile header card */}
        <section className="animate-fade-up overflow-hidden rounded-3xl border border-navy/5 bg-white shadow-card">
          <div className="bg-hero-radial bg-navy px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
              <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-white/10 text-2xl font-bold text-white ring-4 ring-white/10 backdrop-blur sm:h-24 sm:w-24">
                {initials || <User className="h-9 w-9" />}
              </span>
              <div>
                <p className="eyebrow border-white/20 bg-white/10 text-coral-200">My Account</p>
                <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                  {user.userName || 'User'}
                </h1>
                {user.email && (
                  <p className="mt-1 flex items-center justify-center gap-2 text-sm text-white/70 sm:justify-start">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Profile details */}
        <section className="mt-10 rounded-3xl border border-navy/5 bg-white p-6 shadow-soft sm:p-8 lg:p-10">
          <Dashboard />
        </section>

        {/* Quick links */}
        <h2 className="mt-12 font-display text-xl font-bold text-navy">Quick Links</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {linkItems.map(({ to, label, desc, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className="group flex items-center gap-4 rounded-2xl border border-navy/5 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-coral/10 group-hover:text-coral">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-navy">{label}</span>
                <span className="block text-sm text-navy/50">{desc}</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-navy/30 transition-transform group-hover:translate-x-0.5 group-hover:text-coral" />
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-500 transition-all hover:border-red-300 hover:bg-red-100"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </main>

      <Footer />
    </div>
  );
}
