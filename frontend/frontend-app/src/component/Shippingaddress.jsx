import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  MapPin, Plus, Pencil, Trash2, Home, Briefcase, MapPinned,
  Check, X, User, Phone,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { UserContext } from '../Context/UserContext';
import { getUser } from '../utlis/user/getUser';

const EMPTY_FORM = {
  fullName: '', phone: '', line1: '', line2: '',
  city: '', state: '', pincode: '', type: 'Home', isDefault: false,
};

const TYPES = [
  { key: 'Home', icon: Home },
  { key: 'Work', icon: Briefcase },
  { key: 'Other', icon: MapPinned },
];

const formatAddress = (a) =>
  `${a.line1}${a.line2 ? ', ' + a.line2 : ''}, ${a.city}, ${a.state} - ${a.pincode}`;

export default function Shippingaddress() {
  const { user, setUser } = useContext(UserContext);
  const storageKey = `fe_addresses_${user?._id || 'guest'}`;

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  // Load saved addresses for this user.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
      setAddresses(Array.isArray(saved) ? saved : []);
    } catch {
      setAddresses([]);
    }
  }, [storageKey]);

  const persist = (list) => {
    setAddresses(list);
    localStorage.setItem(storageKey, JSON.stringify(list));
  };

  // Push the default address to the backend so checkout (Cart/Bill) reflects it.
  const syncDefaultToServer = async (addr) => {
    if (!user?._id || !addr) return;
    try {
      await axios.patch(`https://fashionethnic.onrender.com/api/users/update/${user._id}`, {
        address: formatAddress(addr),
      });
      const result = await getUser(user._id);
      if (result) setUser(result);
    } catch (error) {
      console.error('Failed to sync default address:', error);
    }
  };

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const openAdd = () => {
    setForm({ ...EMPTY_FORM, isDefault: addresses.length === 0 });
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (addr) => {
    setForm({ ...addr });
    setEditingId(addr.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const validate = () => {
    if (!form.fullName.trim()) return 'Full name is required';
    if (!/^[0-9]{10}$/.test(form.phone)) return 'Enter a valid 10-digit phone number';
    if (!form.line1.trim()) return 'Address (house no., street) is required';
    if (!form.city.trim()) return 'City is required';
    if (!form.state.trim()) return 'State is required';
    if (!/^[0-9]{6}$/.test(form.pincode)) return 'Enter a valid 6-digit pincode';
    return null;
  };

  const handleSave = async () => {
    const err = validate();
    if (err) {
      toast.error(err, { position: 'top-center' });
      return;
    }

    let list;
    let saved;
    if (editingId) {
      saved = { ...form, id: editingId };
      list = addresses.map((a) => (a.id === editingId ? saved : a));
    } else {
      saved = { ...form, id: Date.now() };
      list = [...addresses, saved];
    }

    // Enforce a single default.
    if (saved.isDefault) {
      list = list.map((a) => ({ ...a, isDefault: a.id === saved.id }));
    } else if (!list.some((a) => a.isDefault)) {
      list = list.map((a, i) => ({ ...a, isDefault: i === 0 }));
    }

    persist(list);
    closeForm();
    toast.success(editingId ? 'Address updated' : 'Address added', { position: 'top-center' });

    const def = list.find((a) => a.isDefault);
    if (def) syncDefaultToServer(def);
  };

  const handleDelete = (id) => {
    const wasDefault = addresses.find((a) => a.id === id)?.isDefault;
    let list = addresses.filter((a) => a.id !== id);
    if (wasDefault && list.length) {
      list = list.map((a, i) => ({ ...a, isDefault: i === 0 }));
    }
    persist(list);
    toast.success('Address removed', { position: 'top-center' });

    const def = list.find((a) => a.isDefault);
    if (def) syncDefaultToServer(def);
  };

  const handleSetDefault = (id) => {
    const list = addresses.map((a) => ({ ...a, isDefault: a.id === id }));
    persist(list);
    const def = list.find((a) => a.isDefault);
    if (def) syncDefaultToServer(def);
    toast.success('Default address updated', { position: 'top-center' });
  };

  const inputClass =
    'w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-all placeholder:text-navy/40 focus:border-coral focus:ring-2 focus:ring-coral/20';

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 pb-20 pt-24 sm:px-6 lg:pt-28">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">
              <MapPin className="h-3.5 w-3.5" /> Shipping
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl">
              My Addresses
            </h1>
            <p className="mt-2 text-navy/60">
              Save delivery addresses for a faster checkout.
            </p>
          </div>
          {!showForm && (
            <button className="btn-primary shrink-0" onClick={openAdd}>
              <Plus className="h-5 w-5" /> Add New Address
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <section className="animate-fade-up mt-8 rounded-3xl border border-navy/5 bg-white p-6 shadow-card sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-navy">
                {editingId ? 'Edit Address' : 'Add a New Address'}
              </h2>
              <button onClick={closeForm} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full text-navy/50 transition-colors hover:bg-navy/5 hover:text-navy">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">Full Name</label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
                  <input className={inputClass + ' pl-10'} value={form.fullName} onChange={(e) => update({ fullName: e.target.value })} placeholder="John Doe" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">Phone Number</label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
                  <input className={inputClass + ' pl-10'} value={form.phone} onChange={(e) => update({ phone: e.target.value })} placeholder="10-digit number" maxLength={10} />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-navy">Address (House No., Street)</label>
                <input className={inputClass} value={form.line1} onChange={(e) => update({ line1: e.target.value })} placeholder="House no., building, street" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-navy">Area, Landmark <span className="text-navy/40">(optional)</span></label>
                <input className={inputClass} value={form.line2} onChange={(e) => update({ line2: e.target.value })} placeholder="Locality, landmark" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">City</label>
                <input className={inputClass} value={form.city} onChange={(e) => update({ city: e.target.value })} placeholder="City" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">State</label>
                <input className={inputClass} value={form.state} onChange={(e) => update({ state: e.target.value })} placeholder="State" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">Pincode</label>
                <input className={inputClass} value={form.pincode} onChange={(e) => update({ pincode: e.target.value })} placeholder="6-digit pincode" maxLength={6} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">Address Type</label>
                <div className="flex gap-2">
                  {TYPES.map(({ key, icon: Icon }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => update({ type: key })}
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                        form.type === key
                          ? 'border-coral bg-coral/5 text-coral'
                          : 'border-navy/15 bg-white text-navy/70 hover:border-coral/40'
                      }`}
                    >
                      <Icon className="h-4 w-4" /> {key}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-2.5 text-sm text-navy">
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) => update({ isDefault: e.target.checked })}
                className="h-4 w-4 accent-coral"
              />
              Make this my default address
            </label>

            <div className="mt-7 flex gap-3">
              <button className="btn-primary" onClick={handleSave}>
                <Check className="h-5 w-5" /> {editingId ? 'Save Changes' : 'Save Address'}
              </button>
              <button className="btn-ghost" onClick={closeForm}>Cancel</button>
            </div>
          </section>
        )}

        {/* List */}
        {!showForm && addresses.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-3xl border border-navy/5 bg-white px-6 py-16 text-center shadow-soft">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-coral/10 text-coral">
              <MapPin className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-navy">No addresses saved yet</h3>
            <p className="mt-2 max-w-sm text-sm text-navy/60">
              Add a delivery address to check out faster next time.
            </p>
            <button className="btn-primary mt-7" onClick={openAdd}>
              <Plus className="h-5 w-5" /> Add Address
            </button>
          </div>
        ) : (
          addresses.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {addresses.map((a) => {
                const TypeIcon = (TYPES.find((t) => t.key === a.type) || TYPES[0]).icon;
                return (
                  <div
                    key={a.id}
                    className={`relative flex flex-col rounded-2xl border bg-white p-5 shadow-soft transition-all hover:shadow-card ${
                      a.isDefault ? 'border-coral/40 ring-1 ring-coral/20' : 'border-navy/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-2.5 py-1 text-xs font-semibold text-navy">
                        <TypeIcon className="h-3.5 w-3.5" /> {a.type}
                      </span>
                      {a.isDefault && (
                        <span className="rounded-full bg-coral/10 px-2.5 py-1 text-xs font-bold text-coral">
                          Default
                        </span>
                      )}
                    </div>

                    <p className="mt-3 font-semibold text-navy">{a.fullName}</p>
                    <p className="mt-1 text-sm leading-relaxed text-navy/70">
                      {a.line1}{a.line2 ? `, ${a.line2}` : ''}, {a.city}, {a.state} - {a.pincode}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-navy/60">
                      <Phone className="h-3.5 w-3.5" /> {a.phone}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-navy/5 pt-4">
                      {!a.isDefault && (
                        <button
                          onClick={() => handleSetDefault(a.id)}
                          className="rounded-full border border-navy/15 px-3 py-1.5 text-xs font-semibold text-navy transition-all hover:border-coral hover:text-coral"
                        >
                          Set as default
                        </button>
                      )}
                      <button
                        onClick={() => openEdit(a)}
                        className="inline-flex items-center gap-1 rounded-full border border-navy/15 px-3 py-1.5 text-xs font-semibold text-navy transition-all hover:border-coral hover:text-coral"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="inline-flex items-center gap-1 rounded-full border border-navy/15 px-3 py-1.5 text-xs font-semibold text-navy transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}
