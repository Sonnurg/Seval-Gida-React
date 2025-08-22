// src/components/PromoCards.js
import React from 'react';
import { Link } from 'react-router-dom';

const PromoCards = ({ className = '' }) => {
  const promoData = [
    {
      id: 1,
      title: "Premium Zeytinyağı",
      subtitle: "Soğuk Sıkım",
      description: "Organik sertifikalı zeytinyağlarımız %25 indirimde",
      discount: "25",
      image: "/api/placeholder/400/300",
      link: "/products/category/zeytinyagi",
      buttonText: "İncele",
      bgColor: "bg-success",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "Doğal Bal Çeşitleri",
      subtitle: "Yeni Sezon",
      description: "Taze hasat doğal ballarımız stoklarda",
      discount: "15",
      image: "/api/placeholder/400/300",
      link: "/products/category/bal",
      buttonText: "Keşfet",
      bgColor: "bg-warning",
      textColor: "text-dark"
    },
    {
      id: 3,
      title: "El Yapımı Reçeller",
      subtitle: "Geleneksel Lezzet",
      description: "Büyükanne reçetleriyle hazırlanmış reçeller",
      discount: "20",
      image: "/api/placeholder/400/300",
      link: "/products/category/recel",
      buttonText: "Dene",
      bgColor: "bg-danger",
      textColor: "text-white"
    }
  ];

  return (
    <section className={`promo-cards py-5 ${className}`}>
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 className="h1 mb-3" data-aos="fade-up">
              Özel Fırsatlar
            </h2>
            <p className="lead text-muted mb-0" data-aos="fade-up" data-aos-delay="100">
              Seçili ürünlerde büyük indirimler
            </p>
          </div>
        </div>

        <div className="row g-4">
          {promoData.map((promo, index) => (
            <div key={promo.id} className="col-lg-4 col-md-6">
              <div 
                className="card border-0 shadow-lg h-100 overflow-hidden position-relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Background Image */}
                <div 
                  className="card-img-overlay p-0"
                  style={{
                    backgroundImage: `url(${promo.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.3
                  }}
                ></div>
                
                {/* Gradient Overlay */}
                <div className={`card-img-overlay p-0 ${promo.bgColor}`} style={{ opacity: 0.9 }}></div>
                
                {/* Content */}
                <div className={`card-img-overlay d-flex flex-column justify-content-between p-4 ${promo.textColor}`}>
                  {/* Discount Badge */}
                  <div className="align-self-end">
                    <span className="badge bg-light text-dark fs-5 px-3 py-2 rounded-pill">
                      %{promo.discount} İndirim
                    </span>
                  </div>
                  
                  {/* Main Content */}
                  <div className="text-center">
                    <h3 className="card-title h2 mb-2">{promo.title}</h3>
                    <p className="card-subtitle mb-3 opacity-75">{promo.subtitle}</p>
                    <p className="card-text mb-4">{promo.description}</p>
                    
                    <Link 
                      to={promo.link}
                      className={`btn ${promo.textColor === 'text-white' ? 'btn-light' : 'btn-dark'} btn-lg px-4 py-2 rounded-pill`}
                    >
                      {promo.buttonText}
                      <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                  </div>
                  
                  {/* Empty div for spacing */}
                  <div></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Promo Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div 
              className="card bg-primary text-white border-0 shadow-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="card-body text-center py-5">
                <div className="row align-items-center">
                  <div className="col-lg-8 mx-auto">
                    <h3 className="card-title h2 mb-3">
                      <i className="bi bi-truck me-3"></i>
                      Ücretsiz Kargo
                    </h3>
                    <p className="card-text lead mb-4">
                      250 TL ve üzeri alışverişlerinizde kargo bizden
                    </p>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                      <Link to="/products" className="btn btn-light btn-lg px-4">
                        Alışverişe Başla
                      </Link>
                      <Link to="/about" className="btn btn-outline-light btn-lg px-4">
                        Hakkımızda
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Row */}
        <div className="row mt-5 g-4">
          <div className="col-md-4">
            <div 
              className="text-center p-4"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="feature-icon mb-3">
                <i className="bi bi-shield-check text-success" style={{ fontSize: '3rem' }}></i>
              </div>
              <h4 className="h5 mb-3">Güvenli Ödeme</h4>
              <p className="text-muted mb-0">
                SSL sertifikası ile korunan güvenli ödeme sistemi
              </p>
            </div>
          </div>
          
          <div className="col-md-4">
            <div 
              className="text-center p-4"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="feature-icon mb-3">
                <i className="bi bi-award text-warning" style={{ fontSize: '3rem' }}></i>
              </div>
              <h4 className="h5 mb-3">Kalite Garantisi</h4>
              <p className="text-muted mb-0">
                Tüm ürünlerimizde kalite ve memnuniyet garantisi
              </p>
            </div>
          </div>
          
          <div className="col-md-4">
            <div 
              className="text-center p-4"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="feature-icon mb-3">
                <i className="bi bi-headset text-info" style={{ fontSize: '3rem' }}></i>
              </div>
              <h4 className="h5 mb-3">7/24 Destek</h4>
              <p className="text-muted mb-0">
                Müşteri hizmetlerimiz her zaman yanınızda
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .promo-cards .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          min-height: 350px;
        }
        
        .promo-cards .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
        }
        
        .feature-icon {
          transition: transform 0.3s ease;
        }
        
        .feature-icon:hover {
          transform: scale(1.1);
        }
        
        .badge {
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .btn {
          transition: all 0.3s ease;
        }
        
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        @media (max-width: 768px) {
          .promo-cards .card {
            min-height: 300px;
          }
          
          .card-title {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PromoCards;