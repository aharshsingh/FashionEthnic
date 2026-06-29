import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, User } from 'lucide-react';
import logo from '../photo/FashionEthnic_logo.svg';
import '../component-css/Navbar.css';
import NavDrawer from './NavDrawer';
import { CartContext } from '../Context/CartContext.jsx';
import { UserContext } from '../Context/UserContext.jsx';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, isLoggedIn } = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/products' },
    { label: 'Contact', to: '/ContactUs' },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[1000] transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/40 bg-white/80 shadow-glass backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-[72px] lg:px-8">
          {/* Left — mobile drawer + logo */}
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="lg:hidden">
              <NavDrawer />
            </div>
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src={logo}
                alt="Fashion Ethnic"
                className="h-8 w-8 transition-transform duration-300 group-hover:rotate-[8deg] lg:h-9 lg:w-9"
              />
              <span className="font-display text-xl font-bold tracking-tight text-navy lg:text-2xl">
                Fashion<span className="text-coral">Ethnic</span>
              </span>
            </Link>
          </div>

          {/* Center — desktop links */}
          <div className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="group relative text-[15px] font-medium text-navy/80 transition-colors hover:text-navy"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded-full bg-coral transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Link
              to="/wishlist/"
              aria-label="Wishlist"
              className="grid h-10 w-10 place-items-center rounded-full text-navy/80 transition-all hover:bg-coral/10 hover:text-coral"
            >
              <Heart className="h-5 w-5" />
            </Link>

            <Link
              to="/Cart"
              aria-label="Cart"
              className="relative grid h-10 w-10 place-items-center rounded-full text-navy/80 transition-all hover:bg-coral/10 hover:text-coral"
            >
              <ShoppingBag className="h-5 w-5" />
              {cart?.totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-coral px-1 text-[11px] font-bold text-white shadow-glow">
                  {cart.totalItems}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <Link
                to="/Profile"
                className="ml-1 flex items-center gap-2 rounded-full border border-navy/10 bg-white/70 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-navy shadow-sm backdrop-blur transition-all hover:border-coral/40 hover:shadow-soft"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-white">
                  <User className="h-4 w-4" />
                </span>
                <span className="hidden max-w-[120px] truncate sm:inline">
                  {user.userName || 'User'}
                </span>
              </Link>
            ) : (
              <Link to="/Signup" className="ml-1">
                <button className="rounded-full bg-coral px-5 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-coral-500">
                  Sign up
                </button>
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
