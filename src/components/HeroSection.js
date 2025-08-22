// src/components/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section id="hero" className="hero section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="content-wrapper" data-aos="fade-up" data-aos-delay="100">
            <h1 className="hero-title">Trusted Taste Since 1984</h1>
            <p className="hero-description">
              Since 1984, Seval Gıda has been delivering high-quality, <b>Halal-certified</b>
              food products to international markets, serving importers, distributors, and HORECA professionals
              worldwide.
            </p>
            <div className="hero-actions" data-aos="fade-up" data-aos-delay="200">
              <Link to="/products" className="btn-primary">Explore Our Products</Link>
              <a href="#categories" className="btn-secondary">Browse Categories</a>
            </div>
          </div>
        </div>

        <div className="hero-visuals">
          <div className="product-showcase" data-aos="fade-left" data-aos-delay="200">
            <div className="product-card featured">
              <img 
                src={`${process.env.PUBLIC_URL}/assets/img/product/cordonbleu.webp`} 
                alt="Featured Product" 
                className="img-fluid" 
              />
              <div className="product-badge">Best Seller</div>
              <div className="product-info">
                <h4>Premium Cordon Bleu</h4>
                <div className="price">
                  {/* Price content can be added here */}
                </div>
              </div>
            </div>

            <div className="product-grid">
              <div className="product-mini" data-aos="zoom-in" data-aos-delay="400">
                <img 
                  src={`${process.env.PUBLIC_URL}/assets/img/product/chicken-nugget.webp`} 
                  alt="Product" 
                  className="img-fluid" 
                />
                <span className="mini-price"></span>
              </div>
              <div className="product-mini" data-aos="zoom-in" data-aos-delay="500">
                <img 
                  src={`${process.env.PUBLIC_URL}/assets/img/product/halal-shawarma.webp`} 
                  alt="Product" 
                  className="img-fluid" 
                />
                <span className="mini-price"></span>
              </div>
            </div>
          </div>

          <div className="floating-elements">
            <div className="floating-icon cart" data-aos="fade-up" data-aos-delay="600">
              <img 
                src={`${process.env.PUBLIC_URL}/assets/img/Certificates-icon/2[1].webp`} 
                alt="ISO Certified" 
                className="feature-icon"
                style={{maxHeight: '55px'}}
              />
            </div>
            <div className="floating-icon wishlist" data-aos="fade-up" data-aos-delay="700">
              <img 
                src={`${process.env.PUBLIC_URL}/assets/img/Certificates-icon/3[1].webp`} 
                alt="ISO Certified" 
                className="feature-icon"
                style={{maxHeight: '55px'}}
              />
            </div>
            <div className="floating-icon search" data-aos="fade-up" data-aos-delay="800">
              <img 
                src={`${process.env.PUBLIC_URL}/assets/img/Certificates-icon/4[1].webp`} 
                alt="ISO Certified" 
                className="feature-icon"
                style={{maxHeight: '55px'}}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;