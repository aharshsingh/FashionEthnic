import React, { useState, useEffect, useContext } from 'react'
import {
  MapPin, Plus, Tag, ShieldCheck, MessageCircle, Check, X,
  Home, Briefcase, MapPinned, ShoppingBag, User, Phone,
} from 'lucide-react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import '../component-css/Bill.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../Context/UserContext';
import { useCart } from '../Context/CartContext';

const EMPTY_FORM = {
  fullName: '', phone: '', line1: '', line2: '',
  city: '', state: '', pincode: '', type: 'Home', isDefault: false,
};

const TYPES = [
  { key: 'Home', icon: Home },
  { key: 'Work', icon: Briefcase },
  { key: 'Other', icon: MapPinned },
];

const formatAddress = (a) => {
  if (!a) return '';
  if (a.legacy) return a.line1;
  return `${a.line1}${a.line2 ? ', ' + a.line2 : ''}, ${a.city}, ${a.state} - ${a.pincode}`;
};

export default function Bill() {
  const { user, setUser } = useContext(UserContext);
  const { setCart } = useCart();
  const navigate = useNavigate();

  const [order] = useState({
    items: JSON.parse(localStorage.getItem('items')) || [],
    mrpAmount: localStorage.getItem('mrpAmount') || 0,
    discountAmount: localStorage.getItem('discountAmount') || 0,
    totalAmount: localStorage.getItem('totalAmount') || 0,
  });

  const storageKey = `fe_addresses_${user?._id || 'guest'}`;
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [placing, setPlacing] = useState(false);

  // Load the saved address book; fall back to the legacy single user.address.
  useEffect(() => {
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!Array.isArray(list)) list = [];
    } catch {
      list = [];
    }
    if (list.length === 0 && user?.address) {
      list = [{
        id: 'legacy',
        legacy: true,
        fullName: user.userName || 'You',
        phone: user.phoneNumber || '',
        line1: user.address,
        type: 'Home',
        isDefault: true,
      }];
    }
    setAddresses(list);
    const def = list.find((a) => a.isDefault) || list[0];
    setSelectedId(def ? def.id : null);
  }, [storageKey, user?.address, user?.userName, user?.phoneNumber]);

  const persist = (list) => {
    setAddresses(list);
    // Don't persist the synthesized legacy entry.
    const real = list.filter((a) => !a.legacy);
    localStorage.setItem(storageKey, JSON.stringify(real));
  };

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const validate = () => {
    if (!form.fullName.trim()) return 'Full name is required';
    if (!/^[0-9]{10}$/.test(form.phone)) return 'Enter a valid 10-digit phone number';
    if (!form.line1.trim()) return 'Address (house no., street) is required';
    if (!form.city.trim()) return 'City is required';
    if (!form.state.trim()) return 'State is required';
    if (!/^[0-9]{6}$/.test(form.pincode)) return 'Enter a valid 6-digit pincode';
    return null;
  };

  const handleSaveAddress = async () => {
    const err = validate();
    if (err) {
      toast.error(err, { position: 'top-center' });
      return;
    }
    const newAddr = { ...form, id: Date.now() };
    let list = addresses.filter((a) => !a.legacy).concat(newAddr);
    if (newAddr.isDefault || list.length === 1) {
      list = list.map((a) => ({ ...a, isDefault: a.id === newAddr.id }));
    }
    persist(list);
    setSelectedId(newAddr.id);
    setShowForm(false);
    setForm(EMPTY_FORM);
    toast.success('Address added', { position: 'top-center' });
  };

  const selectedAddress = addresses.find((a) => a.id === selectedId);

  const handleOrder = async () => {
    if (!user?._id) {
      toast.error('Please log in to place an order', { position: 'top-center' });
      return;
    }
    if (!selectedAddress) {
      toast.error('Please select or add a delivery address', { position: 'top-center' });
      return;
    }
    if (!order.items || order.items.length === 0) {
      toast.error('Your cart is empty', { position: 'top-center' });
      return;
    }

    const addressStr = formatAddress(selectedAddress);
    const payload = {
      userName: user.userName,
      address: addressStr,
      items: order.items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        size: i.size,
      })),
      mrpAmount: Number(order.mrpAmount) || 0,
      discountAmount: Number(order.discountAmount) || 0,
      totalAmount: Number(order.totalAmount) || 0,
    };

    setPlacing(true);
    try {
      const res = await axios.post(
        `https://fashionethnic.onrender.com/api/orders/add_order/${user._id}`,
        payload
      );
      if (res.status === 201 || res.status === 200) {
        // Keep user.address in sync with the chosen address.
        try {
          await axios.patch(`https://fashionethnic.onrender.com/api/users/update/${user._id}`, { address: addressStr });
          setUser((prev) => ({ ...prev, address: addressStr }));
        } catch (e) { /* non-fatal */ }

        setCart({ productArray: [], totalItems: 0 });
        ['items', 'mrpAmount', 'discountAmount', 'totalAmount'].forEach((k) => localStorage.removeItem(k));
        toast.success('Order placed successfully!', { position: 'top-center' });
        navigate('/Orders');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to place order. Please try again.', { position: 'top-center' });
    } finally {
      setPlacing(false);
    }
  }

  const totalQty = (order.items || []).reduce((s, i) => s + (i.quantity || 0), 0);
  const inputClass =
    'w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-all placeholder:text-navy/40 focus:border-coral focus:ring-2 focus:ring-coral/20';

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
          {/* ===== Left column ===== */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 font-display text-lg font-bold text-navy">
                  <MapPin className="h-5 w-5 text-coral" /> Delivery Address
                </p>
                {!showForm && (
                  <button
                    className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 px-4 py-1.5 text-sm font-semibold text-navy transition-all hover:border-coral hover:text-coral"
                    onClick={() => { setForm({ ...EMPTY_FORM, isDefault: addresses.filter((a) => !a.legacy).length === 0 }); setShowForm(true); }}
                  >
                    <Plus className="h-4 w-4" /> Add New
                  </button>
                )}
              </div>

              {/* Saved addresses */}
              {!showForm && (
                addresses.length > 0 ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {addresses.map((a) => {
                      const TypeIcon = (TYPES.find((t) => t.key === a.type) || TYPES[0]).icon;
                      const active = selectedId === a.id;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => setSelectedId(a.id)}
                          className={`flex flex-col rounded-2xl border p-4 text-left transition-all ${
                            active ? 'border-coral bg-coral/5 ring-1 ring-coral/20' : 'border-navy/10 bg-white hover:border-coral/40'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy">
                              <TypeIcon className="h-3.5 w-3.5" /> {a.type}
                            </span>
                            <span className={`grid h-5 w-5 place-items-center rounded-full border ${active ? 'border-coral bg-coral text-white' : 'border-navy/20'}`}>
                              {active && <Check className="h-3 w-3" />}
                            </span>
                          </div>
                          <p className="mt-2 font-semibold text-navy">{a.fullName}</p>
                          <p className="mt-1 text-sm leading-relaxed text-navy/70">{formatAddress(a)}</p>
                          {a.phone && <p className="mt-1 text-sm text-navy/50">Phone: {a.phone}</p>}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-5 rounded-xl bg-cream px-4 py-6 text-center text-sm text-navy/60">
                    No saved addresses. Add one to continue.
                  </p>
                )
              )}

              {/* Add address form */}
              {showForm && (
                <div className="animate-fade-up mt-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-navy">Add a New Address</p>
                    <button onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full text-navy/50 hover:bg-navy/5 hover:text-navy">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
                      <input className={inputClass + ' pl-10'} value={form.fullName} onChange={(e) => update({ fullName: e.target.value })} placeholder="Full name" />
                    </div>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
                      <input className={inputClass + ' pl-10'} value={form.phone} onChange={(e) => update({ phone: e.target.value })} placeholder="10-digit phone" maxLength={10} />
                    </div>
                    <input className={inputClass + ' sm:col-span-2'} value={form.line1} onChange={(e) => update({ line1: e.target.value })} placeholder="House no., building, street" />
                    <input className={inputClass + ' sm:col-span-2'} value={form.line2} onChange={(e) => update({ line2: e.target.value })} placeholder="Area, landmark (optional)" />
                    <input className={inputClass} value={form.city} onChange={(e) => update({ city: e.target.value })} placeholder="City" />
                    <input className={inputClass} value={form.state} onChange={(e) => update({ state: e.target.value })} placeholder="State" />
                    <input className={inputClass} value={form.pincode} onChange={(e) => update({ pincode: e.target.value })} placeholder="6-digit pincode" maxLength={6} />
                    <div className="flex gap-2">
                      {TYPES.map(({ key, icon: Icon }) => (
                        <button key={key} type="button" onClick={() => update({ type: key })}
                          className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${form.type === key ? 'border-coral bg-coral/5 text-coral' : 'border-navy/15 text-navy/70 hover:border-coral/40'}`}>
                          <Icon className="h-4 w-4" /> {key}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 flex gap-3">
                    <button className="btn-primary" onClick={handleSaveAddress}>
                      <Check className="h-5 w-5" /> Save Address
                    </button>
                    <button className="btn-ghost" onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}>Cancel</button>
                  </div>
                </div>
              )}
            </div>

            {/* Items being billed */}
            <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
              <p className="flex items-center gap-2 font-display text-lg font-bold text-navy">
                <ShoppingBag className="h-5 w-5 text-coral" /> Order Items
                <span className="ml-1 rounded-full bg-navy/5 px-2.5 py-0.5 text-sm font-semibold text-navy">
                  {totalQty}
                </span>
              </p>

              {order.items.length === 0 ? (
                <p className="mt-5 rounded-xl bg-cream px-4 py-6 text-center text-sm text-navy/60">
                  No items to bill. <Link to="/products" className="font-semibold text-coral">Continue shopping</Link>.
                </p>
              ) : (
                <div className="mt-5 space-y-3">
                  {order.items.map((item, i) => {
                    const lineTotal = Math.round(
                      (item.price || 0) * (item.quantity || 0) * (1 - (item.discount || 0) / 100)
                    );
                    return (
                      <div key={item.productId || i} className="flex items-center gap-4 rounded-xl border border-navy/5 bg-cream/50 p-3">
                        <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-sand">
                          {item.image && <img className="h-full w-full object-cover" src={item.image} alt={item.name} />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-navy">{item.name}</p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                            <span className="rounded-full bg-navy/5 px-2 py-0.5 font-semibold text-navy">Size: {item.size || '-'}</span>
                            <span className="rounded-full bg-navy/5 px-2 py-0.5 font-semibold text-navy">Qty: {item.quantity}</span>
                            {item.discount > 0 && (
                              <span className="rounded-full bg-coral/10 px-2 py-0.5 font-bold text-coral">{item.discount}% OFF</span>
                            )}
                          </div>
                        </div>
                        <p className="shrink-0 font-display text-base font-bold text-navy">Rs.{lineTotal}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ===== Price Details ===== */}
          <div className="lg:sticky lg:top-28 rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
            <p className="flex items-center gap-2 font-display text-lg font-bold text-navy">
              <Tag className="h-5 w-5 text-coral" /> Price Details
            </p>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-navy/70">
                <p>Total MRP</p>
                <p className="font-medium text-navy">Rs.{Math.round(Number(order.mrpAmount) || 0)}</p>
              </div>
              <div className="flex justify-between text-navy/70">
                <p>Discount</p>
                <p className="font-medium text-coral">- Rs.{Math.round(Number(order.discountAmount) || 0)}</p>
              </div>
              <div className="flex justify-between text-navy/70">
                <p>Shipping Charges</p>
                <p className="font-medium text-navy">+ Rs.50</p>
              </div>
            </div>
            <div className="my-4 h-px w-full bg-navy/10" />
            <div className="flex justify-between font-display text-lg font-bold text-navy">
              <p>Total Amount</p>
              <p>Rs.{Math.round(Number(order.totalAmount) || 0)}</p>
            </div>
            <button
              className={`btn-primary mt-6 w-full text-base ${placing ? 'cursor-not-allowed opacity-60' : ''}`}
              onClick={handleOrder}
              disabled={placing}
            >
              {placing ? 'Placing order...' : 'Pay Now'}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-navy/50">
              <ShieldCheck className="h-3.5 w-3.5 text-coral" /> 100% secure payment
            </p>
          </div>
        </div>

        {/* Help link */}
        <div className="mt-10 flex justify-center">
          <Link className="btn-ghost text-sm" to="/contactus">
            <MessageCircle className="h-4 w-4 text-coral" />
            <span>Need Help? Talk to us</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
