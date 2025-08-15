// src/pages/ProductView.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import '../assets/css/ProductView.css'; // Import the new CSS file

const ProductView = ({ products, addToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const foundProduct = products.find((p) => p.id === id);
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            navigate('/products');
        }
    }, [id, products, navigate]);

    if (!product) {
        return <div className="loading-state">Loading product details...</div>;
    }

    const handleAddToCart = () => {
        addToCart(product);
        navigate('/cart');
    };

    return (
        <motion.div
            className="product-view-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="product-view-card">
                <div className="product-image-section">
                    <img src={product.imageUrl} alt={product.name} className="product-view-image" />
                </div>
                <div className="product-details-section">
                    <h1 className="product-view-name">{product.name}</h1>
                    <p className="product-view-category">Category: {product.category}</p>
                    <div className="product-rating">
                        <FaStar className="star-icon" /> {product.rating} ({product.reviews} reviews)
                    </div>
                    <p className="product-view-description">{product.description}</p>
                    <p className="product-view-price">${product.price.toFixed(2)}</p>
                    <motion.button
                        className="add-to-cart-button"
                        onClick={handleAddToCart}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaShoppingCart /> Add to Cart
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductView;