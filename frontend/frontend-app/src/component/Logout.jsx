import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast'
export default function Logout() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        const logoutUser = async () => {
          try {
              await axios.post("https://fashionethnic.onrender.com/logout",{
                token 
              });
            localStorage.removeItem("token");
            localStorage.removeItem('user');
            localStorage.removeItem('userCart');
            localStorage.removeItem('isLoggedIn');
            navigate("/signin");
            toast.success('Logout successfull');
          }catch (error) {
            console.error("Logout failed:", error);
            toast.error('Failed to logout');
          }
        };
    
        logoutUser();
      }, [navigate, token]);
  return (
    <div>
      <h3>Logging out...</h3>;
    </div>
  )
}
