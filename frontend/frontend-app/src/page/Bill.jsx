import React, { useState, useContext } from 'react'
import { MapPin, Plus, Tag, ShieldCheck, MessageCircle } from 'lucide-react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import '../component-css/Bill.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import { TextField } from '@mui/material'

export default function Bill() {
  const [order, setOrder] = useState({
    items: JSON.parse(localStorage.getItem('items')) || [],
    mrpAmount: localStorage.getItem('mrpAmount') || 0,
    discountAmount: localStorage.getItem('discountAmount') || 0,
    totalAmount: localStorage.getItem('totalAmount') || 0,
  });
  const [newAddress, setNewAddress] = useState('');
  const [show, setShow] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState('');

  const handleOrder = async () => {
    setOrder((prev) => ({
      ...prev,
      userName: user.userName,
      address: user.address
    }));
    try {
      await axios.post(`hhttps://fashionethnic.onrender.com/api/orders/add_order/${user._id}`,
        order);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddAddress = async () => {
    if (newAddress !== '') {
      try {
        await axios.patch(`https://fashionethnic.onrender.com/api/users/update/${user._id}`, {
          address: newAddress
        });
        setUser((prev) => ({
          ...prev,
          address: newAddress,
        }))
        setShow(false);
        setNewAddress('');
        setError('');
      } catch (error) {
        console.log(error);
        setError('Failed to update address. Please try again.');
      }
    } else {
      setError('Enter a address');
      setNewAddress('');
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <section className="mx-auto max-w-6xl px-4 pb-24 pt-24 lg:px-8 lg:pt-32">
        <div className="mb-8">
          <span className="eyebrow">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure Checkout
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-navy lg:text-4xl">
            Review &amp; Pay
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:items-start">
          {/* ===== Delivery Address ===== */}
          <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
            <p className="snippet-text2 flex items-center gap-2 font-display text-lg font-bold text-navy">
              <MapPin className="h-5 w-5 text-coral" /> Select Delivery Address
            </p>

            {user.address ? (
              <>
                <div className="address-card mt-6 rounded-2xl border border-navy/10 bg-cream p-5">
                  <p id="name" className="font-semibold text-navy">Aharsh Singh</p>
                  <p id="address" className="mt-1 text-sm text-navy/70">{user.address}</p>
                  <p className="phone mt-1 text-sm text-navy/60">
                    Phone no. {user.phoneNumber ? user.phoneNumber : <span>N/A</span>}
                  </p>
                </div>
                <div className="button-div mt-4">
                  <button className="address-button btn-ghost text-sm" onClick={() => setShow(true)}>
                    <Plus className="h-4 w-4" /> Add New Address
                  </button>
                </div>
              </>
            ) : (
              <div className="button-div mt-6">
                <button className="address-button btn-ghost text-sm" onClick={() => setShow(true)}>
                  <Plus className="h-4 w-4" /> Add New Address
                </button>
              </div>
            )}

            {show && (
              <div className="mt-6">
                <p className="font-semibold text-navy">Add Address</p>
                <div className="mt-3">
                  <TextField
                    className="w-full"
                    label="Enter Address"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                  />
                  <div>{error && <span style={{ color: 'red', marginTop: '5px' }}>*{error}</span>}</div>
                </div>
                <div className="mt-4">
                  <button className="btn-primary text-sm" variant="contained" color="primary" onClick={handleAddAddress}>
                    Save Address
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ===== Price Details ===== */}
          <div className="cart-inner-container2 lg:sticky lg:top-28 rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
            <p className="snippet-text2 flex items-center gap-2 font-display text-lg font-bold text-navy">
              <Tag className="h-5 w-5 text-coral" /> Price Details
            </p>
            <div className="mt-5 space-y-3 text-sm">
              <div className="snippet-text-container1 flex justify-between text-navy/70">
                <p className="snippet-text1">Total MRP</p>
                <p className="snippet-text1 font-medium text-navy">{order.mrpAmount}</p>
              </div>
              <div className="snippet-text-container2 flex justify-between text-navy/70">
                <p className="snippet-text1">Discount</p>
                <p className="snippet-text1 font-medium text-coral">- {order.discountAmount}</p>
              </div>
              <div className="snippet-text-container3 flex justify-between text-navy/70">
                <p className="snippet-text1">Shipping Charges</p>
                <p className="snippet-text1 font-medium text-navy">+50</p>
              </div>
            </div>
            <div className="my-4 h-px w-full bg-navy/10" />
            <div className="snippet-text-container4 flex justify-between font-display text-lg font-bold text-navy">
              <p className="snippet-text1">Total Amount</p>
              <p className="snippet-text1">Rs.{order.totalAmount}</p>
            </div>
            <button className="order-button btn-primary mt-6 w-full text-base" onClick={handleOrder}>
              Pay Now
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-navy/50">
              <ShieldCheck className="h-3.5 w-3.5 text-coral" /> 100% secure payment
            </p>
          </div>
        </div>

        {/* Help link */}
        <div className="chat-div mt-10 flex justify-center">
          <Link className="talktous-link btn-ghost text-sm" to="/contactus">
            <MessageCircle className="h-4 w-4 text-coral" />
            <span className="chat-text">Need Help? Talk to us</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
