import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ImageUploadDemo } from '../../component/UploadFIle';
import { SliderComponent } from '../../component/RatingSlider';
import { Package, Plus, Layers, Palette, Sparkles, Star } from 'lucide-react';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [about, setAbout] = useState('');
  const [material, setMaterial] = useState('');
  const [care, setCare] = useState('');
  const [colour, setColour] = useState('');
  const [gender, setGender] = useState('');
  const [fit, setFit] = useState('');
  const [size, setSize] = useState('');
  const [rating, setRating] = useState(0);
  const [discount, setDiscount] = useState('');
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!name || !price || !about || !material || !care || !colour || !gender || !fit || !size) {
      toast.error('Please fill in all product details');
      return;
    }
    if (!file) {
      toast.error('Please upload a product image');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('about', about);
    formData.append('material', material);
    formData.append('care', care);
    formData.append('colour', colour);
    formData.append('gender', gender);
    formData.append('fit', fit);
    formData.append('size', size);
    formData.append('rating', String(rating ?? 0));
    formData.append('discount', String(discount || 0));
    formData.append('image', file);

    setSaving(true);
    try {
      await axios.post('https://fashionethnic.onrender.com/api/admin/add_product', formData);
      toast.success('Product added successfully');
      setName(''); setPrice(''); setAbout(''); setMaterial(''); setCare('');
      setColour(''); setGender(''); setFit(''); setSize(''); setRating(0);
      setDiscount(''); setFile(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const labelClass = 'text-sm font-semibold text-navy';
  const inputClass = 'w-full h-11 rounded-xl border border-navy/10 bg-white px-4 text-sm text-navy outline-none transition-all placeholder:text-navy/30 focus:border-coral focus:ring-4 focus:ring-coral/20';
  const selectClass = 'w-full h-11 rounded-xl border border-navy/10 bg-white px-3 text-sm text-navy outline-none transition-all focus:border-coral focus:ring-4 focus:ring-coral/20';

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-20 lg:px-8 lg:pt-14 lg:pb-28">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-4 animate-fade-up sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <span className="eyebrow w-fit">
              <Package className="h-3.5 w-3.5" /> Catalog
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-navy md:text-5xl">
              Add Product
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-navy/60">
              Add new products to your store with ease. Fill in the product details and upload images to start selling instantly.
            </p>
          </div>
          <button type="submit" form="add-product-form" disabled={saving} className={`btn-primary w-fit ${saving ? 'cursor-not-allowed opacity-60' : ''}`}>
            <Plus className="h-4 w-4" /> {saving ? 'Saving...' : 'Save Product'}
          </button>
        </div>

        <form id="add-product-form" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left column — text fields */}
            <div className="space-y-6 lg:col-span-2">
              {/* Basic Info */}
              <section className="rounded-2xl bg-white p-6 shadow-soft lg:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-white">
                    <Layers className="h-4 w-4" />
                  </span>
                  <h2 className="font-display text-xl font-semibold text-navy">Basic Info</h2>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Product Name</label>
                    <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder="Enter product name" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>About Product</label>
                    <input className={inputClass} value={about} onChange={(e) => setAbout(e.target.value)} type='text' placeholder="Short description" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Product Price</label>
                    <input className={inputClass} value={price} onChange={(e) => setPrice(e.target.value)} type='number' placeholder="0.00" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Discount on Product</label>
                    <input className={inputClass} value={discount} onChange={(e) => setDiscount(e.target.value)} type='number' placeholder="0%" />
                  </div>
                </div>
              </section>

              {/* Material & Care */}
              <section className="rounded-2xl bg-white p-6 shadow-soft lg:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-white">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <h2 className="font-display text-xl font-semibold text-navy">Material &amp; Care</h2>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Product Material</label>
                    <input className={inputClass} value={material} onChange={(e) => setMaterial(e.target.value)} type='text' placeholder="e.g. Cotton" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Product Care <span className="font-normal text-navy/40">(type of care material needs)</span></label>
                    <input className={inputClass} value={care} onChange={(e) => setCare(e.target.value)} type='text' placeholder="e.g. Machine wash cold" />
                  </div>
                </div>
              </section>

              {/* Appearance & Style */}
              <section className="rounded-2xl bg-white p-6 shadow-soft lg:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-white">
                    <Palette className="h-4 w-4" />
                  </span>
                  <h2 className="font-display text-xl font-semibold text-navy">Appearance &amp; Style</h2>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Product Colour</label>
                    <input className={inputClass} value={colour} onChange={(e) => setColour(e.target.value)} type='text' placeholder="e.g. Maroon" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Product Fit</label>
                    <select id="fit" value={fit} onChange={(e) => setFit(e.target.value)} className={selectClass}>
                      <option value="">Choose a fit type</option>
                      <option value="Slim">Slim fit</option>
                      <option value="Regular">Regular fit</option>
                      <option value="Loose">Loose fit</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Gender</label>
                    <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className={selectClass}>
                      <option value="">Choose a gender</option>
                      <option value="Women">Women</option>
                      <option value="Men">Men</option>
                      <option value="Kids">Kids</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Product Size</label>
                    <select id="size" value={size} onChange={(e) => setSize(e.target.value)} className={selectClass}>
                      <option value="">Choose a size</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                      <option value="Free Size">Free Size</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-coral/10 text-coral">
                    <Star className="h-4 w-4" />
                  </span>
                  <h2 className="font-display text-xl font-semibold text-navy">Rating</h2>
                </div>
                <div className="mt-4">
                  <SliderComponent rating={rating} setRating={setRating} />
                </div>
              </section>
            </div>

            {/* Right column — image upload */}
            <div className="lg:col-span-1">
              <section className="rounded-2xl bg-white p-6 shadow-soft lg:sticky lg:top-8 lg:p-8">
                <h2 className="mb-5 font-display text-xl font-semibold text-navy">Product Image</h2>
                <ImageUploadDemo onFileSelect={setFile} />
              </section>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
