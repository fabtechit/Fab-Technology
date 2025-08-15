import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../assets/css/OrderConfirmPage.css';

const OrderConfirmPage = () => {
  return (
    <motion.div
      className="order-confirm-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="order-confirm-card">
        <FaCheckCircle className="confirm-icon" />
        <h1 className="confirm-title">Order Confirmed!</h1>
        <p className="confirm-message">Thank you for your purchase. Your order has been placed successfully and will be processed shortly.</p>
        <p className="confirm-id">Your Order ID: <strong>#{Math.floor(Math.random() * 1000000000)}</strong></p>
        <Link to="/products">
          <motion.button
            className="continue-shopping-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Shopping
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default OrderConfirmPage;