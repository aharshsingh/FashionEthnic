import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heart, ShoppingBag, User, ChevronDown, LayoutDashboard, Package,
  MapPin, Mail, FileText, ShieldCheck, LogOut,
} from 'lucide-react';
import toast from 'react-hot-toast';
import logo from '../photo/FashionEthnic_mark.svg';
import '../component-css/Navbar.css';
import NavDrawer from './NavDrawer';
import { CartContext } from '../Context/CartContext.jsx';
import { UserContext } from '../Context/UserContext.jsx';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, isLoggedIn, logout } = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const menuItems = [
    { label: 'My Account', to: '/Profile', icon: LayoutDashboard },
    { label: 'Orders', to: '/Orders', icon: Package },
    { label: 'Wishlist', to: '/wishlist', icon: Heart },
    { label: 'Shipping Address', to: '/Profile/Shippingaddress', icon: MapPin },
    { label: 'Cart', to: '/Cart', icon: ShoppingBag },
    { label: 'Contact Us', to: '/ContactUs', icon: Mail },
    { label: 'Terms of Use', to: '/TermsofUse', icon: FileText },
    { label: 'Privacy Policy', to: '/PrivacyPolicy', icon: ShieldCheck },
  ];

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    toast.success('Logged out successfully');
    navigate('/Signin');
  };

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
              <div className="relative ml-1">
                <button
                  type="button"
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  className="flex items-center gap-2 rounded-full border border-navy/10 bg-white/70 py-1.5 pl-1.5 pr-3 text-sm font-semibold text-navy shadow-sm backdrop-blur transition-all hover:border-coral/40 hover:shadow-soft"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-white">
                    <User className="h-4 w-4" />
                  </span>
                  <span className="hidden max-w-[120px] truncate sm:inline">
                    {user.userName || 'User'}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-navy/50 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                </button>

                {menuOpen && (
                  <>
                    {/* click-away backdrop */}
                    <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                    <div className="absolute right-0 z-20 mt-2 w-60 overflow-hidden rounded-2xl border border-navy/10 bg-white p-1.5 shadow-card">
                      <div className="border-b border-navy/5 px-3 py-2.5">
                        <p className="text-xs text-navy/50">Signed in as</p>
                        <p className="truncate text-sm font-bold text-navy">{user.userName || 'User'}</p>
                      </div>
                      <div className="py-1">
                        {menuItems.map(({ label, to, icon: Icon }) => (
                          <Link
                            key={label}
                            to={to}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy/5 hover:text-coral"
                          >
                            <Icon className="h-4 w-4 text-navy/50" />
                            {label}
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-navy/5 pt-1">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Log Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
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
