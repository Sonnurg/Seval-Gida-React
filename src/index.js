// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/main.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// App.js veya index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/main.css'; // En sonda!
import 'react-toastify/dist/ReactToastify.css';

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