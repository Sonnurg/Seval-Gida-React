import React, { useState, useEffect } from 'react';

const CallToAction = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025/12/31').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (difference < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      image: "product-5.webp",
      originalPrice: 129,
      salePrice: 71,
      discount: 45,
      rating: 5,
      reviews: 324
    },
    {
      id: 2,
      name: "Smart Fitness Tracker",
      image: "product-7.webp",
      originalPrice: 89,
      salePrice: 36,
      discount: 60,
      rating: 4.5,
      reviews: 198
    },
    {
      id: 3,
      name: "Luxury Travel Backpack",
      image: "product-11.webp",
      originalPrice: 159,
      salePrice: 103,
      discount: 35,
      rating: 5,
      reviews: 267
    },
    {
      id: 4,
      name: "Artisan Coffee Mug Set",
      image: "product-1.webp",
      originalPrice: 75,
      salePrice: 34,
      discount: 55,
      rating: 4,
      reviews: 142
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
    <section id="call-to-action" className="call-to-action section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="main-content text-center" data-aos="zoom-in" data-aos-delay="200">
              <div className="offer-badge" data-aos="fade-down" data-aos-delay="250">
                <span className="limited-time">Limited Time</span>
                <span className="offer-text">50% OFF</span>
              </div>

              <h2 data-aos="fade-up" data-aos-delay="300">Exclusive Flash Sale</h2>

              <p className="subtitle" data-aos="fade-up" data-aos-delay="350">
                Don't miss out on our biggest sale of the year. Premium quality products at unbeatable prices for the next 48 hours only.
              </p>

              <div className="countdown-wrapper" data-aos="fade-up" data-aos-delay="400">
                <div className="countdown d-flex justify-content-center">
                  <div>
                    <h3 className="count-days">{timeLeft.days}</h3>
                    <h4>Days</h4>
                  </div>
                  <div>
                    <h3 className="count-hours">{timeLeft.hours}</h3>
                    <h4>Hours</h4>
                  </div>
                  <div>
                    <h3 className="count-minutes">{timeLeft.minutes}</h3>
                    <h4>Minutes</h4>
                  </div>
                  <div>
                    <h3 className="count-seconds">{timeLeft.seconds}</h3>
                    <h4>Seconds</h4>
                  </div>
                </div>
              </div>

              <div className="action-buttons" data-aos="fade-up" data-aos-delay="450">
                <a href="#" className="btn-shop-now">Shop Now</a>
                <a href="#" className="btn-view-deals">View All Deals</a>
              </div>
            </div>
          </div>
        </div>

        <div className="row featured-products-row" data-aos="fade-up" data-aos-delay="500">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay={100 + index * 50}>
              <div className="product-showcase">
                <div className="product-image">
                  <img 
                    src={`${process.env.PUBLIC_URL}/assets/img/product/${product.image}`} 
                    alt={product.name} 
                    className="img-fluid" 
                  />
                  <div className="discount-badge">-{product.discount}%</div>
                </div>
                <div className="product-details">
                  <h6>{product.name}</h6>
                  <div className="price-section">
                    <span className="original-price">${product.originalPrice}</span>
                    <span className="sale-price">${product.salePrice}</span>
                  </div>
                  <div className="rating-stars">
                    {renderStars(product.rating)}
                    <span className="rating-count">({product.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
                