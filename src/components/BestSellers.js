import React from 'react';

const BestSellers = () => {
  const products = [
    {
      id: 1,
      name: "Mauris blandit aliquet elit",
      category: "Premium Collection",
      image: "product-1.webp",
      price: 189.00,
      rating: 4,
      reviews: 24,
      badge: "Limited",
      colors: ["#2563eb", "#059669", "#dc2626"]
    },
    {
      id: 2,
      name: "Sed do eiusmod tempor incididunt",
      category: "Best Sellers",
      image: "product-4.webp",
      price: 180.00,
      oldPrice: 240.00,
      rating: 4.5,
      reviews: 38,
      badge: "25% Off",
      badgeType: "sale",
      colors: ["#1f2937", "#f59e0b", "#8b5cf6"]
    },
    {
      id: 3,
      name: "Lorem ipsum dolor sit amet consectetur",
      category: "New Arrivals",
      image: "product-7.webp",
      price: 95.00,
      rating: 3,
      reviews: 12,
      colors: ["#ef4444", "#06b6d4", "#10b981"]
    },
    {
      id: 4,
      name: "Ut enim ad minim veniam quis",
      category: "Designer Series",
      image: "product-10.webp",
      price: 165.00,
      rating: 5,
      reviews: 56,
      badge: "Trending",
      badgeType: "trending",
      colors: ["#64748b", "#7c3aed", "#f59e0b"],
      isWishlisted: true
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="bi bi-star-fill"></i>);
      } else if (i - 0.5 <= rating) {
        stars.push(<i key={i} className="bi bi-star-half"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star"></i>);
      }
    }
    return stars;
  };

  return (
    <section id="best-sellers" className="best-sellers section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Best Sellers</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-5">
          {products.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-6">
              <div className="product-item">
                <div className="product-image">
                  {product.badge && (
                    <div className={`product-badge ${product.badgeType === 'sale' ? 'sale-badge' : product.badgeType === 'trending' ? 'trending-badge' : ''}`}>
                      {product.badge}
                    </div>
                  )}
                  <img 
                    src={`${process.env.PUBLIC_URL}/assets/img/product/${product.image}`} 
                    alt={product.name} 
                    className="img-fluid" 
                    loading="lazy" 
                  />
                  <div className="product-actions">
                    <button className={`action-btn wishlist-btn ${product.isWishlisted ? 'active' : ''}`}>
                      <i className={`bi ${product.isWishlisted ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                    </button>
                    <button className="action-btn compare-btn">
                      <i className="bi bi-arrow-left-right"></i>
                    </button>
                    <button className="action-btn quickview-btn">
                      <i className="bi bi-zoom-in"></i>
                    </button>
                  </div>
                  <button className="cart-btn">
                    {product.colors ? 'Select Options' : 'Add to Cart'}
                  </button>
                </div>
                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <h4 className="product-name">
                    <a href={`/product-details/${product.id}`}>{product.name}</a>
                  </h4>
                  <div className="product-rating">
                    <div className="stars">
                      {renderStars(product.rating)}
                    </div>
                    <span className="rating-count">({product.reviews})</span>
                  </div>
                  <div className="product-price">
                    {product.oldPrice && (
                      <span className="old-price">${product.oldPrice}</span>
                    )}
                    <span className="current-price">${product.price}</span>
                  </div>
                  {product.colors && (
                    <div className="color-swatches">
                      {product.colors.map((color, index) => (
                        <span 
                          key={index}
                          className={`swatch ${index === 0 ? 'active' : ''}`} 
                          style={{backgroundColor: color}}
                        ></span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
