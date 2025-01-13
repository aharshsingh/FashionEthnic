import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { useCart } from '../Context/CartContext';
import { UserContext } from '../Context/UserContext';
import Productsnippet from '../component/ProductSnippet';
import '../component-css/Cart.css';
import { Link } from 'react-router-dom';
import WishlistAnimation from '../component/WishListAnimation';
import axios from 'axios';

export default function Cart() {
    const { cart, setCart } = useCart();
    const [isEmpty, setIsEmpty] = useState(true)
    const [CartProducts, setCartProducts] = useState([]);
    const [mrpAmount, setMrpAmount] = useState('');
    const [discountAmount, setDiscountAmount] = useState('');
    const [shipping] = useState(50);
    const [totalAmount, setTotalAmount] = useState('')
    const [orderArray, setOrderArray] = useState([]);
    const {user} = useContext(UserContext);
    
    const handleOrder = async()=>{
        localStorage.setItem('items', JSON.stringify(orderArray));
        localStorage.setItem('mrpAmount', JSON.stringify(mrpAmount));
        localStorage.setItem('discountAmount', JSON.stringify(discountAmount));
        localStorage.setItem('totalAmount', JSON.stringify(totalAmount))
    }
    useEffect(() => {
        const calAmount = async()=>{
            let amount1 = 0;
            let amount2 = 0;
            let amount3 = 0;
            cart.productArray.forEach((product)=>{
                amount1 += product.price * product.quantity;
                amount2 += ((product.price * product.discount) / 100) * product.quantity;
                return 0;
            });
            setMrpAmount(amount1);
            setDiscountAmount(amount2);
            amount3 = amount1-amount2;
            setTotalAmount(amount3);
            if(totalAmount < 500)
                setTotalAmount(amount3+50);
        }
        calAmount();
    });

    useEffect(() => {
        setIsEmpty(cart.productArray.length === 0);        
        const getProductImage = async()=>{
            let idArray = [];
            let orderArray = [];
            cart.productArray.map((product) => {
            idArray.push(product.product);
            orderArray.push({
                productId: product.product, 
                quantity: product.quantity})
            return 0;
            });
            setOrderArray(orderArray);
            try {
                const response = await axios.post('http://localhost:7000/getProductImage', {
                    idArray
                })
                setCartProducts(()=>{
                    let arr = cart.productArray;
                    arr.map((product)=>{
                        const res = response.data.result.find(i => i.id === product.product)
                        product.image = res.image.image;
                        return 0;
                    })
                    return arr;
                });
            } catch (error) {
                console.log(error)
            }
        }
        getProductImage();
    }, [cart.productArray]);

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
                        {CartProducts.map((product) => (
                            <Productsnippet key={product._id} product={product} handleRemove={handleRemove} />
                        ))
                        }
                    </div>
                    <div className="cart-inner-container2">
                        <div className='w-[500px] border-[#dddddd] border-1 p-2'>
                            <p >Deliver to: {user.userName}</p>
                            <p>Address: {user.address ? user.address : (<span>N/A</span>)}</p>
                        </div>
                        <div className='w-[500px] border-[#dddddd] border-1 pl-3 pb-4 mt-1'>
                        <p className="snippet-text2">Price Details</p>
                        <div className="snippet-text-container1">
                            <p className="snippet-text1">Total MRP</p>
                            <p className="snippet-text1">{mrpAmount}</p>
                        </div>
                        <div className="snippet-text-container2">
                            <p className="snippet-text1">Discount</p>
                            <p className="snippet-text1">- {discountAmount}</p>
                        </div>
                        <div className="snippet-text-container3">
                            <p className="snippet-text1">Shipping Charges</p>
                            <p className="snippet-text1">+{shipping}</p>
                        </div>
                        <p>________________________________</p>
                        <div className="snippet-text-container4">
                            <p className="snippet-text1">Total Amount</p>
                            <p className="snippet-text1">Rs.{totalAmount}</p>
                        </div>
                        <Link to='/bill'>
                            <button className="order-button" onClick={handleOrder}>PLACE ORDER</button>
                        </Link>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}
