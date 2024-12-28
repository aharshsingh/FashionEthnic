import ReactDOM from "react-dom";
import App from "./App";
import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react';
import './component-css/tailwindCss.css';
import { UserProvider } from './Context/UserContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth0Provider
    domain="dev-7qe8xxnqajbtz0ka.us.auth0.com"
    clientId="UqhBmoAJGGxHdezzhRuKnYIKrYlFRedK"
    authorizationParams={{
    redirect_uri: window.location.origin}}>
      <UserProvider>
    <App />
    </UserProvider>
  </Auth0Provider>   
);
