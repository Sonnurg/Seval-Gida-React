// src/pages/Products.js
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCards';
import { products, categories, getProductsByCategory, searchProducts, getCategoryBySlug } from '../data/products';

const Products = () => {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const productsPerPage = 12;

  // Current category info
  const currentCategory = categorySlug ? getCategoryBySlug(categorySlug) : null;

  // Filter and sort products
  const processedProducts = useMemo(() => {
    let result = [...products];

    // Filter by category if provided
    if (categorySlug) {
      result = getProductsByCategory(categorySlug);
    }

    // Filter by search query
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }

    // Filter by selected category (from filter dropdown)
    if (selectedCategory && !categorySlug) {
      result = result.filter(product => product.categorySlug === selectedCategory);
    }

    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort products
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = (b.rating || 0) - (a.rating || 0);
          break;
        case 'newest':
          comparison = b.id - a.id;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [categorySlug, searchQuery, selectedCategory, priceRange, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(processedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = processedProducts.slice(startIndex, startIndex + productsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [categorySlug, searchQuery, selectedCategory, priceRange, sortBy, sortOrder]);

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [categorySlug, searchQuery]);

  // Get price range from all products
  const maxPrice = Math.max(...products.map(p => p.price));
  const minPrice = Math.min(...products.map(p => p.price));

  const handleSortChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split('-');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: minPrice, max: maxPrice });
    setSortBy('name');
    setSortOrder('asc');
  };

  const getPageTitle = () => {
    if (searchQuery) return `"${searchQuery}" Arama Sonuçları`;
    if (currentCategory) return currentCategory.name;
    return 'Tüm Ürünler';
  };

  const getPageDescription = () => {
    if (searchQuery) return `${searchQuery} için arama sonuçları`;
    if (currentCategory) return currentCategory.description;
    return 'Seval Gıda\'nın kaliteli ürün koleksiyonu';
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Yükleniyor...</span>
            </div>
            <p className="mt-3">Ürünler yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{getPageTitle()} - Seval Gıda</title>
        <meta name="description" content={getPageDescription()} />
        {currentCategory && (
          <meta property="og:title" content={`${currentCategory.name} - Seval Gıda`} />
        )}
      </Helmet>

      <div className="container py-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Ana Sayfa</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/products">Ürünler</Link>
            </li>
            {currentCategory && (
              <li className="breadcrumb-item active" aria-current="page">
                {currentCategory.name}
              </li>
            )}
            {searchQuery && (
              <li className="breadcrumb-item active" aria-current="page">
                Arama: "{searchQuery}"
              </li>
            )}
          </ol>
        </nav>

        {/* Page Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h1 className="h2 mb-2">{getPageTitle()}</h1>
                <p className="text-muted mb-0">{getPageDescription()}</p>
              </div>
              <div className="d-flex gap-2 mt-2 mt-md-0">
                <span className="badge bg-light text-dark fs-6">
                  {processedProducts.length} ürün bulundu
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Filters Sidebar */}
          <div className="col-lg-3 mb-4">
            <div className="sticky-top" style={{ top: '20px' }}>
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Filtreler</h5>
                  <button
                    className="btn btn-link btn-sm p-0"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <i className={`bi bi-chevron-${showFilters ? 'up' : 'down'}`}></i>
                  </button>
                </div>
                <div className={`card-body ${showFilters ? '' : 'd-none d-lg-block'}`}>
                  {/* Sort Options */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Sıralama</label>
                    <select
                      className="form-select"
                      value={`${sortBy}-${sortOrder}`}
                      onChange={handleSortChange}
                    >
                      <option value="name-asc">İsim (A-Z)</option>
                      <option value="name-desc">İsim (Z-A)</option>
                      <option value="price-asc">Fiyat (Düşük-Yüksek)</option>
                      <option value="price-desc">Fiyat (Yüksek-Düşük)</option>
                      <option value="rating-desc">En Yüksek Puanlı</option>
                      <option value="newest-desc">En Yeni</option>
                    </select>
                  </div>

                  {/* Category Filter (only show if not in category page) */}
                  {!categorySlug && (
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Kategori</label>
                      <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="">Tüm Kategoriler</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.slug}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Price Range */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Fiyat Aralığı</label>
                    <div className="row g-2">
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          placeholder="Min"
                          name="min"
                          value={priceRange.min}
                          onChange={handlePriceRangeChange}
                          min={minPrice}
                          max={maxPrice}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          placeholder="Max"
                          name="max"
                          value={priceRange.max}
                          onChange={handlePriceRangeChange}
                          min={minPrice}
                          max={maxPrice}
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <small className="text-muted">
                        {priceRange.min} ₺ - {priceRange.max} ₺
                      </small>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={clearFilters}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Filtreleri Temizle
                  </button>
                </div>
              </div>

              {/* Categories List (only show if not in category page) */}
              {!categorySlug && (
                <div className="card mt-3">
                  <div className="card-header">
                    <h5 className="mb-0">Kategoriler</h5>
                  </div>
                  <div className="list-group list-group-flush">
                    <Link
                      to="/products"
                      className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${!selectedCategory ? 'active' : ''}`}
                    >
                      Tüm Ürünler
                      <span className="badge bg-primary rounded-pill">{products.length}</span>
                    </Link>
                    {categories.map(category => {
                      const categoryProducts = getProductsByCategory(category.slug);
                      return (
                        <Link
                          key={category.id}
                          to={`/products/category/${category.slug}`}
                          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                        >
                          {category.name}
                          <span className="badge bg-secondary rounded-pill">
                            {categoryProducts.length}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-lg-9">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-search text-muted" style={{ fontSize: '3rem' }}></i>
                <h3 className="mt-3">Ürün bulunamadı</h3>
                <p className="text-muted">
                  Arama kriterlerinize uygun ürün bulunamadı. Filtreleri değiştirmeyi deneyin.
                </p>
                <button className="btn btn-primary" onClick={clearFilters}>
                  Filtreleri Temizle
                </button>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div className="row g-4">
                  {paginatedProducts.map(product => (
                    <div key={product.id} className="col-sm-6 col-xl-4">
                      <ProductCard product={product} showQuickView={true} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-5">
                    <nav aria-label="Ürün sayfaları">
                      <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <i className="bi bi-chevron-left"></i>
                          </button>
                        </li>
                        
                        {[...Array(totalPages)].map((_, index) => {
                          const page = index + 1;
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 2 && page <= currentPage + 2)
                          ) {
                            return (
                              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                <button
                                  className="page-link"
                                  onClick={() => setCurrentPage(page)}
                                >
                                  {page}
                                </button>
                              </li>
                            );
                          }
                          if (page === currentPage - 3 || page === currentPage + 3) {
                            return (
                              <li key={page} className="page-item disabled">
                                <span className="page-link">...</span>
                              </li>
                            );
                          }
                          return null;
                        })}
                        
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            <i className="bi bi-chevron-right"></i>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;