import React from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import '../component-css/Products.css'

export default function Product(props) {
  const { product } = props
  const hasDiscount = Number(product.discount) > 0

  return (
    <Link
      to={`Productdetails/${product._id}`}
      className="group relative flex w-[250px] flex-col overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <img
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-coral px-2.5 py-1 text-[11px] font-bold text-white shadow-glow">
            {product.discount}% OFF
          </span>
        )}

        {/* Quick view hint */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-navy/90 to-transparent p-4 text-center text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View Details
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-semibold text-navy">{product.name}</h3>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-navy/5 px-2 py-0.5 text-xs font-semibold text-navy">
            {product.rating}
            <Star className="h-3 w-3 fill-coral text-coral" />
          </span>
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-lg font-bold text-navy">₹{product.price}</span>
          {hasDiscount && (
            <span className="text-xs font-medium text-coral">
              {product.discount}% off
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
