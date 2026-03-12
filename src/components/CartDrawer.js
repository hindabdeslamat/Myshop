import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      <div className="cart-drawer">
        <div className="cart-drawer__header">
          <h3>🛒 Cart <span className="cart-drawer__count">{totalItems}</span></h3>
          <button className="cart-drawer__close" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        <div className="cart-drawer__items">
          {cartItems.length === 0 ? (
            <div className="cart-drawer__empty">
              <span style={{ fontSize: '3rem' }}>🛒</span>
              <p>Your cart is empty</p>
              <button className="btn-primary" onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={`/pictures/${item.thumbnail}`} alt={item.title} className="cart-item__img" />
                <div className="cart-item__info">
                  <p className="cart-item__name">{item.shortTitle || item.title}</p>
                  <p className="cart-item__price">{item.price.toLocaleString()} DH</p>
                  <div className="cart-item__qty">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>🗑</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__total">
              <span>Total</span>
              <span className="cart-drawer__total-price">{totalPrice.toLocaleString()} DH</span>
            </div>
            <Link
              to="/checkout"
              className="btn-primary btn-full"
              onClick={() => setIsCartOpen(false)}
            >
              Proceed to Checkout →
            </Link>
            <button className="btn-ghost btn-full" onClick={() => setIsCartOpen(false)}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
