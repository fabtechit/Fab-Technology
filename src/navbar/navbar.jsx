import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { NavLink, Link } from 'react-router-dom';
import '../assets/css/navbar.css';
import Fab from '../assets/images/fab_logo1.png'; // Placeholder for your logo
import { FaHome, FaList, FaShoppingCart, FaUser, FaSearch, FaTimes, FaChevronDown, FaBars } from 'react-icons/fa';

const Navbar = ({ cartCount }) => { // Receive cartCount as prop
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const menuRef = useRef(null);

  const navLinks = [
    { name: "SAVE MORE ON APP", to: "#" },
    { name: "BECOME A SELLER", to: "#" },
    { name: "HELP & SUPPORT", to: "#" },
    { name: "LOGIN", to: "/login" },
    { name: "SIGN UP", to: "/registration" },
  ];

  const bottomNavLinks = [
    { icon: <FaHome size={20} />, label: "Home", path: "/" },
    { icon: <FaList size={20} />, label: "Categories", path: "/products" }, // Link to products page
    { icon: <FaSearch size={20} />, label: "Search", action: () => setSearchActive(true) },
    { icon: <FaShoppingCart size={20} />, label: "Cart", path: "/cart" },
    { icon: <FaUser size={20} />, label: "Account", path: "/account" }, // Link to a placeholder account page
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false); // Close menu on scroll
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && searchActive) {
        setSearchActive(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [searchActive]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const mobileMenuVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const navItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };

  const searchOverlayVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <motion.header
      className={`header${scrollY > 10 ? ' scrolled' : ''}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      {!isMobile && (
        <motion.div className="top-nav-bar">
          <motion.div
            className="top-nav-links"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.to}
                className="nav-link"
                variants={navItemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      )}

      <div className="main-header">
        {!isMobile || !searchActive ? (
          <motion.div
            className="header-logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/"> {/* Link logo to home page */}
              <img src={Fab} alt="Daraz Logo" />
            </Link>
          </motion.div>
        ) : null}

        {(!isMobile && !searchActive) && (
          <motion.div
            className="header-search"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <input type="text" placeholder="Search in Products" />
            <motion.button
              className="search-button"
              whileHover={{ scale: 1.1, backgroundColor: "#e54418" }}
              whileTap={{ scale: 0.9 }}
            >
              <FaSearch size={18} />
            </motion.button>
          </motion.div>
        )}

        {!searchActive && (
          <>
            <motion.div
              className="header-cart"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9, rotate: -10 }}
            >
              <Link to="/cart"> {/* Link to cart page */}
                <FaShoppingCart size={24} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </motion.div>

            {isMobile && (
              <motion.div
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={24} />
                ) : (
                  <FaBars size={24} />
                )}
              </motion.div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="mobile-nav-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              ref={menuRef}
            >
              <div className="mobile-nav-header">
                <img src={Fab} alt="Logo" className="mobile-nav-logo" />
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <FaTimes size={20} />
                </button>
              </div>

              <motion.div
                className="mobile-nav-content"
                variants={mobileMenuVariants}
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    variants={navItemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={link.to}
                      className="mobile-nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                      {index < 3 && <FaChevronDown size={14} className="dropdown-icon" />}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="mobile-nav-footer">
                  <p>Download App</p>
                  <div className="app-badges">
                    <img src="https://via.placeholder.com/120x40?text=Google+Play" alt="Google Play" />
                    <img src="https://via.placeholder.com/120x40?text=App+Store" alt="App Store" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobile && searchActive && (
          <motion.div
            className="search-overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={searchOverlayVariants}
          >
            <motion.div
              className="search-container"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <input type="text" placeholder="Search in Products" autoFocus />
              <motion.button
                className="search-button"
                whileHover={{ scale: 1.1, backgroundColor: "#e54418" }}
                whileTap={{ scale: 0.9 }}
              >
                <FaSearch size={18} />
              </motion.button>
            </motion.div>
            <motion.button
              className="overlay-close-button"
              onClick={() => setSearchActive(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              whileHover={{ rotate: 90 }}
            >
              <FaTimes size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {isMobile && !searchActive && (
        <motion.div 
          className={`bottom-nav${scrollY > 10 ? ' scrolled' : ''}`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {bottomNavLinks.map((link, index) => (
            <NavLink 
              key={index} 
              to={link.path || '#'} /* Use NavLink for active styling */
              className="bottom-nav-link"
              onClick={(e) => {
                if (link.action) {
                  e.preventDefault();
                  link.action();
                } else if (!link.path) { // Prevent default for '#' if no specific path
                  e.preventDefault();
                }
              }}
            >
              <motion.div 
                className="bottom-nav-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {link.icon}
                {link.label === "Cart" && cartCount > 0 && <span className="bottom-nav-badge">{cartCount}</span>}
              </motion.div>
              <span className="bottom-nav-label">{link.label}</span>
            </NavLink>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;