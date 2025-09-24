import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

export default function Checkout() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    clearCart();
    setOrderPlaced(true);

    
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  return (
    <>
      <Navbar />
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        {cartItems.length === 0 && !orderPlaced && (
          <p className="empty-cart">Your cart is empty</p>
        )}

        {cartItems.length > 0 && (
          <div className="checkout-content">
            <div className="checkout-items">
              {cartItems.map((item) => (
                <div key={item._id} className="checkout-card">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="checkout-image"
                  />
                  <div className="checkout-details">
                    <h2 className="checkout-item-title">{item.title}</h2>
                    <p className="checkout-item-price">
                      ₹{item.price} × {item.quantity}
                    </p>
                    <p className="checkout-item-total">
                      Subtotal: ₹{item.price * item.quantity}
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

            <div className="checkout-summary">
              <h2>Order Summary</h2>
              <p>Total Items: {cartItems.length}</p>
              <h3 className="checkout-total">Total: ₹{totalPrice}</h3>
              <button className="proceed-btn" onClick={handleCheckout}>
                Proceed to Payment
              </button>
            </div>
          </div>
        )}

        
        {orderPlaced && (
          <div className="success-overlay">
            <div className="success-card">
              <h2> Order Placed Successfully!</h2>
              <p>Thank you for shopping with us </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
