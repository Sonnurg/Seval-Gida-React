import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Displays information for a single product in card form.
 * Accepts a `product` object and optional `showQuickView` and `layout` props.
 */
const ProductCard = ({ product, showQuickView = false, layout = 'grid' }) => {
  if (!product) return null;

  const imageSrc = product.image || (product.images && product.images[0]);

  return (
    <div className={`product-card ${layout}`}>
      <div className="product-image position-relative">
        <Link to={`/product/${product.slug}`} className="d-block">
          <img
            src={imageSrc}
            alt={product.name}
            className="img-fluid rounded"
          />
        </Link>

        {/* Product badges */}
        <div className="position-absolute top-0 start-0 p-2">
          {product.featured && (
            <span className="badge bg-warning text-dark me-1">Öne Çıkan</span>
          )}
          {product.bestseller && (
            <span className="badge bg-success me-1">Çok Satan</span>
          )}
          {product.new && (
            <span className="badge bg-primary">Yeni</span>
          )}
        </div>

        {/* Quick view button */}
        {showQuickView && (
          <Link
            to={`/product/${product.slug}`}
            className="btn btn-sm btn-primary position-absolute top-50 start-50 translate-middle"
          >
            İncele
          </Link>
        )}
      </div>

      <div className="product-info text-center mt-3">
        <h5 className="product-title mb-1">
          <Link to={`/product/${product.slug}`} className="text-decoration-none text-dark">
            {product.name}
          </Link>
        </h5>
        {product.category && (
          <p className="text-muted small mb-2">{product.category}</p>
        )}
        <div className="product-price">
          {product.oldPrice && (
            <span className="text-muted text-decoration-line-through me-2">
              {product.oldPrice}₺
            </span>
          )}
          {product.price !== undefined && (
            <span className="fw-bold">{product.price}₺</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

