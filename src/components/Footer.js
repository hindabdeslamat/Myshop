import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__logo">⚡ TechStore</div>
          <p className="footer__tagline">Your premium destination for laptops & tech hardware. Quality guaranteed.</p>
          <div className="footer__social">
            {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map(s => (
              <a key={s} href="#!" className="footer__social-link" aria-label={s}>
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/products?cat=Gaming">Gaming Laptops</Link></li>
            <li><Link to="/products?cat=Ultrabook">Ultrabooks</Link></li>
            <li><Link to="/products?cat=MacBook">MacBooks</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><a href="#!">Careers</a></li>
            <li><a href="#!">Press</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Support</h4>
          <ul>
            <li><a href="#!">Help Center</a></li>
            <li><a href="#!">Contact Us</a></li>
            <li><a href="#!">Returns</a></li>
            <li><a href="#!">Track Order</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2025 TechStore. All rights reserved.</p>
        <div className="footer__legal">
          <a href="#!">Privacy Policy</a>
          <a href="#!">Terms of Service</a>
          <a href="#!">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
