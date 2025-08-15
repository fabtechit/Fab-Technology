// src/pages/CartPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../assets/css/CartPage.css'; // Import the new CSS file

const CartPage = ({ cartItems, updateCartItemQuantity, removeFromCart }) => {
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <motion.div
      className="cart-page-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="page-title">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is empty. <Link to="/products">Start shopping now!</Link></p>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                className="cart-item-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <div className="cart-item-quantity-control">
                    <motion.button
                      onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaMinusSquare size={20} />
                    </motion.button>
                    <span>{item.quantity}</span>
                    <motion.button
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaPlusSquare size={20} />
                    </motion.button>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <p className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</p>
                  <motion.button
                    className="remove-item-button"
                    onClick={() => removeFromCart(item.id)}
                    whileHover={{ scale: 1.1, color: '#dc3545' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTrash size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="cart-summary-card">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${calculateTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>$5.00</span> {/* Example fixed shipping */}
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(calculateTotalPrice() + 5).toFixed(2)}</span>
            </div>
            <Link to="/checkout">
              <motion.button
                className="proceed-to-checkout-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Proceed to Checkout
              </motion.button>
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CartPage;