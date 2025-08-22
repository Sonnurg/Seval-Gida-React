// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/main.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Bootstrap CSS import
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Get the root element
const container = document.getElementById('root');
const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring
reportWebVitals();