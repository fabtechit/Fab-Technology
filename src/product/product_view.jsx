import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaShoppingCart, FaArrowLeft, FaBolt } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/css/product_View.css';

const ProductViewPage = ({ products }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="product-view-container fallback">
        <p>Product not found.</p>
        <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
      </div>
    );
  }

  const pageVariants = {
    initial: { opacity: 0, x: '100%' },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: '-100%' },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.5,
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="product-view-container"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="product-view-header">
        <motion.button
          onClick={() => navigate(-1)}
          className="back-button"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
        >
          <FaArrowLeft size={20} /> Back to Products
        </motion.button>
      </div>

      <div className="product-details-card">
        <div className="product-image-gallery">
          <img src={product.image} alt={product.name} className="main-product-image" />
        </div>

        <div className="product-info-details">
          <h1 className="product-title">{product.name}</h1>

          <div className="product-rating-view">
            <div className="stars">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} color={i < Math.floor(product.rating) ? "#FFD700" : "#E0E0E0"} size={16} />
              ))}
            </div>
            <span className="review-count-view">({product.reviews} reviews)</span>
          </div>

          <div className="product-price-view">
            <span className="current-price-view">৳{product.price}</span>
            {product.oldPrice && <span className="old-price-view">৳{product.oldPrice}</span>}
          </div>

          <div className="product-meta-details">
            {product.details && product.details.map((detail, index) => (
              <p key={index}><strong>{detail.key}:</strong> {detail.value}</p>
            ))}
          </div>

          <p className="product-description">{product.description}</p>

          <div className="action-buttons-view">
            <motion.button
              className="add-to-cart-view"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              onClick={() => alert(`Added "${product.name}" to cart!`)}
            >
              <FaShoppingCart size={18} /> Add to Cart
            </motion.button>
            <motion.button
              className="buy-now-view"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              onClick={() => alert(`Buying "${product.name}" now!`)}
            >
              <FaBolt size={18} /> Buy Now
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductViewPage;