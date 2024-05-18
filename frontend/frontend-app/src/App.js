import React, { useEffect, useState } from 'react'
import { BrowserRouter,Routes, Route, Navigate} from "react-router-dom";
import Home from "./component/Home"
import Signin from "./component/Signin"
import Navbar from './component/Navbar'
import Product from './component/Product'
import Productdetails from './component/Productdetails'
import Cart from './component/Cart'   
import Bill from './component/Bill'
import Profile from './component/Profile'
import Dashboard from './component/Dashboard'  
import ContactUs from './component/ContactUs'
import FAQ from './component/FAQ'
import PrivacyPolicy from './component/PrivacyPolicy'
import Trackorder from './component/Trackorder.jsx'
import TermsofUse from './component/TermsofUse.jsx'
import Shippingaddress from './component/Shippingaddress.jsx'
import TC from './component/TC.jsx'
import Orders from './component/Orders.jsx'
import UpdatePhone from './component/UpdatePhone.jsx'
import UpdateGender from './component/UpdateGender.jsx'
import UpdateDOB from './component/UpdateDOB.jsx'
import UpdateAltPhone from './component/UpdateAltPhone.jsx'
import ProductCarousel from './component/ProductCarousel.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from './Context/CartContext.jsx';
import { UserContext } from './Context/UserContext.jsx';
// import axios from 'axios';
function App(){
    const [ user, setUser ] = useState({});
    const [ cart, setCart ] = useState({});
    useEffect(() => {
        const cart = window.localStorage.getItem('cart');
        setCart(JSON.parse(cart));
        // console.log(JSON.parse(cart));
    },[])
    useEffect(() => {
        window.localStorage.setItem('cart' , JSON.stringify(cart));
    },[cart])
    // useEffect(()=>{
    //     axios.get('http://localhost:7000/userInfo')
    //     .
    // },[]);
    return(
        <>
            <BrowserRouter>
            <UserContext.Provider value={ {user, setUser} }>
            <CartContext.Provider value={ {cart, setCart} }>
                <Routes>
                    <Route path="/" Component={Home}></Route>
                    <Route path="/Signin" Component={Signin}></Route> 
                    <Route path="/Navbar" Component={Navbar}></Route>
                    <Route path="/Product" Component={Product}></Route>
                    <Route path="/Productdetails/:id" Component={Productdetails}></Route>
                    <Route path="/Cart" Component={Cart}></Route>
                    <Route path="/Bill" Component={Bill}></Route>
                    <Route path='/Profile' Component={Profile}></Route>
                    <Route path='/Profile/:c_id' Component={Profile}></Route>
                    <Route path='/Profile/Dashboard' Component={Dashboard}></Route>
                    <Route path='/PrivacyPolicy' Component={PrivacyPolicy}></Route>
                    <Route path='/Profile/Shippingaddress' Component={Shippingaddress}></Route>
                    <Route path='/TC' Component={TC}></Route>
                    <Route path='/TermsofUse' Component={TermsofUse}></Route>
                    <Route path='/Trackorder' Component={Trackorder}></Route>
                    <Route path='/FAQ' Component={FAQ}></Route>
                    <Route path='/ContactUs' Component={ContactUs}></Route>
                    <Route path='/Orders' Component={Orders}></Route>
                    <Route path='/UpdatePhone' Component={UpdatePhone}></Route>
                    <Route path='/UpdateGender' Component={UpdateGender}></Route>
                    <Route path='/UpdateDOB' Component={UpdateDOB}></Route>
                    <Route path='/UpdateAltPhone' Component={UpdateAltPhone}></Route>
                    <Route path='/productCarousel/:id' Component={ProductCarousel}></Route>
                    <Route path="*" element={<Navigate to="/Home" replace />} />
                </Routes>
                </CartContext.Provider>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}
export default App;