// src/pages/Login.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../assets/css/login.css';

const Login = () => {
  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="auth-card">
        <h2 className="auth-title">Login to your account</h2>
        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>
          </div>
          <motion.button
            type="submit"
            className="auth-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>
        <p className="auth-link-text">
          Don't have an account? <Link to="/registration">Sign up</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;