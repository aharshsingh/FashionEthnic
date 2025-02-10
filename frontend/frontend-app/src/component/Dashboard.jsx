import React, { useContext, useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import '../component-css/Dashboard.css'
import axios from 'axios';
import { UserContext } from '../Context/UserContext';

export default function Dashboard() {

    const [c_id] = useState(null);
    const [customerinfo, setCustomerInfo] = useState(null);
    const {user} = useContext(UserContext);

    useEffect(() => {
    axios.get(`https://fashionethnic.onrender.com/profile/${c_id}`)
    .then((response) => {
      setCustomerInfo(response.data);
      console.log(customerinfo);
    })
    .catch((error) => {
      console.error(`Error fetching customer details:`, error);
    });
    },[c_id, customerinfo])
    return (
    <>
      <div className='dashboard-outer-container lg:h-[650px] lg:w-[650px] w-[350px]'>
        <div className='lg:pt-14 lg:pl-20 pt-5 pl-5'>
          <p className='lg:ml-3 lg:text-lg text-base font-semibold'>Profile Details</p>
          <div className='mt-3 border-[1px] lg:w-[500px] w-[300px]'></div>
        </div>
        <div className='info-div'>
            <ul className='dash-list lg:ml-[50px] ml-0'>
                <li className='dash-list-con lg:text-base text-[13px]'>Full Name</li>
                <li className='dash-list-con lg:text-base text-[13px]'>Email ID</li>
                <li className='dash-list-con lg:text-base text-[13px]'>Mobile Number</li>
                <li className='dash-list-con lg:text-base text-[13px]'>Gender</li>
                <li className='dash-list-con lg:text-base text-[13px]'>DOB</li>
            </ul>
            <ul className='dash-list'>
                <li  className='dash-list-con lg:text-base text-[13px]'>{user.userName} </li>
                <li  className='dash-list-con lg:text-base text-[13px]'>{user.email}</li>
                <li  className='dash-list-con lg:text-base text-[13px]'>{user.phoneNumber? user.phoneNumber: "-Not added-"}</li>
                <li  className='dash-list-con lg:text-base text-[13px]'>{user.gender? user.gender: "-Not added-"}</li>
                <li  className='dash-list-con lg:text-base text-[13px]'>{user.dob? user.dob: "-Not added-"}</li>
            </ul>
        </div>
        <div className='flex justify-center items-center'>
        <Link to='/UpdatePhone'><button className='bg-[#FE8551] lg:w-[350px] w-40 lg:p-3 p-2 text-base text-[#132C48] font-semibold mt-40 lg:mb-0 mb-4'>Update</button></Link>
        </div>
      </div>
    </>
  )
}
