import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zip: '', country: 'Morocco',
    cardName: '', cardNumber: '', cardExpiry: '', cardCVV: '',
    payMethod: 'card',
  });
  const [ordered, setOrdered] = useState(false);

  const shipping = totalPrice > 1000 ? 0 : 50;
  const tax = Math.round(totalPrice * 0.2);
  const total = totalPrice + shipping + tax;

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleOrder() {
    setOrdered(true);
    clearCart();
    setTimeout(() => navigate('/'), 3500);
  }

  if (ordered) {
    return (
      <div className="checkout-success">
        <div className="checkout-success__icon">✅</div>
        <h2>Order Confirmed!</h2>
        <p>Thank you for your purchase. You'll receive a confirmation email shortly.</p>
        <p className="checkout-success__redirect">Redirecting to home...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="not-found">
        <span>🛒</span>
        <h2>Your cart is empty</h2>
        <Link to="/products" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1 className="checkout__title">Checkout</h1>

      {/* Steps */}
      <div className="checkout__steps">
        {['Shipping', 'Payment', 'Review'].map((s, i) => (
          <div key={s} className={`checkout__step ${step >= i + 1 ? 'checkout__step--done' : ''} ${step === i + 1 ? 'checkout__step--active' : ''}`}>
            <span className="checkout__step-num">{step > i + 1 ? '✓' : i + 1}</span>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <div className="checkout__layout">
        {/* Form */}
        <div className="checkout__form-area">
          {step === 1 && (
            <div className="checkout__section">
              <h3>Shipping Information</h3>
              <div className="form-grid">
                <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="form-input" />
                <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="form-input" />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="form-input form-input--full" />
                <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="form-input form-input--full" />
                <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="form-input form-input--full" />
                <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="form-input" />
                <input name="zip" placeholder="ZIP Code" value={form.zip} onChange={handleChange} className="form-input" />
                <select name="country" value={form.country} onChange={handleChange} className="form-input form-input--full">
                  <option>Morocco</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>UAE</option>
                </select>
              </div>
              <button className="btn-primary btn-lg" onClick={() => setStep(2)}>Continue to Payment →</button>
            </div>
          )}

          {step === 2 && (
            <div className="checkout__section">
              <h3>Payment Method</h3>
              <div className="checkout__pay-methods">
                {[{ id: 'card', label: '💳 Credit / Debit Card' }, { id: 'paypal', label: '🅿️ PayPal' }, { id: 'cash', label: '💵 Cash on Delivery' }].map(m => (
                  <label key={m.id} className={`pay-method ${form.payMethod === m.id ? 'pay-method--active' : ''}`}>
                    <input type="radio" name="payMethod" value={m.id} checked={form.payMethod === m.id} onChange={handleChange} />
                    {m.label}
                  </label>
                ))}
              </div>

              {form.payMethod === 'card' && (
                <div className="form-grid">
                  <input name="cardName" placeholder="Name on Card" value={form.cardName} onChange={handleChange} className="form-input form-input--full" />
                  <input name="cardNumber" placeholder="Card Number" value={form.cardNumber} onChange={handleChange} className="form-input form-input--full" maxLength="19" />
                  <input name="cardExpiry" placeholder="MM/YY" value={form.cardExpiry} onChange={handleChange} className="form-input" />
                  <input name="cardCVV" placeholder="CVV" value={form.cardCVV} onChange={handleChange} className="form-input" maxLength="4" />
                </div>
              )}

              <div className="checkout__btn-row">
                <button className="btn-ghost" onClick={() => setStep(1)}>← Back</button>
                <button className="btn-primary btn-lg" onClick={() => setStep(3)}>Review Order →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="checkout__section">
              <h3>Order Review</h3>
              <div className="checkout__review">
                <div className="checkout__review-block">
                  <strong>Shipping to</strong>
                  <p>{form.firstName} {form.lastName}</p>
                  <p>{form.address}, {form.city} {form.zip}, {form.country}</p>
                  <p>{form.email}</p>
                </div>
                <div className="checkout__review-block">
                  <strong>Payment</strong>
                  <p>{form.payMethod === 'card' ? `Card ending in ${form.cardNumber.slice(-4) || '****'}` : form.payMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery'}</p>
                </div>
              </div>
              <div className="checkout__btn-row">
                <button className="btn-ghost" onClick={() => setStep(2)}>← Back</button>
                <button className="btn-primary btn-lg btn-success" onClick={handleOrder}>✅ Place Order</button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="checkout__summary">
          <h3>Order Summary</h3>
          <div className="checkout__items">
            {cartItems.map(item => (
              <div key={item.id} className="checkout__item">
                <img src={`/pictures/${item.thumbnail}`} alt={item.title} />
                <div>
                  <p>{item.shortTitle || item.title}</p>
                  <span>Qty: {item.quantity}</span>
                </div>
                <strong>{(item.price * item.quantity).toLocaleString()} DH</strong>
              </div>
            ))}
          </div>
          <div className="checkout__totals">
            <div><span>Subtotal</span><span>{totalPrice.toLocaleString()} DH</span></div>
            <div><span>Shipping</span><span>{shipping === 0 ? 'Free' : `${shipping} DH`}</span></div>
            <div><span>Tax (20%)</span><span>{tax.toLocaleString()} DH</span></div>
            <div className="checkout__grand-total"><span>Total</span><strong>{total.toLocaleString()} DH</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
