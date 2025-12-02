import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './Context/Contextpet';
import { AuthProvider } from './Context/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Router>
      <AuthProvider >

        <CartProvider>

          <App />

        </CartProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);


