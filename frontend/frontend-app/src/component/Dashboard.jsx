import React, { useContext, useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import '../component-css/Dashboard.css'
import axios from 'axios';
import { UserContext } from '../Context/UserContext';

export default function Dashboard() {

    const [c_id, setC_id] = useState(null);
    const [customerinfo, setCustomerInfo] = useState(null);
    const {user} = useContext(UserContext);
    useEffect(() => {
    axios.get(`https://fashionethnic.onrender.com/profile/${c_id}`)
    .then((response) => {
      setCustomerInfo(response.data);
    })
    .catch((error) => {
      console.error(`Error fetching customer details:`, error);
    });
    },[])
    console.log(customerinfo);
    return (
    <>
      <div className='dashboard-outer-container'>
        <div className='pt-14 pl-20'>
          <p className='ml-3 text-lg font-semibold'>Profile Details</p>
          <div className='mt-3 border-[1px] w-[500px]'></div>
        </div>
        <div className='info-div'>
            <ul className='dash-list'>
                <li className='dash-list-con'>Full Name</li>
                <li className='dash-list-con'>Email ID</li>
                <li className='dash-list-con'>Mobile Number</li>
                <li className='dash-list-con'>Gender</li>
                <li className='dash-list-con'>DOB</li>
            </ul>
            <ul className='dash-list'>
                <li  className='dash-list-con'>{user.userName} </li>
                <li  className='dash-list-con'>{user.email}</li>
                <li  className='dash-list-con'>{user.phoneNumber? user.phoneNumber: "-Not added-"}</li>
                <li  className='dash-list-con'>{user.gender? user.gender: "-Not added-"}</li>
                <li  className='dash-list-con'>{user.dob? user.dob: "-Not added-"}</li>
            </ul>
        </div>
        <Link to='/UpdatePhone'><button className='bg-[#FE8551] w-[350px] p-3 text-base text-[#132C48] font-semibold mt-40 ml-36'>Update</button></Link>
      </div>
    </>
  )
}
