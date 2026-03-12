import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  function handleAddToCart(e) {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const badgeColors = {
    'Best Seller': { bg: '#F59E0B', color: '#fff' },
    'New': { bg: '#10B981', color: '#fff' },
    'Hot Deal': { bg: '#EF4444', color: '#fff' },
    'Premium': { bg: '#8B5CF6', color: '#fff' },
    'Sale': { bg: '#EC4899', color: '#fff' },
  };
  const badge = badgeColors[product.badge] || { bg: '#6B7280', color: '#fff' };

  return (
    <div className="product-card">
      <div className="product-card__image-wrap">
        <span
          className="product-card__badge"
          style={{ background: badge.bg, color: badge.color }}
        >
          {product.badge}
        </span>
        {discount > 0 && (
          <span className="product-card__discount">-{discount}%</span>
        )}
        <Link to={`/product/${product.id}`}>
          <img
            src={`/pictures/${product.thumbnail}`}
            alt={product.title}
            className="product-card__img"
            loading="lazy"
          />
        </Link>
        <div className="product-card__hover-actions">
          <Link to={`/product/${product.id}`} className="product-card__quick-view">
            Quick View
          </Link>
        </div>
      </div>

      <div className="product-card__body">
        <span className="product-card__brand">{product.brand}</span>
        <Link to={`/product/${product.id}`} className="product-card__title-link">
          <h3 className="product-card__title">{product.shortTitle || product.title}</h3>
        </Link>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="product-card__price-row">
          <span className="product-card__price">{product.price.toLocaleString()} DH</span>
          {product.originalPrice > product.price && (
            <span className="product-card__original">{product.originalPrice.toLocaleString()} DH</span>
          )}
        </div>
        <button
          className={`product-card__btn ${added ? 'product-card__btn--added' : ''}`}
          onClick={handleAddToCart}
        >
          {added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
