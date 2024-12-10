import React, {useState, useEffect} from 'react'
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import axios from 'axios';
import Product from '../component/Product';

export default function WishList() {
    const [wishlistItems, setWhishlistItems] = useState([]);
    const id = localStorage.getItem("userId");
    
    useEffect(()=>{
        const getWishlistItems = async()=>{
            try {
                const response = await axios.get(`http://localhost:7000/getwishlist/${id}`);
                const array = response.data.item;  
                let fetchedItem = [];
                for(const item of array){
                    try {
                        const id = item.product;
                        const wishlistItem = await axios.get(`http://localhost:7000/productDetails/${id}`);
                        fetchedItem.push(wishlistItem.data);
                    } catch (error) {
                        console.log(error);
                    }
                }
                setWhishlistItems(fetchedItem);
            } catch (error) {
                console.log(error);
            }
        }
        getWishlistItems();
    },[id])
    return (

    <div>
      <Navbar/>
      <div>
        <p style={{marginTop:'150px', marginLeft:'180px', fontSize:'21px', fontWeight:'300'}}>My Wishlist</p>
        <div style={{display:'flex', columnGap:'20px', marginLeft:'180px'}}>
            {
                wishlistItems.map((item)=>{
                    return <Product key={item._id} product = {item} />
                })
            }
        </div>
      </div>
      <Footer/>
    </div>
  )
}
