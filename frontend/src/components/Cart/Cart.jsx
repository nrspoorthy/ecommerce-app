import React from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import Checkout from "../Checkout/Checkout";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();
  

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-box empty">
          <h2> Your Cart is Empty</h2>
          <p>Browse products and add them to your cart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        
        <div className="cart-items-section">
          <h2 className="cart-title">Shopping Cart</h2>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-item-img"
              />
              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <p>
                  ₹{item.price} × {item.quantity} ={" "}
                  <b>₹{item.price * item.quantity}</b>
                </p>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Right: Summary */}
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <p className="summary-total">
            Total: <b>₹{total.toFixed(2)}</b>
          </p>
          <button className="checkout-btn"  onClick={() => navigate("/Checkout")}>Proceed to Checkout</button>
          <button className="clear-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
