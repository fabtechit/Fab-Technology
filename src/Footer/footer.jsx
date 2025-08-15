// src/components/Footer.js
import React from 'react';
import { motion } from 'framer-motion';
import '../assets/css/footer.css'; // New CSS file for footer
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa';

// Import local images for payment and delivery icons
import visa from '../assets/images/visa_PNG4.png';
import mastercard from '../assets/images/MasterCard_Logo.png';
import bkash from '../assets/images/bkash.jpg';
import nagad from '../assets/images/nagad.png';
import rocket from '../assets/images/Rocket.png';

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.footer
      className="footer"
      variants={footerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="footer-top-row">
        <div className="footer-section customer-care">
          <h3>Customer Care</h3>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">How to Buy</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section about-us">
          <h3>About Daraz</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
        
        <div className="footer-section follow-us">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <FaFacebookF />
            </motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <FaTwitter />
            </motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <FaInstagram />
            </motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <FaYoutube />
            </motion.a>
          </div>
        </div>

        <div className="footer-section newsletter">
          <h3>Newsletter</h3>
          <p>Subscribe to our newsletter and get updates on our latest products and promotions!</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="footer-middle-row">
        <h3>Payment & Delivery Partners</h3>
        <div className="partner-icons">
          <img src={visa} alt="Visa" />
          <img src={mastercard} alt="Mastercard" />
          <img src={bkash} alt="bKash" />
          <img src={nagad} alt="Nagad" />
          <img src={rocket} alt="Rocket" />
        </div>
      </div>
      
      <div className="footer-bottom-row">
        <p>&copy; {new Date().getFullYear()} <a href="https://fabtechit.com" target='_blank' style={{ color: 'inherit', textDecoration: 'none' }}>FabTech.IT</a>. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;