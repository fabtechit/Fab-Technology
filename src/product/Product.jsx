import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaShoppingCart, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../assets/css/Product.css';

// Dummy Data for Categories (same as before)
const dummyCategories = [
  { name: 'Electronics', icon: '⚡' },
  { name: 'Fashion', icon: '👕' },
  { name: 'Home & Living', icon: '🛋️' },
  { name: 'Health & Beauty', icon: '💅' },
  { name: 'Sports & Outdoors', icon: '🏀' },
  { name: 'Automotive', icon: '🚗' },
  { name: 'Books', icon: '📚' },
  { name: 'Groceries', icon: '🍎' },
];

const AllProductsPage = ({ products }) => {
  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft());

  function getInitialTimeLeft() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const difference = endOfDay.getTime() - now.getTime();
    return difference > 0 ? difference : 0;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1000) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    }
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03, boxShadow: '0 8px 16px rgba(0,0,0,0.15)' },
    tap: { scale: 0.98 }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const flashSaleProducts = products.filter(p => p.flashSale);

  return (
    <div className="all-products-page">
      {/* Flash Sale Section */}
      <motion.section
        className="flash-sale-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="section-header">
          <h2>Flash Sale</h2>
          <div className="flash-sale-timer">
            Ending In: <span>{formatTime(timeLeft)}</span>
          </div>
          <Link to="/products" className="view-more">
            Shop More <FaChevronRight size={12} />
          </Link>
        </div>
        <div className="flash-sale-products">
          {flashSaleProducts.map((product) => (
            <motion.div
              className="product-card flash-sale-card"
              key={product.id}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link to={`/product/${product.id}`} className="product-card-link">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    <span className="current-price">৳{product.price}</span>
                    {product.oldPrice && <span className="old-price">৳{product.oldPrice}</span>}
                  </div>
                  <div className="stock-progress-bar">
                    <div className="progress-fill" style={{ width: `${100 - product.stockProgress}%` }}></div>
                    <span className="progress-text">{product.stockProgress}% Left</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        className="categories-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="section-header">
          <h2>Categories</h2>
          <Link to="/categories" className="view-more">
            View All <FaChevronRight size={12} />
          </Link>
        </div>
        <div className="categories-grid">
          {dummyCategories.map((category, index) => (
            <motion.div
              className="category-card"
              key={index}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span className="category-icon">{category.icon}</span>
              <p className="category-name">{category.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* All Products Section */}
      <motion.section
        className="all-products-list-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="section-header">
          <h2>All Products</h2>
        </div>
        <div className="products-grid">
          {products.map((product) => (
            <motion.div
              className="product-card"
              key={product.id}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link to={`/product/${product.id}`} className="product-card-link">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    <span className="current-price">৳{product.price}</span>
                    {product.oldPrice && <span className="old-price">৳{product.oldPrice}</span>}
                  </div>
                  <div className="product-rating">
                    <div className="stars">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar key={i} color={i < Math.floor(product.rating) ? "#FFD700" : "#E0E0E0"} size={14} />
                      ))}
                    </div>
                    <span className="review-count">({product.reviews})</span>
                  </div>
                </div>
              </Link>
              <motion.button
                className="add-to-cart-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); alert('Product added to cart!'); }}
              >
                <FaShoppingCart size={16} /> Add to Cart
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default AllProductsPage;