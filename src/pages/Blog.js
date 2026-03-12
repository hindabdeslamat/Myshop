import React from 'react';
import { Link } from 'react-router-dom';

const posts = [
  { id: 1, title: 'Gaming vs Ultrabook: Which Laptop is Right for You?', date: 'March 8, 2025', tag: 'Guide', excerpt: 'Struggling to choose between a gaming powerhouse and a slim ultrabook? We break down the key differences to help you decide.' },
  { id: 2, title: 'Top 5 Laptops for Students in 2025', date: 'February 20, 2025', tag: 'Top Picks', excerpt: 'Going back to school? These laptops deliver the perfect balance of performance, battery life, and price for students.' },
  { id: 3, title: 'Understanding RAM & Storage: A Buyer\'s Guide', date: 'January 15, 2025', tag: 'Education', excerpt: 'Not sure how much RAM you need? SSD vs HDD? This plain-English guide explains everything you need to know before buying.' },
];

export default function Blog() {
  return (
    <div className="blog">
      <div className="blog__hero">
        <h1>TechStore Blog</h1>
        <p>Buying guides, tech tips, and the latest in laptops.</p>
      </div>
      <div className="blog__grid">
        {posts.map(post => (
          <article key={post.id} className="blog-card">
            <div className="blog-card__img-placeholder">
              <span>📝</span>
            </div>
            <div className="blog-card__body">
              <span className="blog-card__tag">{post.tag}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="blog-card__footer">
                <span className="blog-card__date">{post.date}</span>
                <a href="#!" className="blog-card__read">Read more →</a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/products" className="btn-primary">Shop Products</Link>
      </div>
    </div>
  );
}
