import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="not-found">
        <span>😕</span>
        <h2>Product Not Found</h2>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  function handleAdd() {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="product-detail">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{product.shortTitle}</span>
      </nav>

      <div className="product-detail__layout">
        {/* Gallery */}
        <div className="product-detail__gallery">
          <div className="product-detail__main-img-wrap">
            {discount > 0 && (
              <span className="product-detail__discount">-{discount}%</span>
            )}
            <img
              src={`/pictures/${product.images[activeImg]}`}
              alt={product.title}
              className="product-detail__main-img"
            />
          </div>
          <div className="product-detail__thumbs">
            {product.images.map((img, i) => (
              <button
                key={i}
                className={`product-detail__thumb ${i === activeImg ? 'product-detail__thumb--active' : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={`/pictures/${img}`} alt={`View ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="product-detail__info">
          <span className="product-detail__brand">{product.brand}</span>
          <h1 className="product-detail__title">{product.title}</h1>

          <div className="product-detail__rating">
            <StarRating rating={product.rating} count={product.reviewCount} size={18} />
            <span className="product-detail__rating-score">{product.rating}</span>
          </div>

          <div className="product-detail__price-block">
            <span className="product-detail__price">{product.price.toLocaleString()} DH</span>
            {product.originalPrice > product.price && (
              <span className="product-detail__original">{product.originalPrice.toLocaleString()} DH</span>
            )}
            {discount > 0 && (
              <span className="product-detail__save">Save {discount}%</span>
            )}
          </div>

          <p className="product-detail__desc">{product.description}</p>

          <div className="product-detail__qty-row">
            <div className="product-detail__qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button
              className={`btn-primary btn-lg product-detail__add ${added ? 'btn-success' : ''}`}
              onClick={handleAdd}
            >
              {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
            </button>
          </div>

          <div className="product-detail__trust">
            <span>🚚 Free shipping over 1000 DH</span>
            <span>↩️ 30-day returns</span>
            <span>🔒 Secure checkout</span>
          </div>

          {/* Specs */}
          <div className="product-detail__specs">
            <h3>Specifications</h3>
            <table className="specs-table">
              <tbody>
                {Object.entries(product.specs).map(([key, val]) => (
                  <tr key={key}>
                    <td className="specs-table__key">{key}</td>
                    <td className="specs-table__val">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section">
          <div className="section__header">
            <h2>Related Products</h2>
          </div>
          <div className="products-grid products-grid--3">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
