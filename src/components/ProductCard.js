// src/components/ProductCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, showQuickView = false, className = "" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    
    // Simulate add to cart action
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically dispatch an action to add to cart
      console.log('Added to cart:', product.name);
    }, 500);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  const discountPercentage = product.originalPrice && product.price < product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className={`product-card h-100 ${className}`}>
      <div className="card h-100 border-0 shadow-sm position-relative overflow-hidden">
        {/* Product Badges */}
        <div className="position-absolute top-0 start-0 z-index-2 p-2">
          {product.isNew && (
            <span className="badge bg-success me-1">Yeni</span>
          )}
          {product.isFeatured && (
            <span className="badge bg-warning text-dark me-1">Öne Çıkan</span>
          )}
          {product.isBestseller && (
            <span className="badge bg-danger me-1">Çok Satan</span>
          )}
          {discountPercentage > 0 && (
            <span className="badge bg-primary">%{discountPercentage} İndirim</span>
          )}
        </div>

        {/* Product Image */}
        <div className="card-img-top position-relative overflow-hidden" style={{ height: '250px' }}>
          <Link to={`/products/${product.id}`} className="d-block h-100">
            <img
              src={imageError ? '/api/placeholder/300/250' : (product.image || '/api/placeholder/300/250')}
              alt={product.name}
              className="img-fluid w-100 h-100 object-fit-cover transition-transform"
              onError={handleImageError}
              style={{ transition: 'transform 0.3s ease' }}
            />
          </Link>

          {/* Quick View Overlay */}
          {showQuickView && (
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 opacity-0 transition-opacity quick-view-overlay">
              <button 
                className="btn btn-light btn-sm me-2"
                onClick={(e) => {
                  e.preventDefault();
                  // Quick view functionality
                  console.log('Quick view:', product.name);
                }}
              >
                <i className="bi bi-eye"></i>
              </button>
              <button 
                className="btn btn-light btn-sm"
                onClick={handleAddToCart}
                disabled={isLoading}
              >
                {isLoading ? (
                  <i className="bi bi-arrow-repeat spin"></i>
                ) : (
                  <i className="bi bi-cart-plus"></i>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="card-body d-flex flex-column">
          {/* Category */}
          {product.category && (
            <div className="mb-2">
              <Link 
                to={`/products/category/${product.categorySlug}`}
                className="text-muted text-decoration-none small text-uppercase fw-bold"
              >
                {product.category}
              </Link>
            </div>
          )}

          {/* Product Name */}
          <h5 className="card-title mb-2">
            <Link 
              to={`/products/${product.id}`} 
              className="text-decoration-none text-dark"
            >
              {product.name}
            </Link>
          </h5>

          {/* Product Description */}
          {product.description && (
            <p className="card-text text-muted small mb-3 flex-grow-1">
              {product.description.length > 80 
                ? `${product.description.substring(0, 80)}...` 
                : product.description
              }
            </p>
          )}

          {/* Rating */}
          {product.rating && (
            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="text-warning me-2">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={`bi ${i < Math.floor(product.rating) ? 'bi-star-fill' : 'bi-star'}`}
                    ></i>
                  ))}
                </div>
                <small className="text-muted">
                  ({product.rating}) • {product.reviewCount || 0} değerlendirme
                </small>
              </div>
            </div>
          )}

          {/* Price */}
          <div className="mt-auto">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <span className="h5 mb-0 text-primary fw-bold">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-muted text-decoration-line-through ms-2 small">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.unit && (
                <small className="text-muted">/{product.unit}</small>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-3">
              {product.stock > 0 ? (
                <div>
                  <span className="badge bg-success">Stokta Var</span>
                  {product.stock <= 5 && (
                    <span className="text-warning small ms-2">
                      Son {product.stock} adet!
                    </span>
                  )}
                </div>
              ) : (
                <span className="badge bg-danger">Stokta Yok</span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              className="btn btn-primary w-100"
              onClick={handleAddToCart}
              disabled={isLoading || product.stock === 0}
            >
              {isLoading ? (
                <>
                  <i className="bi bi-arrow-repeat spin me-2"></i>
                  Ekleniyor...
                </>
              ) : product.stock === 0 ? (
                'Stokta Yok'
              ) : (
                <>
                  <i className="bi bi-cart-plus me-2"></i>
                  Sepete Ekle
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .product-card .card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .product-card .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
        }
        
        .product-card .card:hover .transition-transform {
          transform: scale(1.05);
        }
        
        .product-card .card:hover .quick-view-overlay {
          opacity: 1 !important;
        }
        
        .transition-opacity {
          transition: opacity 0.3s ease;
        }
        
        .transition-transform {
          transition: transform 0.3s ease;
        }
        
        .object-fit-cover {
          object-fit: cover;
        }
        
        .z-index-2 {
          z-index: 2;
        }
        
        .spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .badge {
          font-size: 0.7rem;
        }
        
        @media (max-width: 768px) {
          .card-img-top {
            height: 200px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;