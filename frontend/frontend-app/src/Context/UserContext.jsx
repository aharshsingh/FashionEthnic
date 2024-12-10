import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [id, setId] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  
  const checkLoggedIn = async()=>{
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('',{
        token
      });
      if(response.status === 200){
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    checkLoggedIn();
  },[]);

  return (
    <UserContext.Provider value={{ id, setId, userLoggedIn, setUserLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
