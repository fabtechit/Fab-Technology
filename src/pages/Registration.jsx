import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Registration = () => {
  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="auth-card">
        <h2 className="auth-title">Create a new account</h2>
        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input type="text" id="username" placeholder="Choose a username" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input type="password" id="password" placeholder="Create a password" required />
            </div>
          </div>
          <motion.button 
            type="submit" 
            className="auth-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </form>
        <p className="auth-link-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Registration;