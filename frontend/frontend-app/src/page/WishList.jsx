import React, {useState, useEffect, useContext} from 'react'
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import axios from 'axios';
import WishlistAnimation from '../component/WishListAnimation';
import {Link} from 'react-router-dom';
import WishListItem from '../component/WishListItem';
import LoadingAnimation from '../component/LoadingAnimation';
import { UserContext } from '../Context/UserContext';

export default function WishList() {
    const [wishlistItems, setWhishlistItems] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(UserContext);
    const userId = user._id;
    
    useEffect(()=>{
        const getWishlistItems = async()=>{
            try {
                const response = await axios.get(`https://fashionethnic.onrender.com/getwishlist/${userId}`);
                const array = response.data.item;  
                let fetchedItem = [];
                for(const item of array){
                    try {
                        const id = item.product;
                        const wishlistItem = await axios.get(`https://fashionethnic.onrender.com/productDetails/${id}`);
                        fetchedItem.push(wishlistItem.data);
                    } catch (error) {
                        console.log(error);
                    }
                }
                setWhishlistItems(fetchedItem);
                setIsEmpty(fetchedItem.length === 0); 
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getWishlistItems();
    },[userId])

    const handleRemove = async (productId)=>{
        try {
            const response = await axios.patch('https://fashionethnic.onrender.com/removeproduct',{
                userId,
                productId
            });
            console.log('Product removed successfully');
            if(response.status === 200)
                window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    return (

    <div>
      <Navbar/>
      <div>
        { loading ? (
            <LoadingAnimation/>
        ) : (
            isEmpty ?
                (<div style={{marginTop: '250px', textAlign: 'center'}}>
                    <p style={{fontWeight:'bolder', fontSize:'20px'}}>YOUR WISHLIST IS EMPTY</p>
                    {console.log(wishlistItems)}
                    <p style={{marginTop:'25px', color:'grey'}}>Add items that you like to your wishlist. Review <br/>them anytime and easily move them to the bag.</p>
                    <div style={{marginLeft:'805px', marginTop:'-50px'}}>
                        <WishlistAnimation/>
                    </div>
                    <div style={{marginLeft:'-70px', marginTop:'-80px'}}>
                        <Link className='link' to='/'><button className='button'><p className='para3'>Continue Shopping</p></button></Link>
                    </div>
                </div>
                ) : (
                <div>
                <p style={{fontSize:'21px', fontWeight:'300'}} className='lg:mt-[150px] lg:ml-[180px] mt-28 ml-10'>My Wishlist</p>
                <div className='flex flex-wrap justify-center lg:justify-start lg:flex-nowrap gap-5 mt-[-50px] lg:ml-60'>
                    {
                        wishlistItems.map((item)=>{
                            return <WishListItem key={item._id} product = {item} handleRemove={handleRemove}/>
                        })
                    }
                </div>
                </div>)
        )}
      </div>
      <div style={{marginTop:'300px'}}>
      <Footer/>
      </div>
    </div>
  )
}
