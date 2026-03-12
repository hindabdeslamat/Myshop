import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about">
      <div className="about__hero">
        <h1>About TechStore</h1>
        <p>Morocco's premier destination for laptops and technology hardware since 2019.</p>
      </div>

      <div className="about__content">
        <div className="about__mission">
          <h2>Our Mission</h2>
          <p>
            At TechStore, we believe everyone deserves access to quality technology. We carefully curate
            the best laptops from world-leading brands — making sure every product we sell meets our high
            standards for performance, reliability, and value.
          </p>
        </div>

        <div className="about__values">
          {[
            { icon: '🏆', title: 'Quality First', desc: 'Every product is vetted and tested before listing.' },
            { icon: '💰', title: 'Best Prices', desc: 'Competitive pricing with regular deals and discounts.' },
            { icon: '🤝', title: 'Customer Care', desc: '24/7 support team ready to help with any question.' },
            { icon: '🚀', title: 'Fast Delivery', desc: 'Quick nationwide delivery across Morocco.' },
          ].map(v => (
            <div key={v.title} className="about__value-card">
              <span>{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="about__cta">
          <h2>Ready to find your perfect laptop?</h2>
          <Link to="/products" className="btn-primary btn-lg">Browse Products</Link>
        </div>
      </div>
    </div>
  );
}
