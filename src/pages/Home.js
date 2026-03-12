import React from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

const categoryCards = [
  { id: 'Gaming', label: 'Gaming', icon: '🎮', desc: 'High-performance rigs', color: '#EF4444' },
  { id: 'Ultrabook', label: 'Ultrabook', icon: '⚡', desc: 'Slim & powerful', color: '#3B82F6' },
  { id: 'MacBook', label: 'MacBook', icon: '🍎', desc: 'Apple ecosystem', color: '#6B7280' },
  { id: 'Chromebook', label: 'Chromebook', icon: '🌐', desc: 'Fast & simple', color: '#10B981' },
];

export default function Home() {
  const featured = products.slice(0, 4);
  const bestSeller = products.find(p => p.badge === 'Best Seller');

  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__content">
          <span className="hero__tag">New Arrivals 2025</span>
          <h1 className="hero__title">
            Find Your
            <span className="hero__title-accent"> Perfect</span>
            <br />Laptop
          </h1>
          <p className="hero__subtitle">
            Premium laptops for gaming, work, and creativity. Up to 20% off on selected models.
          </p>
          <div className="hero__cta">
            <Link to="/products" className="btn-primary btn-lg">Shop Now →</Link>
            <Link to="/products?cat=Gaming" className="btn-ghost btn-lg">Gaming Deals</Link>
          </div>
          <div className="hero__stats">
            <div><strong>500+</strong><span>Products</span></div>
            <div><strong>10K+</strong><span>Customers</span></div>
            <div><strong>4.8★</strong><span>Rating</span></div>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__glow" />
          <img
            src="/pictures/pc3.jpg"
            alt="Featured Laptop"
            className="hero__img"
          />
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div className="trust-bar">
        {[
          { icon: '🚚', label: 'Free Shipping', sub: 'On orders over 1000 DH' },
          { icon: '🔒', label: 'Secure Payment', sub: '100% protected' },
          { icon: '↩️', label: '30-Day Returns', sub: 'Hassle-free returns' },
          { icon: '💬', label: '24/7 Support', sub: 'Always here to help' },
        ].map(({ icon, label, sub }) => (
          <div key={label} className="trust-bar__item">
            <span className="trust-bar__icon">{icon}</span>
            <div>
              <strong>{label}</strong>
              <p>{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Categories ── */}
      <section className="section">
        <div className="section__header">
          <h2>Shop by Category</h2>
          <Link to="/products" className="section__link">View all →</Link>
        </div>
        <div className="categories-grid">
          {categoryCards.map(cat => (
            <Link
              key={cat.id}
              to={`/products?cat=${cat.id}`}
              className="category-card"
              style={{ '--cat-color': cat.color }}
            >
              <span className="category-card__icon">{cat.icon}</span>
              <strong>{cat.label}</strong>
              <span>{cat.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="section section--gray">
        <div className="section__header">
          <h2>Featured Products</h2>
          <Link to="/products" className="section__link">See all →</Link>
        </div>
        <div className="products-grid">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── Promo Banner ── */}
      {bestSeller && (
        <section className="promo-banner">
          <div className="promo-banner__content">
            <span className="promo-banner__tag">⭐ Best Seller</span>
            <h2>{bestSeller.title}</h2>
            <p>{bestSeller.description.slice(0, 100)}...</p>
            <div className="promo-banner__price">
              <span className="promo-banner__current">{bestSeller.price.toLocaleString()} DH</span>
              <span className="promo-banner__original">{bestSeller.originalPrice.toLocaleString()} DH</span>
            </div>
            <Link to={`/product/${bestSeller.id}`} className="btn-primary btn-lg">
              Shop Now
            </Link>
          </div>
          <div className="promo-banner__image">
            <img src={`/pictures/${bestSeller.thumbnail}`} alt={bestSeller.title} />
          </div>
        </section>
      )}

      {/* ── Newsletter ── */}
      <section className="newsletter">
        <h2>Stay in the Loop</h2>
        <p>Get exclusive deals, new arrivals, and tech news delivered to your inbox.</p>
        <div className="newsletter__form">
          <input type="email" placeholder="Enter your email address..." className="newsletter__input" />
          <button className="btn-primary">Subscribe</button>
        </div>
      </section>
    </div>
  );
}
