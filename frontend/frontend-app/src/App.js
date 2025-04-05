import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home.jsx";
import Signin from "./page/Signin.jsx";
import Signup from "./page/Signup.jsx";
import Navbar from './component/Navbar';
import Product from './component/Product';
import Productdetails from './page/Productdetails.jsx';
import Cart from './page/Cart.jsx';   
import Bill from './page/Bill';
import Profile from './page/Profile.jsx';
import Dashboard from './component/Dashboard.jsx';  
import ContactUs from './page/ContactUs.jsx';
import PrivacyPolicy from './page/PrivacyPolicy';
import Trackorder from './component/Trackorder.jsx';
import TermsofUse from './page/TermsofUse.jsx';
import Shippingaddress from './component/Shippingaddress.jsx';
import TC from './component/TC.jsx';
import Orders from './component/Orders.jsx';
import UpdatePhone from './page/UpdatePhone.jsx';
import UpdateGender from './page/UpdateGender.jsx';
import UpdateDOB from './page/UpdateDOB.jsx';
import ProductCarousel from './component/ProductCarousel.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from "./Context/CartContext.jsx";
import CartManager from './utlis/cart/CartManager.jsx';
import { UserContext } from './Context/UserContext.jsx';
import WishList from './page/WishList.jsx';
import SizeChart from './component/SizeChart.jsx';
import { Toaster } from 'react-hot-toast'; 
import AddProduct from './page/admin/AddProduct.jsx';
import Logout from './component/Logout.jsx';
import ForgotPassword from './page/ForgotPassword.jsx'
import SetNewPassword from './page/SetNewPassword.jsx';
import ProductsPage from './page/ProductsPage.jsx';
import FeatureDemo from './page/admin/landing.jsx';
function App() {
    const { user } = useContext(UserContext);
    const id = user?._id;

    return (
        <>
            <BrowserRouter>
                <CartProvider>
                    <CartManager userId={id} />
                    <Toaster position="bottom-right" reverseOrder={false} />
                    <Routes>
                        <Route path="/" Component={Home} />
                        <Route path="/Signup" Component={Signup} /> 
                        <Route path="/Signin" Component={Signin} /> 
                        <Route path="/Navbar" Component={Navbar} />
                        <Route path="/Product" Component={Product} />
                        <Route path="/Productdetails/:id" Component={Productdetails} />
                        <Route path="/Cart" Component={Cart} />
                        <Route path="/Bill" Component={Bill} />
                        <Route path='/Profile' Component={Profile} />
                        <Route path='/Profile/:c_id' Component={Profile} />
                        <Route path='/Profile/Dashboard' Component={Dashboard} />
                        <Route path='/PrivacyPolicy' Component={PrivacyPolicy} />
                        <Route path='/Profile/Shippingaddress' Component={Shippingaddress} />
                        <Route path='/TC' Component={TC} />
                        <Route path='/TermsofUse' Component={TermsofUse} />
                        <Route path='/Trackorder' Component={Trackorder} />
                        <Route path='/ContactUs' Component={ContactUs} />
                        <Route path='/Orders' Component={Orders} />
                        <Route path='/UpdatePhone' Component={UpdatePhone} />
                        <Route path='/UpdateGender' Component={UpdateGender} />
                        <Route path='/UpdateDOB' Component={UpdateDOB} />
                        <Route path='/productCarousel/:id' Component={ProductCarousel} />
                        <Route path='/wishlist' Component={WishList} /> 
                        <Route path='/sizechart/:gender' Component={SizeChart} /> 
                        <Route path='/admin/addproduct' Component={AddProduct} /> 
                        <Route path='/logout' Component={Logout} /> 
                        <Route path='/forgotpassword' Component={ForgotPassword} /> 
                        <Route path='/setnewpassword' Component={SetNewPassword} /> 
                        <Route path='/products' Component={ProductsPage} />
                        <Route path='/admin/landing' Component={FeatureDemo} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </CartProvider>
            </BrowserRouter>
        </>
    );
}
export default App;
