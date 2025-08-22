// src/App.js - Enhanced with Error Handling & SEO
import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import AOS from 'aos';
import { HelmetProvider } from 'react-helmet-async';

// App.js veya index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/main.css'; // En sonda!
import 'aos/dist/aos.css';

// Import Components
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Products = React.lazy(() => import('./pages/Products'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Export = React.lazy(() => import('./pages/Export'));
const Dealer = React.lazy(() => import('./pages/Dealer'));
const ProductAdmin = React.lazy(() => import('./components/ProductAdmin'));

// 404 Page Component
const NotFound = () => (
  <div className="container py-5 text-center">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="error-404">
          <h1 className="display-1 text-primary">404</h1>
          <h2 className="mb-3">Page Not Found</h2>
          <p className="text-muted mb-4">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/" className="btn btn-primary">
              <i className="bi bi-house me-2"></i>
              Go Home
            </Link>
            <Link to="/products" className="btn btn-outline-primary">
              <i className="bi bi-grid me-2"></i>
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Loading Component
const PageLoader = () => (
  <div className="page-loader">
    <div className="container py-5">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading page...</p>
      </div>
    </div>
  </div>
);

// Main App Component
function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 50
    });

    // Refresh AOS on route change
    AOS.refresh();
  }, [location]);

  useEffect(() => {
    // Google Analytics page tracking (if you have GA)
    if (window.gtag) {
      window.gtag('config', 'GA_TRACKING_ID', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  return (
    <div className="App">
      <Header />
      <main className="main">
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/export" element={<Export />} />
              <Route path="/dealer" element={<Dealer />} />
              
              {/* Product Routes */}
              <Route path="/products" element={<Products />} />
              <Route path="/products/category/:categorySlug" element={<Products />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              
              {/* Search Route */}
              <Route path="/search" element={<Products />} />
              
              {/* Admin Routes (Protected - add authentication in production) */}
              {process.env.NODE_ENV === 'development' && (
                <Route path="/admin/products" element={<ProductAdmin />} />
              )}
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function App() {
  // Determine basename based on environment
  const getBasename = () => {
    // For development, use no basename
    if (process.env.NODE_ENV === 'development') {
      return '';
    }
    
    // For production, use PUBLIC_URL if it exists
    return process.env.PUBLIC_URL || '';
  };

  return (
    <HelmetProvider>
      <Router 
        basename={getBasename()}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;