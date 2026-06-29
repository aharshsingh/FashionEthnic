import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import {
  ShoppingBag,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  Ruler,
} from 'lucide-react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import '../component-css/Productdetails.css'
import { useCart } from '../Context/CartContext'
import { UserContext } from '../Context/UserContext'
import { addCart } from '../utlis/cart/AddCart'
import LoadingAnimation from '../component/LoadingAnimation';
import toast from 'react-hot-toast'
import ProductCarouselPhone from '../component/ProductCarouselPhone'

const sizes = ['S', 'M', 'L', 'XL', 'XXL']

const trustBadges = [
  { icon: Truck, label: 'Free shipping over ₹999' },
  { icon: RefreshCw, label: '7-day easy returns' },
  { icon: ShieldCheck, label: 'Secure checkout' },
]

export default function Productdetails() {

  const { user } = useContext(UserContext);
  const [product, setProduct] = useState({});
  const [size, setSize] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { setCart } = useCart();
  const params = useParams();

  const handleWishList = async () => {
    try {
      const response = await axios.post('https://fashionethnic.onrender.com/api/wishlist/add_product', {
        userId: user._id,
        productId: params.id
      })
      if (response.status === 200) {
        toast.success('Added to wishlist', {
          position: "top-center",
        });
      }
      if (response.status === 201) {
        toast.success('Already in wishlist', {
          position: "top-center",
        });
        return;
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      alert('Failed to add product to wishlist');
    }
  }

  useEffect(() => {
    const fetchProductDetails = async () => {
      await axios.get(`https://fashionethnic.onrender.com/api/products/detail/${params.id}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false)
        })
        .catch((error) => {
          console.error(`Error fetching product details:`, error);
        });
    }
    fetchProductDetails();
  }, [params.id])

  const hasDiscount = Number(product.discount) > 0

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      {
        loading ? (
          <LoadingAnimation />
        ) : (
          <>
            <section className="mx-auto max-w-7xl px-4 pb-16 pt-24 lg:px-8 lg:pb-24 lg:pt-32">
              {/* Mobile carousel */}
              <div className="mb-8 flex justify-center lg:hidden">
                <ProductCarouselPhone productId={product._id} />
              </div>

              <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
                {/* ===== Gallery (desktop) ===== */}
                <div className="hidden lg:block">
                  <Link to={`/productCarousel/${product._id}`} className="block">
                    <div className="overflow-hidden rounded-2xl bg-sand shadow-card ring-1 ring-navy/5">
                      <img
                        className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                  </Link>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {[0, 1, 2].map((i) => (
                      <Link key={i} to={`/productCarousel/${product._id}`} className="block">
                        <div className="overflow-hidden rounded-xl bg-sand shadow-soft ring-1 ring-navy/5 transition-all hover:ring-coral/40">
                          <img
                            className="aspect-square w-full object-cover"
                            src={product.image}
                            alt={product.name}
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* ===== Details ===== */}
                <div className="animate-fade-up">
                  <span className="eyebrow">Fashion Ethnic</span>
                  <h1 className="name mt-4 font-display text-3xl font-bold leading-tight text-navy lg:text-4xl">
                    {product.name}
                  </h1>
                  <p className="short-detail mt-3 text-navy/60">{product.about}</p>

                  {/* Rating pill */}
                  <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3 py-1.5 text-sm font-semibold text-navy">
                    <Star className="h-4 w-4 fill-coral text-coral" />
                    {product.rating}
                    <span className="font-normal text-navy/50">Rated</span>
                  </div>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-3">
                    <span className="font-display text-3xl font-bold text-navy">
                      Rs.{product.price}
                    </span>
                    {hasDiscount && (
                      <span className="rounded-full bg-coral/10 px-3 py-1 text-sm font-bold text-coral">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                  <p className="tax mt-1 text-sm text-navy/50">inclusive of all taxes</p>

                  <div className="my-7 h-px w-full bg-navy/10" />

                  {/* Size selector */}
                  <div className="flex items-center justify-between">
                    <p className="size-text text-sm font-semibold uppercase tracking-wide text-navy">
                      Select Size
                    </p>
                    <Link
                      to={`/sizechart/${product.gender}`}
                      className="chart inline-flex items-center gap-1 text-sm font-semibold text-coral hover:text-coral-600"
                    >
                      <Ruler className="h-4 w-4" /> Size Chart
                    </Link>
                  </div>
                  <div className="size mt-4 flex flex-wrap gap-3">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        value={s}
                        onClick={(event) => { setSize(event.target.value); setError('') }}
                        className={`grid h-12 w-12 place-items-center rounded-full border text-sm font-semibold transition-all ${
                          size === s
                            ? 'border-coral bg-coral text-navy shadow-glow'
                            : 'border-navy/15 bg-white text-navy hover:border-coral/50 hover:text-coral'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {error && <p className="error-message mt-3 text-sm font-medium text-red-500">{error}</p>}

                  {/* Actions */}
                  <div className="button-container mt-7 flex flex-wrap gap-4">
                    <button
                      className="btn-primary text-base"
                      onClick={() => {
                        if (!size) {
                          setError('Please select a size');
                          return;
                        }
                        addCart(product._id, size, setCart, product.name, product.about, product.price, product.discount, setError);
                        toast.success('Added to cart', { position: "top-center" });
                      }}
                    >
                      <ShoppingBag className="h-5 w-5" /> Add to bag
                    </button>
                    <button className="btn-ghost text-base" onClick={handleWishList}>
                      <Heart className="h-5 w-5" /> Wishlist
                    </button>
                  </div>

                  {/* Trust badges */}
                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {trustBadges.map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2.5 rounded-2xl border border-navy/5 bg-white p-3 text-sm font-medium text-navy/75 shadow-soft"
                      >
                        <Icon className="h-5 w-5 shrink-0 text-coral" />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="my-7 h-px w-full bg-navy/10" />

                  {/* Product info */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="product_detail_list mb-2 text-sm font-bold uppercase tracking-wide text-navy">
                        Product details
                      </p>
                      <ul className="space-y-1 text-sm text-navy/70">
                        <li className="p_d_l">Colour: {product.colour}</li>
                        <li className="p_d_l">{product.fit}</li>
                      </ul>
                    </div>
                    <div>
                      <p className="product_detail_list mb-2 text-sm font-bold uppercase tracking-wide text-navy">
                        Material &amp; Care
                      </p>
                      <ul className="space-y-1 text-sm text-navy/70">
                        <li className="p_d_l">{product.material}</li>
                        <li className="p_d_l">{product.care}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="my-7 h-px w-full bg-navy/10" />

                  {/* Ratings */}
                  <p className="product-rating text-sm font-bold uppercase tracking-wide text-navy">Ratings</p>
                  <div className="rate-num mt-2 inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-2 text-lg font-bold text-navy">
                    <Star className="h-5 w-5 fill-coral text-coral" />
                    {product.rating}
                  </div>
                </div>
              </div>
            </section>
          </>
        )
      }
      <Footer />
    </div>
  )
}
