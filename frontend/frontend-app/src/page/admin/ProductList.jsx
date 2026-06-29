import React from 'react'
import Tableproducts from '../../component/Tableproducts'
import { Package } from 'lucide-react'
export default function products() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-20 lg:px-8 lg:pt-14 lg:pb-28">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-3 animate-fade-up">
          <span className="eyebrow w-fit">
            <Package className="h-3.5 w-3.5" /> Catalog
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-navy md:text-5xl">
            Products List
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-navy/60">
            Add new products to your store with ease. Fill in the product details and upload images to start selling instantly.
          </p>
        </div>

        {/* Table panel */}
        <div className="rounded-2xl bg-white p-4 shadow-soft lg:p-6">
          <div className="overflow-x-auto">
            <Tableproducts />
          </div>
        </div>
      </div>
    </div>
  )
}
