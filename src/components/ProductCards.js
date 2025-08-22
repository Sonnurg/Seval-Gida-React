// src/components/ProductCards.js
import React from 'react';

const ProductCards = () => {
  const productCategories = [
    {
      title: "Trending Now",
      icon: "bi-fire",
      products: [
        {
          id: 1,
          name: "Premium Leather Tote",
          image: "product-1.webp",
          rating: 4.5,
          reviews: 24,
          price: 87.50,
          badges: ["New"]
        },
        {
          id: 2,
          name: "Statement Earrings",
          image: "product-3.webp",
          rating: 5,
          reviews: 41,
          price: 39.99
        },
        {
          id: 3,
          name: "Organic Cotton Shirt",
          image: "product-5.webp",
          rating: 4,
          reviews: 18,
          price: 45.00
        }
      ]
    },
    {
      title: "Best Sellers",
      icon: "bi-award",
      products: [
        {
          id: 4,
          name: "Slim Fit Denim",
          image: "product-2.webp",
          rating: 5,
          reviews: 87,
          price: 68.00,
          oldPrice: 80.00,
          badges: ["-15%"]
        },
        {
          id: 5,
          name: "Designer Handbag",
          image: "product-6.webp",
          rating: 4.5,
          reviews: 56,
          price: 129.99
        },
        {
          id: 6,
          name: "Leather Crossbody",
          image: "product-8.webp",
          rating: 5,
          reviews: 112,
          price: 95.50,
          badges: ["Hot"]
        }
      ]
    },
    {
      title: "Featured Items",
      icon: "bi-star",
      products: [
        {
          id: 7,
          name: "Pleated Midi Skirt",
          image: "product-7.webp",
          rating: 4,
          reviews: 32,
          price: 75.00
        },
        {
          id: 8,
          name: "Geometric Earrings",
          image: "product-4.webp",
          rating: 4.5,
          reviews: 47,
          price: 42.99,
          badges: ["Limited"]
        },
        {
          id: 9,
          name: "Structured Satchel",
          image: "product-9.webp",
          rating: 5,
          reviews: 64,
          price: 89.99
        }
      ]
    }
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="bi bi-star-fill"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half"></i>);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star"></i>);
    }

    return stars;
  };

  const getBadgeClass = (badge) => {
    if (badge === "New") return "badge-new";
    if (badge.includes("%")) return "badge-sale";
    if (badge === "Hot") return "badge-hot";
    if (badge === "Limited") return "badge-limited";
    return "";
  };

  return (
    <section id="cards" className="cards section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          {productCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="col-lg-4 col-md-6 mb-5 mb-md-0" 
              data-aos="fade-up" 
              data-aos-delay={200 + categoryIndex * 100}
            >
              <div className="product-category">
                <h3 className="category-title">
                  <i className={category.icon}></i> {category.title}
                </h3>
                <div className="product-list">
                  {category.products.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-image">
                        <img 
                          src={`${process.env.PUBLIC_URL}/assets/img/product/${product.image}`} 
                          alt={product.name} 
                          className="img-fluid" 
                        />
                        {product.badges && (
                          <div className="product-badges">
                            {product.badges.map((badge, badgeIndex) => (
                              <span 
                                key={badgeIndex}
                                className={getBadgeClass(badge)}
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="product-info">
                        <h4 className="product-name">{product.name}</h4>
                        <div className="product-rating">
                          {renderStars(product.rating)}
                          <span>({product.reviews})</span>
                        </div>
                        <div className="product-price">
                          <span className="current-price">${product.price}</span>
                          {product.oldPrice && (
                            <span className="old-price">${product.oldPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCards;