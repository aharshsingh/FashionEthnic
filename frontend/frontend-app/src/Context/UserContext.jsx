import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getUser } from '../utlis/user/getUser';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
const [user, setUser] = useState({});
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(()=>{
  const data = localStorage.getItem("user");
  setUser(JSON.parse(data));
  const res = localStorage.getItem("isLoggedIn");
  setIsLoggedIn(JSON.parse(res));
},[])

useEffect(() =>{
  localStorage.setItem('user', JSON.stringify(user));
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