import React, {useState, useEffect, useContext} from 'react'
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import axios from 'axios';
import {Link} from 'react-router-dom';
import WishListItem from '../component/WishListItem';
import { UserContext } from '../Context/UserContext';
import { Heart, ArrowRight } from 'lucide-react';

export default function WishList() {
    const [wishlistItems, setWhishlistItems] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(UserContext);
    const userId = user?._id;

    useEffect(()=>{
        const getWishlistItems = async()=>{
            if (!userId) {
                setWhishlistItems([]);
                setIsEmpty(true);
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`https://fashionethnic.onrender.com/api/wishlist/products/${userId}`);
                const array = response.data.item;
                let fetchedItem = [];
                for(const item of array){
                    try {
                        const id = item.product;
                        const wishlistItem = await axios.get(`https://fashionethnic.onrender.com/api/products/detail/${id}`);
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
            const response = await axios.patch('https://fashionethnic.onrender.com/api/wishlist/remove_product',{
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
    <div className="min-h-screen bg-cream">
      <Navbar/>

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-28">
        {loading ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-soft">
                <div className="skeleton aspect-[3/4] w-full" />
                <div className="space-y-3 p-4">
                  <div className="skeleton h-4 w-3/4 rounded-full" />
                  <div className="skeleton h-4 w-1/3 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : isEmpty ? (
          <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-navy/5 bg-white px-6 py-16 text-center shadow-card">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-coral/10 text-coral">
              <Heart className="h-9 w-9" />
            </span>
            <h1 className="mt-6 font-display text-2xl font-bold text-navy">Your wishlist is empty</h1>
            <p className="mt-3 text-sm leading-relaxed text-navy/60">
              Add items that you like to your wishlist. Review them anytime and
              easily move them to the bag.
            </p>
            <Link to="/" className="btn-primary mt-8">
              Browse products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Saved for later</p>
                <h1 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
                  My Wishlist
                </h1>
              </div>
              <span className="hidden shrink-0 rounded-full bg-navy/5 px-4 py-1.5 text-sm font-semibold text-navy sm:inline-flex">
                {wishlistItems.length} item{wishlistItems.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-5 sm:justify-start">
              {wishlistItems.map((item) => (
                <WishListItem key={item._id} product={item} handleRemove={handleRemove} />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer/>
    </div>
  )
}
