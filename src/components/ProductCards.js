// src/components/ProductCards.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { products, categories, getFeaturedProducts, getBestsellerProducts } from '../data/products';

const ProductCards = ({ 
  title = "Ürünlerimiz", 
  subtitle = "Kaliteli ve doğal ürünler", 
  showCategories = true,
  showFeatured = true,
  showBestsellers = true,
  maxProducts = 8,
  className = ""
}) => {
  const [activeTab, setActiveTab] = useState('featured');
  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    let productsToShow = [];
    
    switch (activeTab) {
      case 'featured':
        productsToShow = getFeaturedProducts().slice(0, maxProducts);
        break;
      case 'bestsellers':
        productsToShow = getBestsellerProducts().slice(0, maxProducts);
        break;
      case 'all':
        productsToShow = products.slice(0, maxProducts);
        break;
      default:
        // Category products
        const categoryProducts = products.filter(product => 
          product.categorySlug === activeTab
        );
        productsToShow = categoryProducts.slice(0, maxProducts);
    }
    
    setDisplayProducts(productsToShow);
  }, [activeTab, maxProducts]);

  const tabOptions = [
    { id: 'featured', label: 'Öne Çıkanlar', icon: 'bi-star' },
    { id: 'bestsellers', label: 'Çok Satanlar', icon: 'bi-fire' },
    { id: 'all', label: 'Tüm Ürünler', icon: 'bi-grid' },
    ...categories.map(category => ({
      id: category.slug,
      label: category.name,
      icon: 'bi-tag'
    }))
  ];

  return (
    <section className={`product-cards py-5 ${className}`}>
      <div className="container">
        {/* Section Header */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h2 className="h1 mb-3" data-aos="fade-up">
              {title}
            </h2>
            <p className="lead text-muted mb-4" data-aos="fade-up" data-aos-delay="100">
              {subtitle}
            </p>
            
            {/* Product Categories Tabs */}
            <div className="d-flex justify-content-center" data-aos="fade-up" data-aos-delay="200">
              <ul className="nav nav-pills flex-wrap justify-content-center gap-2" role="tablist">
                {tabOptions.slice(0, 6).map((tab, index) => (
                  <li key={tab.id} className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                      type="button"
                      role="tab"
                    >
                      <i className={`${tab.icon} me-2`}></i>
                      {tab.label}
                    </button>
                  </li>
                ))}
                {tabOptions.length > 6 && (
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      type="button"
                    >
                      <i className="bi bi-three-dots me-2"></i>
                      Daha Fazla
                    </button>
                    <ul className="dropdown-menu">
                      {tabOptions.slice(6).map(tab => (
                        <li key={tab.id}>
                          <button
                            className={`dropdown-item ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                          >
                            <i className={`${tab.icon} me-2`}></i>
                            {tab.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="row g-4">
          {displayProducts.length > 0 ? (
            displayProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="col-lg-3 col-md-4 col-sm-6"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <ProductCard product={product} showQuickView={true} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <i className="bi bi-box text-muted" style={{ fontSize: '3rem' }}></i>
              <h4 className="mt-3 text-muted">Bu kategoride henüz ürün bulunmamaktadır</h4>
              <p className="text-muted">Yakında yeni ürünler eklenecektir.</p>
            </div>
          )}
        </div>

        {/* View All Button */}
        {displayProducts.length > 0 && (
          <div className="row mt-5">
            <div className="col-12 text-center" data-aos="fade-up">
              <Link 
                to={activeTab === 'all' ? '/products' : 
                    activeTab === 'featured' ? '/products?featured=true' :
                    activeTab === 'bestsellers' ? '/products?bestsellers=true' :
                    `/products/category/${activeTab}`}
                className="btn btn-primary btn-lg px-5"
              >
                Tüm {tabOptions.find(tab => tab.id === activeTab)?.label} Ürünleri
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        )}

        {/* Category Grid (if showCategories is true) */}
        {showCategories && (
          <div className="row mt-5 pt-5 border-top">
            <div className="col-12 mb-4">
              <h3 className="h2 text-center" data-aos="fade-up">
                Kategorilerimiz
              </h3>
              <p className="text-center text-muted" data-aos="fade-up" data-aos-delay="100">
                Geniş ürün yelpazemizi keşfedin
              </p>
            </div>
            
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className="col-lg-2 col-md-4 col-6 mb-4"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <Link 
                  to={`/products/category/${category.slug}`}
                  className="text-decoration-none"
                >
                  <div className="category-card text-center p-3 h-100 border rounded-3 bg-light hover-shadow">
                    <div className="category-image mb-3">
                      <img
                        src={category.image || '/api/placeholder/100/100'}
                        alt={category.name}
                        className="img-fluid rounded-circle"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                    </div>
                    <h5 className="category-name mb-2 text-dark">{category.name}</h5>
                    <p className="category-description text-muted small mb-0">
                      {category.description}
                    </p>
                    <div className="mt-2">
                      <span className="badge bg-primary">
                        {products.filter(p => p.categorySlug === category.slug).length} ürün
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .nav-pills .nav-link {
          border-radius: 25px;
          padding: 8px 20px;
          margin: 0 5px;
          border: 2px solid transparent;
          color: #6c757d;
          transition: all 0.3s ease;
        }
        
        .nav-pills .nav-link:hover {
          background-color: #f8f9fa;
          color: #495057;
          transform: translateY(-2px);
        }
        
        .nav-pills .nav-link.active {
          background-color: #007bff;
          color: white;
          border-color: #007bff;
        }
        
        .category-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          background-color: #fff !important;
        }
        
        .hover-shadow:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        
        .category-image img {
          transition: transform 0.3s ease;
        }
        
        .category-card:hover .category-image img {
          transform: scale(1.1);
        }
        
        @media (max-width: 768px) {
          .nav-pills {
            flex-direction: column;
            align-items: center;
          }
          
          .nav-pills .nav-link {
            margin: 5px 0;
            width: 100%;
            max-width: 200px;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default ProductCards;