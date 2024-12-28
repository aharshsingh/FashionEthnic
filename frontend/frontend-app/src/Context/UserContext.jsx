import React, { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [id, setId] = useState('');

  const updateUserId = async (token) => {
    try {
      const response = await axios.post('http://localhost:7000/userId', { token });
      if (response.status === 200) {
        setId(response.data._id);
        localStorage.setItem('userId', response.data._id);
      }
    } catch (error) {
      console.error('Error updating user ID:', error);
    }
  };

  return (
    <UserContext.Provider value={{ id, setId, updateUserId }}>
      {children}
    </UserContext.Provider>
  );
};