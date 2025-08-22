// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="footer" className="footer dark-background">
      <div className="footer-main">
        <div className="container">
          <div className="row gy-4 align-items-center">

            {/* Company Info */}
            <div className="col-lg-6 col-md-12 text-center text-lg-start">
              <Link to="/" className="logo">
                <span className="sitename">SEVAL GIDA</span>
              </Link>
              <p>
                Since 1984, Seval Gıda has been delivering Halal-certified food products worldwide.
                A trusted partner for international distributors and the HORECA sector.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-lg-3 col-md-6 text-center text-lg-start">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/export">Export</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-lg-3 col-md-6 text-center text-lg-start">
              <h4>Contact</h4>
              <div className="footer-contact">
                <p><i className="bi bi-geo-alt"></i> Istanbul, Turkey</p>
                <p><i className="bi bi-telephone"></i> +90 (212) 609 34 34</p>
                <p><i className="bi bi-envelope"></i> export@sevalgida.com.tr</p>
              </div>
              <div className="social-icons mt-3">
                <a 
                  href="https://wa.me/905493101250" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                > 
                  <i className="bi bi-whatsapp"></i>
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61574852014123"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a 
                  href="https://www.instagram.com/sevalgidainc/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a 
                  href="https://www.youtube.com/channel/UCj59KBztadxgPH_Q3zWhvTQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom text-center">
        <div className="container">
          <p>© 2025 <strong>SEVAL GIDA</strong>. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;