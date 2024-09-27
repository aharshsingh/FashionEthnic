import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from "react-router-dom";
import '../component-css/Dashboard.css'
import axios from 'axios';

export default function Dashboard() {

    const {isAuthenticated, user} = useAuth0();
    const [c_id, setC_id] = useState(null);
    const [customerinfo, setCustomerInfo] = useState(null);

    useEffect(() => {
    axios.get(`http://localhost:3000/profile/${c_id}`)
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
        <div className='image-div'>
          {isAuthenticated && <img className='dash-userimage' src={user.image} alt='userimage'/>}
          </div>
        <div className='info-div'>
            <ul className='dash-list'>
                <li className='dash-list-con'>Full Name</li>
                <li className='dash-list-con'>Email ID</li>
                <li className='dash-list-con'>Mobile Number</li>
                <li className='dash-list-con'>Gender</li>
                <li className='dash-list-con'>DOB</li>
                <li className='dash-list-con'>Alternate Number</li>
            </ul>
            <ul className='dash-list'>
                <li  className='dash-list-con'>{ isAuthenticated && <p> {user.name} </p> } </li>
                <li  className='dash-list-con'>{ isAuthenticated && <p> {user.email} </p> }</li>
                <li  className='dash-list-con'>{customerinfo?.mobile_number}</li>
                <li  className='dash-list-con'>{customerinfo?.gender}</li>
                <li  className='dash-list-con'>{customerinfo?.DOB}</li>
                <li  className='dash-list-con'>{customerinfo?.alternate_mobile}</li>
            </ul>
        </div>
        <Link to='/UpdatePhone'><button className='update-btn'>Update</button></Link>
      </div>
    </>
  )
}
