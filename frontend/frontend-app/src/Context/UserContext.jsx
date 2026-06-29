import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getUser } from '../utlis/user/getUser';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
const [user, setUser] = useState({});
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(()=>{
  try {
    const data = localStorage.getItem("user");
    const parsed = data ? JSON.parse(data) : null;
    // Never let `user` become null — keep it an object so `user._id`,
    // `user.userName`, etc. are safe to read across the app.
    if (parsed && typeof parsed === 'object') {
      setUser(parsed);
    }
    const res = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(res ? JSON.parse(res) : false);
  } catch (error) {
    console.error("Failed to load user from localStorage:", error);
  }
},[])

useEffect(() =>{
  // Only persist a real, populated user — don't clobber storage with
  // `{}`/`null` (which previously poisoned `user` into null on reload).
  if (user && typeof user === 'object' && Object.keys(user).length > 0) {
    localStorage.setItem('user', JSON.stringify(user));
  }
},[user])
  const updateUserId = async (token) => {
    try {
      const response = await axios.post('https://fashionethnic.onrender.com/api/users/userId', { token });
      if (response.status === 200) {
        const id = response.data._id
        const result = await getUser(id);
        setUser(result);
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('user', JSON.stringify(result));
      }
    } catch (error) {
      console.error('Error updating user ID:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUserId, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};