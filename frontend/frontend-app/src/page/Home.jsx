import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Truck, ShieldCheck, RefreshCw, Star } from 'lucide-react'
import Navbar from '../component/Navbar'
import '../component-css/Home.css'
import homeimg from '../photo/K15R-_1_600x.webp'
import Footer from '../component/Footer'
import Products from '../component/Products'
import SortMenu from '../component/SortMenu'

const trustBadges = [
  { icon: Truck, label: 'Free shipping over ₹999' },
  { icon: RefreshCw, label: '7-day easy returns' },
  { icon: ShieldCheck, label: 'Secure checkout' },
]

export default function Home() {
  const [filters, setFilters] = useState({ sort: 'featured' })

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-hero-radial">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-28 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-40">
          {/* Copy */}
          <div className="animate-fade-up">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" /> New Spring Collection 2026
            </span>

            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-navy sm:text-6xl lg:text-7xl">
              Vibrant.<br />
              Cultural.<br />
              <span className="relative inline-block text-coral">
                Trendsetting.
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9C60 3 120 3 180 6C220 8 260 9 298 4"
                    stroke="#FE8551"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-7 max-w-md text-lg leading-relaxed text-navy/70">
              Elevate your style and celebrate diversity — where timeless tradition
              meets modern trends in every thread.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/products" className="btn-primary text-base">
                Shop New Arrivals <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/products" className="btn-ghost text-base">
                Explore Collection
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {['#FE8551', '#132C48', '#7191b6', '#f96528'].map((c) => (
                  <span
                    key={c}
                    className="h-9 w-9 rounded-full border-2 border-cream"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-coral">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-coral" />
                  ))}
                </div>
                <p className="text-sm font-medium text-navy/70">
                  Loved by 12,000+ happy customers
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden justify-center lg:flex">
            <div className="absolute -right-6 top-10 -z-0 h-[480px] w-[360px] rounded-[2.5rem] bg-coral/20 blur-2xl" />
            <div className="relative animate-float">
              <div className="overflow-hidden rounded-[2.5rem] shadow-card ring-1 ring-navy/5">
                <img
                  className="h-[560px] w-[420px] object-cover"
                  src={homeimg}
                  alt="Featured ethnic wear"
                />
              </div>
              {/* Floating price tag */}
              <div className="absolute -left-8 bottom-12 flex items-center gap-3 rounded-2xl bg-white/90 p-3 pr-5 shadow-soft backdrop-blur animate-fade-in">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-coral/15 text-coral">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-medium text-navy/60">Handcrafted</p>
                  <p className="text-sm font-bold text-navy">Premium Fabrics</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="border-t border-navy/5 bg-white/60 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-5 lg:justify-between lg:px-8">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-navy/75">
                <Icon className="h-5 w-5 text-coral" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6 border-b border-navy/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">Curated For You</span>
            <h2 className="mt-3 font-display text-4xl font-bold text-navy lg:text-5xl">
              Featured Pieces
            </h2>
            <p className="mt-2 text-navy/60">
              Discover our most-loved styles, hand-picked for the season.
            </p>
          </div>
          <div className="shrink-0">
            <SortMenu value={filters.sort} onChange={(s) => setFilters({ sort: s })} />
          </div>
        </div>

        <div className="mt-10">
          <Products filters={filters} pageSize={8} paginate={false} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
