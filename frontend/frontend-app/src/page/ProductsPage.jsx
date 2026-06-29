import React, { useState } from 'react'
import { SlidersHorizontal, Sparkles } from 'lucide-react'
import Navbar from '../component/Navbar';
import Dropdown from '../component/Dropdown';
import Products from '../component/Products';
import Footer from '../component/Footer';

export default function ProductsPage() {
  const [filter, setFilter] = useState('');

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <section className="bg-hero-radial">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-28 lg:px-8 lg:pt-36">
          <div className="animate-fade-up text-center">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" /> The Full Collection
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold text-navy sm:text-5xl lg:text-6xl">
              Shop All Styles
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-navy/60">
              Browse our complete range of handcrafted ethnic wear — filter and sort
              to find the piece that's just right for you.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8 lg:pb-28">
        <div className="flex flex-col gap-4 border-b border-navy/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="filter flex items-center gap-2 text-lg font-semibold text-navy">
            <SlidersHorizontal className="h-5 w-5 text-coral" /> Filters
          </p>
          <div className="shrink-0">
            <Dropdown setFilter={setFilter} />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-stretch justify-center gap-6 lg:gap-8">
          <Products filter={filter} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
