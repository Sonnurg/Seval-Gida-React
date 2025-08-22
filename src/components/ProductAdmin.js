// src/components/ProductAdmin.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    inStock: true
  });

  // Mock products data
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: "Premium Zeytinyağı",
        category: "Zeytinyağı",
        price: 299.99,
        description: "Soğuk sıkım organik zeytinyağı",
        image: "/api/placeholder/150/150",
        inStock: true
      },
      {
        id: 2,
        name: "Organik Bal",
        category: "Bal",
        price: 199.99,
        description: "Doğal çiçek balı",
        image: "/api/placeholder/150/150",
        inStock: true
      }
    ];
    setProducts(mockProducts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(product => 
        product.id === editingProduct.id 
          ? { ...formData, id: editingProduct.id }
          : product
      ));
      setEditingProduct(null);
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: Date.now(),
        price: parseFloat(formData.price)
      };
      setProducts(prev => [...prev, newProduct]);
    }
    
    // Reset form
    setFormData({
      name: '',
      category: '',
      price: '',
      description: '',
      image: '',
      inStock: true
    });
    setShowAddForm(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      image: product.image,
      inStock: product.inStock
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      setProducts(prev => prev.filter(product => product.id !== id));
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      description: '',
      image: '',
      inStock: true
    });
  };

  return (
    <>
      <Helmet>
        <title>Ürün Yönetimi - Admin Panel</title>
        <meta name="description" content="Ürün ekleme, düzenleme ve silme işlemleri" />
      </Helmet>

      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1>Ürün Yönetimi</h1>
              <button
                className="btn btn-primary"
                onClick={() => setShowAddForm(true)}
                disabled={showAddForm}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Yeni Ürün Ekle
              </button>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">
                    {editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
                  </h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">Ürün Adı *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="category" className="form-label">Kategori *</label>
                        <select
                          className="form-select"
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Kategori Seçin</option>
                          <option value="Zeytinyağı">Zeytinyağı</option>
                          <option value="Bal">Bal</option>
                          <option value="Reçel">Reçel</option>
                          <option value="Turşu">Turşu</option>
                          <option value="Konserve">Konserve</option>
                        </select>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="price" className="form-label">Fiyat (₺) *</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="image" className="form-label">Resim URL</label>
                        <input
                          type="url"
                          className="form-control"
                          id="image"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Açıklama *</label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inStock"
                          name="inStock"
                          checked={formData.inStock}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="inStock">
                          Stokta var
                        </label>
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-success">
                        <i className="bi bi-check-lg me-2"></i>
                        {editingProduct ? 'Güncelle' : 'Ekle'}
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                        <i className="bi bi-x-lg me-2"></i>
                        İptal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Ürün Listesi ({products.length})</h5>
              </div>
              <div className="card-body">
                {products.length === 0 ? (
                  <div className="text-center py-4">
                    <i className="bi bi-box text-muted" style={{fontSize: '3rem'}}></i>
                    <p className="text-muted mt-2">Henüz ürün bulunmamaktadır.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Resim</th>
                          <th>Ürün Adı</th>
                          <th>Kategori</th>
                          <th>Fiyat</th>
                          <th>Durum</th>
                          <th>İşlemler</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id}>
                            <td>
                              <img
                                src={product.image || '/api/placeholder/50/50'}
                                alt={product.name}
                                className="rounded"
                                style={{width: '50px', height: '50px', objectFit: 'cover'}}
                              />
                            </td>
                            <td>
                              <div>
                                <div className="fw-semibold">{product.name}</div>
                                <small className="text-muted">{product.description}</small>
                              </div>
                            </td>
                            <td>
                              <span className="badge bg-secondary">{product.category}</span>
                            </td>
                            <td>
                              <strong>{product.price} ₺</strong>
                            </td>
                            <td>
                              {product.inStock ? (
                                <span className="badge bg-success">Stokta</span>
                              ) : (
                                <span className="badge bg-danger">Stok Yok</span>
                              )}
                            </td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={() => handleEdit(product)}
                                  title="Düzenle"
                                >
                                  <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() => handleDelete(product.id)}
                                  title="Sil"
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAdmin;