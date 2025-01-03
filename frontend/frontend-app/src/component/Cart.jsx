import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useCart } from '../Context/CartContext';
import Productsnippet from './ProductSnippet';
import '../component-css/Cart.css';
import { Link } from 'react-router-dom';
import WishlistAnimation from './WishListAnimation';
// import { UserContext } from '../Context/UserContext';

export default function Cart() {
    const { cart, setCart } = useCart();
    const [isEmpty, setIsEmpty] = useState(true)

    useEffect(() => {
        setIsEmpty(cart.productArray.length === 0);
    }, [cart.productArray]);

    useEffect(()=>{
        console.log(cart);
    })
    const handleRemove = (productId) => {
        const updatedProductArray = cart.productArray.filter(
            (item) => item.product !== productId
        );
        const updatedTotalItems = cart.totalItems - (cart.productArray.find(item => item.product === productId)?.quantity || 0);

        setCart({
            productArray: updatedProductArray,
            totalItems: updatedTotalItems,
        });
    };

    return (
        <>
            <Navbar />
            {isEmpty ? (
                <div style={{ marginTop: '250px', textAlign: 'center' }}>
                    <p style={{ fontWeight: 'bolder', fontSize: '20px' }}>YOUR CART IS EMPTY</p>
                    <p style={{ marginTop: '25px', color: 'grey' }}>
                      Your cart is currently empty. Add items you love to your cart now.<br/> Review them anytime and proceed to checkout with ease
                    </p>
                    <div style={{ marginLeft: '805px', marginTop: '-50px' }}>
                        <WishlistAnimation />
                    </div>
                    <div style={{ marginLeft: '-70px', marginTop: '-80px' }}>
                        <Link className="link" to="/">
                            <button className="button">
                                <p className="para3">Continue Shopping</p>
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="cart-outer-container">
                    <div className="cart-inner-container1">
                        {cart.productArray.map((product) => (
                            <Productsnippet key={product._id} product={product} handleRemove={handleRemove} />
                        ))
                        }
                    </div>
                    <div className="cart-inner-container2">
                        <p className="snippet-text2">Price Details</p>
                        <div className="snippet-text-container1">
                            <p className="snippet-text1">Total MRP</p>
                            <p className="snippet-text1">2999</p>
                        </div>
                        <div className="snippet-text-container2">
                            <p className="snippet-text1">Discount</p>
                            <p className="snippet-text1">-1,299</p>
                        </div>
                        <div className="snippet-text-container3">
                            <p className="snippet-text1">Shipping Charges</p>
                            <p className="snippet-text1">+50</p>
                        </div>
                        <p>________________________________</p>
                        <div className="snippet-text-container4">
                            <p className="snippet-text1">Total Amount</p>
                            <p className="snippet-text1">Rs.1,199</p>
                        </div>
                        <Link to="/Bill">
                            <button className="order-button">PLACE ORDER</button>
                        </Link>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}
