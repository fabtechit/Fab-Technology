// src/pages/ProductsPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFire, FaBoxes, FaTag } from 'react-icons/fa';
import '../assets/css/ProductsPage.css'; // New CSS file for styling

const ProductsPage = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const flashSaleProducts = products.filter(p => p.discountPercentage > 10);
  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const productCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderProductGrid = (productList) => (
    <motion.div
      className="product-grid"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
    >
      {productList.map((product) => (
        <motion.div
          key={product.id}
          className="product-card"
          variants={productCardVariants}
          transition={{ duration: 0.4 }}
          whileHover={{ 
            scale: 1.03, 
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Link to={`/product/${product.id}`} className="product-link">
            <div className="product-image-container">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              {product.discountPercentage > 0 && (
                <div className="discount-badge">
                  -{product.discountPercentage}%
                </div>
              )}
            </div>
            <h3 className="product-name">{product.name}</h3>
            <div className="product-prices">
              <span className="product-price">${product.price.toFixed(2)}</span>
              {product.discountPercentage > 0 && (
                <span className="product-real-price">${product.realPrice.toFixed(2)}</span>
              )}
            </div>
            <motion.button 
              className="view-details-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <motion.div
      className="products-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="content-wrapper">
        <h1 className="page-title">Explore Our Products</h1>

        {/* Flash Sale Section */}
        <section className="product-section">
          <h2 className="section-title"><FaFire className="section-icon" /> Flash Sale</h2>
          {renderProductGrid(flashSaleProducts)}
        </section>

        {/* Categories Section */}
        <section className="product-section">
          <h2 className="section-title"><FaBoxes className="section-icon" /> Shop by Categories</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className={`category-card ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{category}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* All Products Section */}
        <section className="product-section">
          <h2 className="section-title"><FaTag className="section-icon" /> {selectedCategory} Products</h2>
          {renderProductGrid(filteredProducts)}
        </section>
      </div>
    </motion.div>
  );
};

export default ProductsPage;