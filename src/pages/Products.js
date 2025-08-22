// src/pages/Products.js - Products Listing Page
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, getCategories } from '../data/products';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [language, setLanguage] = useState('tr'); // 'en' or 'tr'
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {
    const allProducts = getAllProducts();
    const allCategories = getCategories();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    setCategories(allCategories);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.categoryId === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, activeCategory, searchTerm, sortBy]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategoryFilter = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'tr' : 'en');
  };

  const getText = (key) => {
    const texts = {
      title: { tr: 'Ürünler', en: 'Products' },
      home: { tr: 'Ana Sayfa', en: 'Home' },
      products: { tr: 'Ürünler', en: 'Products' },
      search: { tr: 'Ürün ara...', en: 'Search products...' },
      allCategories: { tr: 'Tüm Kategoriler', en: 'All Categories' },
      sortBy: { tr: 'Sırala:', en: 'Sort by:' },
      sortName: { tr: 'İsim', en: 'Name' },
      sortCategory: { tr: 'Kategori', en: 'Category' },
      sortNewest: { tr: 'En Yeni', en: 'Newest' },
      noProducts: { tr: 'Ürün bulunamadı', en: 'No products found' },
      showingResults: { tr: 'sonuç gösteriliyor', en: 'results showing' },
      viewDetails: { tr: 'Detayları Gör', en: 'View Details' },
      page: { tr: 'Sayfa', en: 'Page' },
      of: { tr: '/', en: 'of' },
      previous: { tr: 'Önceki', en: 'Previous' },
      next: { tr: 'Sonraki', en: 'Next' }
    };
    return texts[key][language];
  };

  return (
    <>
      {/* Page Title & Breadcrumb */}
      <div className="page-title">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1>{getText('title')}</h1>
              <nav>
                <ol className="breadcrumbs">
                  <li><Link to="/">{getText('home')}</Link></li>
                  <li>{getText('products')}</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-4 text-end">
              {/* Language Toggle */}
              <div className="language-toggle">
                <button 
                  className={`btn btn-sm ${language === 'tr' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setLanguage('tr')}
                >
                  TR
                </button>
                <button 
                  className={`btn btn-sm ${language === 'en' ? 'btn-primary' : 'btn-outline-primary'} ms-2`}
                  onClick={() => setLanguage('en')}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section className="products-section section">
        <div className="container">
          
          {/* Filters & Search */}
          <div className="row mb-4">
            <div className="col-lg-8">
              <div className="filters-wrapper">
                
                {/* Search */}
                <div className="search-box mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={getText('search')}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>

                {/* Category Filters */}
                <div className="category-filters">
                  <button
                    className={`btn btn-filter ${activeCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                    onClick={() => handleCategoryFilter('all')}
                  >
                    {getText('allCategories')}
                  </button>
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`btn btn-filter ${activeCategory === category.id ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                      onClick={() => handleCategoryFilter(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              {/* Sort Options */}
              <div className="sort-options">
                <label className="form-label">{getText('sortBy')}</label>
                <select 
                  className="form-select" 
                  value={sortBy} 
                  onChange={handleSortChange}
                >
                  <option value="name">{getText('sortName')}</option>
                  <option value="category">{getText('sortCategory')}</option>
                  <option value="newest">{getText('sortNewest')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="results-info mb-3">
            <p className="text-muted">
              {filteredProducts.length} {getText('showingResults')}
              {activeCategory !== 'all' && (
                <span> - {categories.find(cat => cat.id === activeCategory)?.name}</span>
              )}
            </p>
          </div>

          {/* Products Grid */}
          {currentProducts.length > 0 ? (
            <div className="products-grid">
              <div className="row g-4">
                {currentProducts.map(product => (
                  <div key={product.id} className="col-xl-3 col-lg-4 col-md-6">
                    <div className="product-card">
                      <div className="product-image">
                        <Link to={`/product/${product.slug}`}>
                          <img 
                            src={`${process.env.PUBLIC_URL}/assets/img/${product.images[0]}`}
                            alt={product.name}
                            className="img-fluid"
                          />
                        </Link>
                      </div>
                      <div className="product-content">
                        <div className="product-category">
                          <Link to={`/products/category/${product.categoryId}`}>
                            {product.category}
                          </Link>
                        </div>
                        <h5 className="product-title">
                          <Link to={`/product/${product.slug}`}>
                            {product.name}
                          </Link>
                        </h5>
                        <p className="product-description">
                          {product.description.substring(0, 100)}...
                        </p>
                        <div className="product-actions">
                          <Link 
                            to={`/product/${product.slug}`}
                            className="btn btn-primary btn-sm"
                          >
                            {getText('viewDetails')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-products text-center py-5">
              <h4>{getText('noProducts')}</h4>
              <p className="text-muted">Try adjusting your search or filter criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-wrapper mt-5">
              <nav>
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      {getText('previous')}
                    </button>
                  </li>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      {getText('next')}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;