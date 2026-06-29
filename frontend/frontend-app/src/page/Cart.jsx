import React, { useState, useEffect, useContext } from 'react';
import { ShoppingBag, MapPin, Tag, ChevronRight } from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { useCart } from '../Context/CartContext';
import { UserContext } from '../Context/UserContext';
import Productsnippet from '../component/ProductSnippet';
import '../component-css/Cart.css';
import { Link } from 'react-router-dom';
import WishlistAnimation from '../component/WishListAnimation';
import axios from 'axios';
import toast from 'react-hot-toast'
import LoadingAnimation from '../component/LoadingAnimation';

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

    return (
        <div className="min-h-screen bg-cream">
            <Navbar />
            {loading ? (
                <LoadingAnimation />
            ) : (
                isEmpty ? (
                    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 pb-24 pt-28 text-center lg:pt-36">
                        <span className="eyebrow">
                            <ShoppingBag className="h-3.5 w-3.5" /> Your Cart
                        </span>
                        <h1 className="mt-5 font-display text-3xl font-bold text-navy lg:text-4xl">
                            Your cart is empty
                        </h1>
                        <p className="mt-3 max-w-md text-navy/60">
                            Your cart is currently empty. Add items you love to your cart now.
                            Review them anytime and proceed to checkout with ease.
                        </p>
                        <div className="-my-6 flex items-center justify-center">
                            <WishlistAnimation />
                        </div>
                        <Link className="link" to="/">
                            <button className="btn-primary text-base">
                                <p className="para3">Continue Shopping</p>
                            </button>
                        </Link>
                    </section>
                ) : (
                    <section className="mx-auto max-w-7xl px-4 pb-24 pt-24 lg:px-8 lg:pt-32">
                        <div className="mb-8">
                            <span className="eyebrow">
                                <ShoppingBag className="h-3.5 w-3.5" /> Shopping Cart
                            </span>
                            <h1 className="mt-4 font-display text-3xl font-bold text-navy lg:text-4xl">
                                Your Bag
                            </h1>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                            {/* Line items */}
                            <div className="cart-inner-container1 flex flex-col gap-4">
                                {CartProducts.map((product) => (
                                    <Productsnippet key={product._id} product={product} handleRemove={handleRemove} />
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="lg:sticky lg:top-28 lg:self-start">
                                <div className="rounded-2xl border border-navy/5 bg-white p-5 shadow-soft">
                                    <p className="flex items-center gap-2 text-sm font-semibold text-navy">
                                        <MapPin className="h-4 w-4 text-coral" /> Deliver to: {user?.userName || 'Guest'}
                                    </p>
                                    <p className="mt-1 text-sm text-navy/60">
                                        Address: {user?.address ? user.address : (<span>N/A</span>)}
                                    </p>
                                </div>

                                <div className="mt-5 rounded-2xl border border-navy/5 bg-white p-5 shadow-soft">
                                    <p className="flex items-center gap-2 font-display text-lg font-bold text-navy">
                                        <Tag className="h-5 w-5 text-coral" /> Price Details
                                    </p>
                                    <div className="mt-5 space-y-3 text-sm">
                                        <div className="flex justify-between text-navy/70">
                                            <p>Total MRP</p>
                                            <p className="font-medium text-navy">Rs.{mrpAmount}</p>
                                        </div>
                                        <div className="flex justify-between text-navy/70">
                                            <p>Discount</p>
                                            <p className="font-medium text-coral">- {discountAmount}</p>
                                        </div>
                                        <div className="flex justify-between text-navy/70">
                                            <p>Shipping Charges</p>
                                            <p className="font-medium text-navy">+{shipping}</p>
                                        </div>
                                    </div>
                                    <div className="my-4 h-px w-full bg-navy/10" />
                                    <div className="flex justify-between font-display text-lg font-bold text-navy">
                                        <p>Total Amount</p>
                                        <p>Rs.{totalAmount}</p>
                                    </div>
                                    <Link className="mt-6 block" to="/bill">
                                        <button className="btn-primary w-full text-base" onClick={handleOrder}>
                                            Place Order <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            <Footer />
        </div>
    );
}
