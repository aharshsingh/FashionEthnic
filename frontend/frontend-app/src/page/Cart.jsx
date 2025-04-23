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
            setTotalAmount(()=> (amount3+50));
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
                const response = await axios.post('https://fashionethnic.onrender.com/api/products/get_product_image', {
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
                setLoading(false)
            } catch (error) {
                console.log(error)
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
        <>
            <Navbar />
            { loading ? (
                        <LoadingAnimation/>
                    ) : (
            isEmpty ? (
                <div style={{ marginTop: '250px', textAlign: 'center' }}>
                    <p style={{ fontWeight: 'bolder', fontSize: '20px' }}>YOUR CART IS EMPTY</p>
                    <p style={{ marginTop: '25px', color: 'grey' }}>
                      Your cart is currently empty. Add items you love to your cart now.<br/> Review them anytime and proceed to checkout with ease
                    </p>
                    <div className='-mt-14 flex justify-center items-center '>
                        <WishlistAnimation />
                    </div>
                    <div style={{ marginTop: '-80px' }}>
                        <Link className="link" to="/">
                            <button className="button">
                                <p className="para3 -mt-1">Continue Shopping</p>
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="lg:mt-[200px] mt-24 flex lg:flex-row lg:justify-center lg:gap-20 flex-col justify-center">
                    <div className="cart-inner-container1 lg:h-[520px] h-[350px] ">
                        {CartProducts.map((product) => (
                            <Productsnippet key={product._id} product={product} handleRemove={handleRemove} />
                        ))
                        }
                    </div>
                    <div className='mt-16'>
                        <div className='ml-3 lg:ml-0 lg:w-[500px] lg:border-[#dddddd] lg:border lg:p-2 lg:text-base text-sm '>
                            <p >Deliver to: {user.userName}</p>
                            <p>Address: {user.address ? user.address : (<span>N/A</span>)}</p>
                        </div>
                        <div className='lg:w-[500px] lg:border-[#dddddd] lg:border pl-3 pb-4 mt-1'>
                        <p className="mt-7 color-[#132C48] text-[18px] lg:text-lg font-medium">Price Details</p>
                        <div className="flex justify-between mt-4 mr-6 lg:mr-36">
                            <p className="text-sm lg:text-base">Total MRP</p>
                            <p className="text-sm lg:text-base">{mrpAmount}</p>
                        </div>
                        <div className="flex justify-between mr-6 lg:mr-36">
                            <p className="text-sm lg:text-base">Discount</p>
                            <p className="text-sm lg:text-base">- {discountAmount}</p>
                        </div>
                        <div className="flex justify-between mr-6 lg:mr-36">
                            <p className="text-sm lg:text-base">Shipping Charges</p>
                            <p className="text-sm lg:text-base">+{shipping}</p>
                        </div>
                        <div className='border border-[#cecece] w-[345px] mt-2'></div>
                        <div className="flex justify-between mt-2 mr-6 lg:mr-36">
                            <p className="text-sm lg:text-base">Total Amount</p>
                            <p className="text-sm lg:text-base">Rs.{totalAmount}</p>
                        </div>
                        <Link className='flex justify-center items-center' to='/bill'>
                            <button className="mt-[50px] p-[13px] w-96 -ml-3 lg:w-[400px] text-[#132C48] font-semibold text-base lg:font-bold lg:text-lg bg-[#FE8551] rounded-md" onClick={handleOrder}>PLACE ORDER</button>
                        </Link>
                        </div>
                    </div>
                </div>
            ))}
            <div className='mt-72'>
            <Footer />
            </div>
        </>
    );
}
