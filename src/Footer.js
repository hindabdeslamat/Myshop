import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 MyShop. Tous droits réservés.</p>
        <ul className="footer-links">
          <li><a href="/about">À propos</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Politique de confidentialité</a></li>
        </ul>
      </div>
    </footer>
  );
}
