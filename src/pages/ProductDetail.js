// src/pages/ProductDetail.js - Complete Product Detail Page
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [language, setLanguage] = useState('en'); // 'en' or 'tr'
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const productData = getProductBySlug(slug);
    if (productData) {
      setProduct(productData);
      setActiveImage(0);
      
      // Get related products from same category
      const related = getProductsByCategory(productData.categoryId)
        .filter(p => p.id !== productData.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleImageChange = (index) => {
    setActiveImage(index);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'tr' : 'en');
  };

  const getText = (key) => {
    const texts = {
      home: { en: 'Home', tr: 'Ana Sayfa' },
      products: { en: 'Products', tr: 'Ürünler' },
      overview: { en: 'Overview', tr: 'Genel Bakış' },
      specifications: { en: 'Specifications', tr: 'Özellikler' },
      packaging: { en: 'Packaging', tr: 'Paketleme' },
      certifications: { en: 'Certifications', tr: 'Sertifikalar' },
      description: { en: 'Description', tr: 'Açıklama' },
      technicalSpecs: { en: 'Technical Specifications', tr: 'Teknik Özellikler' },
      packagingInfo: { en: 'Packaging Information', tr: 'Paketleme Bilgileri' },
      shelfLife: { en: 'Shelf Life', tr: 'Raf Ömrü' },
      minOrder: { en: 'Minimum Order', tr: 'Minimum Sipariş' },
      storage: { en: 'Storage Conditions', tr: 'Saklama Koşulları' },
      origin: { en: 'Origin', tr: 'Menşei' },
      relatedProducts: { en: 'Related Products', tr: 'İlgili Ürünler' },
      inquireNow: { en: 'Inquire Now', tr: 'Hemen Sorgula' },
      addToWishlist: { en: 'Add to Wishlist', tr: 'İstek Listesine Ekle' },
      shareProduct: { en: 'Share Product', tr: 'Ürünü Paylaş' },
      downloadCatalog: { en: 'Download Catalog', tr: 'Katalog İndir' },
      quantity: { en: 'Quantity', tr: 'Miktar' },
      contactForPricing: { en: 'Contact for Pricing', tr: 'Fiyat İçin İletişim' }
    };
    return texts[key]?.[language] || texts[key]?.en || key;
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="page-title">
        <div className="container">
          <nav>
            <ol className="breadcrumbs">
              <li><Link to="/">{getText('home')}</Link></li>
              <li><Link to="/products">{getText('products')}</Link></li>
              <li><Link to={`/products/category/${product.categoryId}`}>{product.category}</Link></li>
              <li>{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="product-details section">
        <div className="container">
          <div className="row">
            
            {/* Product Images */}
            <div className="col-lg-6">
              <div className="product-gallery">
                <div className="main-image">
                  <img 
                    src={`${process.env.PUBLIC_URL}/assets/img/${product.images[activeImage]}`}
                    alt={product.name}
                    className="img-fluid"
                  />
                  {/* Product Badges */}
                  <div className="product-badges">
                    {product.new && <span className="product-badge badge-new">New</span>}
                    {product.bestseller && <span className="product-badge badge-bestseller">Best Seller</span>}
                    {product.featured && <span className="product-badge badge-featured">Featured</span>}
                  </div>
                </div>
                {product.images.length > 1 && (
                  <div className="thumbnail-images">
                    <div className="row g-2">
                      {product.images.map((image, index) => (
                        <div key={index} className="col-3">
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/img/${image}`}
                            alt={`${product.name} ${index + 1}`}
                            className={`img-fluid thumbnail ${activeImage === index ? 'active' : ''}`}
                            onClick={() => handleImageChange(index)}
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="col-lg-6">
              <div className="product-info">
                
                {/* Language Toggle */}
                <div className="language-toggle mb-3">
                  <button 
                    className={`btn btn-sm ${language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setLanguage('en')}
                  >
                    EN
                  </button>
                  <button 
                    className={`btn btn-sm ${language === 'tr' ? 'btn-primary' : 'btn-outline-primary'} ms-2`}
                    onClick={() => setLanguage('tr')}
                  >
                    TR
                  </button>
                </div>

                {/* Product Title & Category */}
                <div className="product-header">
                  <span className="product-category">{product.category}</span>
                  <h1 className="product-title">{product.name}</h1>
                  <p className="product-description">{product.shortDescription}</p>
                </div>

                {/* Quick Specs */}
                <div className="quick-specs mb-4">
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="spec-item">
                        <i className="bi bi-box"></i>
                        <div>
                          <span className="spec-label">Packaging</span>
                          <span className="spec-value">{product.packaging}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="spec-item">
                        <i className="bi bi-clock"></i>
                        <div>
                          <span className="spec-label">{getText('shelfLife')}</span>
                          <span className="spec-value">{product.shelfLife}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="spec-item">
                        <i className="bi bi-cart3"></i>
                        <div>
                          <span className="spec-label">{getText('minOrder')}</span>
                          <span className="spec-value">{product.minOrder}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="spec-item">
                        <i className="bi bi-geo-alt"></i>
                        <div>
                          <span className="spec-label">{getText('origin')}</span>
                          <span className="spec-value">{product.origin || 'Turkey'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="product-certifications mb-4">
                  <h6>Certifications</h6>
                  <div className="certifications-list">
                    {product.certifications.map((cert, index) => (
                      <span key={index} className="certification-badge">{cert}</span>
                    ))}
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="product-actions">
                  <div className="quantity-section mb-3">
                    <label className="form-label">{getText('quantity')}</label>
                    <div className="quantity-input">
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      />
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button className="btn btn-primary btn-lg me-3">
                      <i className="bi bi-envelope"></i>
                      {getText('inquireNow')}
                    </button>
                    <button className="btn btn-outline-secondary">
                      <i className="bi bi-heart"></i>
                      {getText('addToWishlist')}
                    </button>
                  </div>

                  <div className="secondary-actions mt-3">
                    <button className="btn btn-link p-0 me-3">
                      <i className="bi bi-share"></i>
                      {getText('shareProduct')}
                    </button>
                    <button className="btn btn-link p-0">
                      <i className="bi bi-download"></i>
                      {getText('downloadCatalog')}
                    </button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="contact-info mt-4 p-3 bg-light rounded">
                  <h6>{getText('contactForPricing')}</h6>
                  <div className="contact-details">
                    <p className="mb-1"><i className="bi bi-telephone"></i> +90 XXX XXX XX XX</p>
                    <p className="mb-1"><i className="bi bi-envelope"></i> info@company.com</p>
                    <p className="mb-0"><i className="bi bi-whatsapp"></i> WhatsApp Inquiry</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="product-tabs">
                
                {/* Tab Navigation */}
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                      onClick={() => setActiveTab('overview')}
                    >
                      {getText('overview')}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'specifications' ? 'active' : ''}`}
                      onClick={() => setActiveTab('specifications')}
                    >
                      {getText('specifications')}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'packaging' ? 'active' : ''}`}
                      onClick={() => setActiveTab('packaging')}
                    >
                      {getText('packaging')}
                    </button>
                  </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content">
                  
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="tab-pane active">
                      <div className="row">
                        <div className="col-lg-8">
                          <h4>{getText('description')}</h4>
                          <p>{product.description}</p>
                          
                          <h5>Key Features</h5>
                          <ul>
                            <li>High quality standard</li>
                            <li>International certifications</li>
                            <li>Competitive pricing</li>
                            <li>Reliable supply chain</li>
                          </ul>
                        </div>
                        <div className="col-lg-4">
                          <div className="overview-specs">
                            <h5>Quick Info</h5>
                            <div className="spec-table">
                              <div className="spec-row">
                                <span>Category:</span>
                                <span>{product.category}</span>
                              </div>
                              <div className="spec-row">
                                <span>Weight:</span>
                                <span>{product.weight}</span>
                              </div>
                              <div className="spec-row">
                                <span>Packaging:</span>
                                <span>{product.packaging}</span>
                              </div>
                              <div className="spec-row">
                                <span>Min Order:</span>
                                <span>{product.minOrder}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Specifications Tab */}
                  {activeTab === 'specifications' && (
                    <div className="tab-pane active">
                      <h4>{getText('technicalSpecs')}</h4>
                      <div className="specifications-table">
                        <table className="table table-striped">
                          <tbody>
                            <tr>
                              <td>Product Name</td>
                              <td>{product.name}</td>
                            </tr>
                            <tr>
                              <td>Category</td>
                              <td>{product.category}</td>
                            </tr>
                            <tr>
                              <td>Weight</td>
                              <td>{product.weight}</td>
                            </tr>
                            <tr>
                              <td>Shelf Life</td>
                              <td>{product.shelfLife}</td>
                            </tr>
                            <tr>
                              <td>Storage</td>
                              <td>{product.storage || 'Cool, dry place'}</td>
                            </tr>
                            <tr>
                              <td>Origin</td>
                              <td>{product.origin || 'Turkey'}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Packaging Tab */}
                  {activeTab === 'packaging' && (
                    <div className="tab-pane active">
                      <h4>{getText('packagingInfo')}</h4>
                      <div className="row">
                        <div className="col-md-6">
                          <h5>Package Details</h5>
                          <ul>
                            <li>Package Type: {product.packaging}</li>
                            <li>Weight: {product.weight}</li>
                            <li>Minimum Order: {product.minOrder}</li>
                            <li>Shelf Life: {product.shelfLife}</li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <h5>Storage Requirements</h5>
                          <ul>
                            <li>Temperature: Room temperature</li>
                            <li>Humidity: Low humidity</li>
                            <li>Light: Away from direct sunlight</li>
                            <li>Handling: Handle with care</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products section bg-light">
          <div className="container">
            <h3 className="section-title text-center mb-5">{getText('relatedProducts')}</h3>
            <div className="row g-4">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="col-lg-3 col-md-6">
                  <ProductCard product={relatedProduct} layout="grid" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetail;