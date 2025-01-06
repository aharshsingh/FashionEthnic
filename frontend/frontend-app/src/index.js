import ReactDOM from "react-dom";
import App from "./App";
import React from 'react'
import './component-css/tailwindCss.css';
import { UserProvider } from './Context/UserContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
      <App />
    </UserProvider> 
);
