import React, {useState, useEffect, useContext} from 'react'
import Ordersnippet from './OrderSnippet'
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
export default function Orders() {
  const {user} = useContext(UserContext);
  const [order, setOrder] = useState([]);
  useEffect(()=>{
    const getOrder = async()=>{
      try {
        const response = await axios.get(`https://fashionethnic.onrender.com/api/orders/get_order/${user._id}`);
        console.log(response.data);
        setOrder(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    
    getOrder();
  },[user._id])
  return (
    <div>
      <div className='pl-6'>
        <p className='ml-3 text-lg font-semibold'>Order history</p>
        <div className='mt-3 border-[1px] w-[600px]'></div>
      </div>
      <div className='mt-5 w-[540px] ml-[100px]'>
          {order.map((i)=>(
            <div>
            <div className='flex justify-between mt-12'>
            <p className='text-xs font-semibold text-[#FE8551]'>Delivery in process</p>
            <p className='text-[14px] font-light text-[#a8a8a8]'>24/02/2025</p>
          </div>
          <p className='text-[14px] font-light text-[#a8a8a8]'>Delivery address: nala supara</p>
          {i.items.map((order)=>{
             return <div className='ml-[-300px] mt-[-80px]'><Ordersnippet key={order._id} order={order} /></div>
          })}
        </div>
          ))}
        {/* <Product_snippet/> */}
      </div>
    </div>
  )
}
