// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  return (
    <header id="header" className="header sticky-top">
      <div className="container-fluid container-xl">
        <div className="d-flex align-items-center justify-content-between py-3">
          
          {/* Logo */}
          <Link to="/" className="logo">
            <img src={`${process.env.PUBLIC_URL}/assets/img/seval-website-logo.webp`} alt="SEVAL Logo" />
          </Link>

          {/* Navigation */}
          <nav id="navmenu" className="navmenu">
            <ul className={`d-flex align-items-center mb-0 navbar-menu ${isMenuOpen ? 'mobile-nav-active' : ''}`}>
              <li>
                <Link 
                  to="/" 
                  className={location.pathname === '/' ? 'active' : ''}
                >
                  ANA SAYFA
                </Link>
              </li>

              <li className={`dropdown ${isDropdownOpen ? 'dropdown-active' : ''}`}>
                <button 
                  className="dropdown-toggle"
                  onClick={toggleDropdown}
                  type="button"
                >
                  <span>KURUMSAL</span> 
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </button>
                <ul className="dropdown-menu">
                  <li><Link to="/about">Hakkımızda</Link></li>
                  <li><Link to="/mission-vision">Misyon ve Vizyon</Link></li>
                  <li><Link to="/kvkk">KVKK</Link></li>
                  <li><Link to="/certificates">Sertifikalarımız</Link></li>
                  <li><Link to="/press">Basında Biz</Link></li>
                </ul>
              </li>

              <li>
                <Link 
                  to="/products"
                  className={location.pathname === '/products' ? 'active' : ''}
                >
                  ÜRÜNLER
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/dealer"
                  className={location.pathname === '/dealer' ? 'active' : ''}
                >
                  BAYİMİZ OL
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/export"
                  className={location.pathname === '/export' ? 'active' : ''}
                >
                  İHRACAT
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/contact"
                  className={location.pathname === '/contact' ? 'active' : ''}
                >
                  İLETİŞİM
                </Link>
              </li>

              {/* Katalog Button */}
              <li>
                <a 
                  href={`${process.env.PUBLIC_URL}/katalog.pdf`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-catalog"
                >
                  KATALOG
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-nav-toggle d-xl-none"
            onClick={toggleMenu}
            type="button"
          >
            <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;