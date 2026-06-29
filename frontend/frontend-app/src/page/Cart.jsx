import React, { useState, useEffect, useContext } from 'react';
import {
    ShoppingBag,
    MapPin,
    Tag,
    ChevronRight,
    ArrowLeft,
    Minus,
    Plus,
    Trash2,
    ShieldCheck,
    Truck,
    RefreshCw,
    BadgePercent,
} from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { useCart } from '../Context/CartContext';
import { UserContext } from '../Context/UserContext';
import '../component-css/Cart.css';
import { Link } from 'react-router-dom';
import WishlistAnimation from '../component/WishListAnimation';
import axios from 'axios';
import toast from 'react-hot-toast'
import LoadingAnimation from '../component/LoadingAnimation';

const trustBadges = [
    { icon: Truck, label: 'Free delivery on time' },
    { icon: RefreshCw, label: '7-day easy returns' },
    { icon: ShieldCheck, label: '100% secure payments' },
];

export default function Cart() {
    const { cart, setCart } = useCart();
    const [isEmpty, setIsEmpty] = useState(true)
    const [CartProducts, setCartProducts] = useState([]);
    const [mrpAmount, setMrpAmount] = useState('');
    const [discountAmount, setDiscountAmount] = useState('');
    const [shipping] = useState(50);
    const [totalAmount, setTotalAmount] = useState('')
    const [orderArray, setOrderArray] = useState([]);
    const [loading, setLoading] = useState(true)
    const { user } = useContext(UserContext);

    const handleOrder = async () => {
        localStorage.setItem('items', JSON.stringify(orderArray));
        localStorage.setItem('mrpAmount', JSON.stringify(mrpAmount));
        localStorage.setItem('discountAmount', JSON.stringify(discountAmount));
        localStorage.setItem('totalAmount', JSON.stringify(totalAmount))
    }
    useEffect(() => {
        const calAmount = async () => {
            let amount1 = 0;
            let amount2 = 0;
            let amount3 = 0;
            cart.productArray.forEach((product) => {
                amount1 += product.price * product.quantity;
                amount2 += ((product.price * product.discount) / 100) * product.quantity;
                return 0;
            });
            setMrpAmount(amount1);
            setDiscountAmount(amount2);
            amount3 = amount1 - amount2;
            setTotalAmount(amount3);
            setTotalAmount(() => (amount3 + 50));
        }
        calAmount();
    });

    useEffect(() => {
        setIsEmpty(cart.productArray.length === 0);
        const getProductImage = async () => {
            // Empty cart — nothing to fetch, show the empty state.
            if (cart.productArray.length === 0) {
                setCartProducts([]);
                setOrderArray([]);
                setLoading(false);
                return;
            }
            let idArray = [];
            let orderArray = [];
            cart.productArray.map((product) => {
                idArray.push(product.product);
                orderArray.push({
                    productId: product.product,
                    quantity: product.quantity
                })
                return 0;
            });
            setOrderArray(orderArray);
            try {
                const response = await axios.post('https://fashionethnic.onrender.com/api/products/get_product_image', {
                    idArray
                })
                const result = response.data?.result || [];
                setCartProducts(() => {
                    let arr = cart.productArray;
                    arr.map((product) => {
                        const res = result.find(i => i.id === product.product)
                        // Guard against products missing from the response.
                        product.image = res?.image?.image || product.image || '';
                        return 0;
                    })
                    return arr;
                });
                setLoading(false)
            } catch (error) {
                console.log(error)
                // Don't hang on the loader if the image fetch fails.
                setCartProducts(cart.productArray);
                setLoading(false)
            }
        }
        getProductImage();
    }, [cart.productArray]);

    const handleRemove = (productId) => {
        const updatedProductArray = cart.productArray.filter(
            (item) => item.id !== productId
        );
        const updatedTotalItems = cart.totalItems - (cart.productArray.find(item => item.id === productId)?.quantity || 0);

        setCart({
            productArray: updatedProductArray,
            totalItems: updatedTotalItems,
        });
        toast.success('Item removed from cart', { position: "top-center" });
    };

    // Increment / decrement a line item's quantity while preserving cart shape.
    const handleQuantity = (productId, delta) => {
        const target = cart.productArray.find((item) => item.id === productId);
        if (!target) return;
        const newQty = target.quantity + delta;
        if (newQty < 1) return; // use the remove button to delete an item

        const updatedProductArray = cart.productArray.map((item) =>
            item.id === productId ? { ...item, quantity: newQty } : item
        );
        setCart({
            productArray: updatedProductArray,
            totalItems: cart.totalItems + delta,
        });
    };

    const totalSavings = Math.round(Number(discountAmount) || 0);
    const totalQty = cart?.totalItems || 0;

    return (
        <div className="min-h-screen bg-cream">
            <Navbar />
            {loading ? (
                <LoadingAnimation />
            ) : (
                isEmpty ? (
                    /* ===================== EMPTY STATE ===================== */
                    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 pb-24 pt-28 text-center lg:pt-36">
                        <span className="eyebrow">
                            <ShoppingBag className="h-3.5 w-3.5" /> Your Cart
                        </span>
                        <h1 className="mt-5 font-display text-3xl font-bold text-navy lg:text-4xl">
                            Your cart is empty
                        </h1>
                        <p className="mt-3 max-w-md text-navy/60">
                            Looks like you haven't added anything yet. Explore our latest
                            arrivals and find something you'll love.
                        </p>
                        <div className="-my-4 flex items-center justify-center">
                            <WishlistAnimation />
                        </div>
                        <Link to="/products">
                            <button className="btn-primary text-base">
                                Continue Shopping <ChevronRight className="h-5 w-5" />
                            </button>
                        </Link>
                    </section>
                ) : (
                    /* ===================== CART ===================== */
                    <section className="mx-auto max-w-7xl px-4 pb-24 pt-24 lg:px-8 lg:pt-32">
                        {/* Header */}
                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <span className="eyebrow">
                                    <ShoppingBag className="h-3.5 w-3.5" /> Shopping Cart
                                </span>
                                <h1 className="mt-4 font-display text-4xl font-bold text-navy lg:text-5xl">
                                    Your Bag
                                </h1>
                                <p className="mt-2 text-navy/60">
                                    {totalQty} item{totalQty === 1 ? '' : 's'} ready for checkout
                                </p>
                            </div>
                            <Link
                                to="/products"
                                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-navy/70 transition-colors hover:text-coral"
                            >
                                <ArrowLeft className="h-4 w-4" /> Continue shopping
                            </Link>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                            {/* ---------- Line items ---------- */}
                            <div className="flex flex-col gap-4">
                                {CartProducts.map((product) => {
                                    const lineTotal = Math.round(
                                        product.price * product.quantity * (1 - (product.discount || 0) / 100)
                                    );
                                    return (
                                        <div
                                            key={product.id}
                                            className="group relative flex gap-4 overflow-hidden rounded-2xl border border-navy/5 bg-white p-3 shadow-soft transition-all hover:shadow-card sm:gap-5 sm:p-4"
                                        >
                                            {/* Image */}
                                            <Link
                                                to={`/Productdetails/${product.product}`}
                                                className="shrink-0 overflow-hidden rounded-xl bg-sand"
                                            >
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-32 w-24 object-cover transition-transform duration-500 group-hover:scale-105 sm:h-40 sm:w-32"
                                                />
                                            </Link>

                                            {/* Details */}
                                            <div className="flex min-w-0 flex-1 flex-col">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <Link to={`/Productdetails/${product.product}`}>
                                                            <h3 className="truncate font-semibold text-navy hover:text-coral">
                                                                {product.name}
                                                            </h3>
                                                        </Link>
                                                        <p className="mt-1 line-clamp-1 hidden text-sm text-navy/50 sm:block">
                                                            {product.about}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemove(product.id)}
                                                        aria-label="Remove item"
                                                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-navy/40 transition-all hover:bg-red-50 hover:text-red-500"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                {/* Size + discount badges */}
                                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                                    <span className="rounded-full bg-navy/5 px-2.5 py-1 text-xs font-semibold text-navy">
                                                        Size: {product.size}
                                                    </span>
                                                    {product.discount > 0 && (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-coral/10 px-2.5 py-1 text-xs font-bold text-coral">
                                                            <BadgePercent className="h-3 w-3" />
                                                            {product.discount}% OFF
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Quantity stepper + price */}
                                                <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                                                    <div className="inline-flex items-center gap-1 rounded-full border border-navy/15 bg-white p-1">
                                                        <button
                                                            onClick={() => handleQuantity(product.id, -1)}
                                                            disabled={product.quantity <= 1}
                                                            aria-label="Decrease quantity"
                                                            className="grid h-8 w-8 place-items-center rounded-full text-navy transition-all hover:bg-navy/5 disabled:cursor-not-allowed disabled:opacity-40"
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </button>
                                                        <span className="w-7 text-center text-sm font-bold text-navy">
                                                            {product.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleQuantity(product.id, 1)}
                                                            aria-label="Increase quantity"
                                                            className="grid h-8 w-8 place-items-center rounded-full text-navy transition-all hover:bg-navy/5"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-display text-lg font-bold text-navy">
                                                            Rs.{lineTotal}
                                                        </p>
                                                        {product.discount > 0 && (
                                                            <p className="text-xs text-navy/40 line-through">
                                                                Rs.{product.price * product.quantity}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* ---------- Summary ---------- */}
                            <div className="lg:sticky lg:top-28 lg:self-start">
                                <div className="space-y-5">
                                    {/* Delivery */}
                                    <div className="rounded-2xl border border-navy/5 bg-white p-5 shadow-soft">
                                        <div className="flex items-center justify-between">
                                            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-navy">
                                                <MapPin className="h-4 w-4 text-coral" /> Deliver to
                                            </p>
                                            <Link
                                                to="/Profile/Shippingaddress"
                                                className="text-xs font-semibold text-coral hover:text-coral-600"
                                            >
                                                Change
                                            </Link>
                                        </div>
                                        <p className="mt-3 font-semibold text-navy">
                                            {user?.userName || 'Guest'}
                                        </p>
                                        <p className="mt-0.5 text-sm text-navy/60">
                                            {user?.address ? user.address : 'No saved address — add one at checkout'}
                                        </p>
                                    </div>

                                    {/* Coupon */}
                                    <div className="rounded-2xl border border-dashed border-coral/40 bg-coral/5 p-4">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-navy">
                                            <Tag className="h-4 w-4 text-coral" /> Have a coupon?
                                        </label>
                                        <div className="mt-3 flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Enter code"
                                                className="w-full rounded-xl border border-navy/15 bg-white px-3 py-2 text-sm text-navy outline-none transition-all focus:border-coral focus:ring-2 focus:ring-coral/20"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => toast('Coupons coming soon!', { position: 'top-center' })}
                                                className="shrink-0 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-navy-800"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price details */}
                                    <div className="rounded-2xl border border-navy/5 bg-white p-5 shadow-soft">
                                        <p className="flex items-center gap-2 font-display text-lg font-bold text-navy">
                                            <Tag className="h-5 w-5 text-coral" /> Price Details
                                        </p>
                                        <div className="mt-5 space-y-3 text-sm">
                                            <div className="flex justify-between text-navy/70">
                                                <p>Total MRP</p>
                                                <p className="font-medium text-navy">Rs.{Math.round(Number(mrpAmount) || 0)}</p>
                                            </div>
                                            <div className="flex justify-between text-navy/70">
                                                <p>Discount on MRP</p>
                                                <p className="font-medium text-coral">- Rs.{totalSavings}</p>
                                            </div>
                                            <div className="flex justify-between text-navy/70">
                                                <p>Shipping Charges</p>
                                                <p className="font-medium text-navy">+ Rs.{shipping}</p>
                                            </div>
                                        </div>
                                        <div className="my-4 h-px w-full bg-navy/10" />
                                        <div className="flex items-center justify-between font-display text-xl font-bold text-navy">
                                            <p>Total Amount</p>
                                            <p>Rs.{Math.round(Number(totalAmount) || 0)}</p>
                                        </div>

                                        {totalSavings > 0 && (
                                            <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-green-50 py-2.5 text-sm font-semibold text-green-700">
                                                <BadgePercent className="h-4 w-4" />
                                                You save Rs.{totalSavings} on this order
                                            </div>
                                        )}

                                        <Link className="mt-5 block" to="/bill">
                                            <button className="btn-primary w-full text-base" onClick={handleOrder}>
                                                Place Order <ChevronRight className="h-5 w-5" />
                                            </button>
                                        </Link>

                                        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-navy/50">
                                            <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                                            Safe & secure checkout
                                        </p>
                                    </div>

                                    {/* Trust badges */}
                                    <div className="grid grid-cols-1 gap-2">
                                        {trustBadges.map(({ icon: Icon, label }) => (
                                            <div
                                                key={label}
                                                className="flex items-center gap-2.5 rounded-xl border border-navy/5 bg-white px-4 py-2.5 text-sm font-medium text-navy/75 shadow-soft"
                                            >
                                                <Icon className="h-4 w-4 shrink-0 text-coral" />
                                                <span>{label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            <Footer />
        </div>
    );
}
