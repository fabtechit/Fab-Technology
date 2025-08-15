// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaAddressCard, FaCreditCard } from 'react-icons/fa';
import '../assets/css/CheckoutPage.css'; // Import the new CSS file

const CheckoutPage = ({ cartItems, clearCart }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        paymentMethod: 'credit_card',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [errors, setErrors] = useState({});

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    const totalAmount = (calculateTotalPrice() + 5).toFixed(2);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.zip) newErrors.zip = 'Zip code is required';

        if (formData.paymentMethod === 'credit_card') {
            if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
            if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
            if (!formData.cvv) newErrors.cvv = 'CVV is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Order placed with details:', formData, 'Cart Items:', cartItems);
            clearCart();
            navigate('/order-confirm');
        } else {
            console.log('Form validation failed.');
        }
    };

    return (
        <motion.div
            className="checkout-page-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="page-title">Checkout</h1>

            {cartItems.length === 0 ? (
                <div className="empty-cart-message">
                    <p>Your cart is empty. <Link to="/">Start shopping now!</Link></p>
                </div>
            ) : (
                <form className="checkout-form-grid" onSubmit={handleSubmit}>
                    {/* Shipping Information */}
                    <motion.div
                        className="checkout-section-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        <h2 className="section-title"><FaAddressCard className="section-icon" /> Shipping Information</h2>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <div className="input-with-icon">
                                <FaUser className="input-icon" />
                                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
                            </div>
                            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-with-icon">
                                <FaEnvelope className="input-icon" />
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                            </div>
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <div className="input-with-icon">
                                <FaPhone className="input-icon" />
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                            </div>
                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <div className="input-with-icon">
                                <FaAddressCard className="input-icon" />
                                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                            </div>
                            {errors.address && <span className="error-message">{errors.address}</span>}
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
                                {errors.city && <span className="error-message">{errors.city}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="zip">Zip Code</label>
                                <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} />
                                {errors.zip && <span className="error-message">{errors.zip}</span>}
                            </div>
                        </div>
                    </motion.div>

                    {/* Payment Information and Order Summary */}
                    <div className="checkout-sidebar">
                        <motion.div
                            className="checkout-section-card"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <h2 className="section-title"><FaCreditCard className="section-icon" /> Payment Information</h2>
                            <div className="form-group">
                                <label>Payment Method</label>
                                <div className="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="credit_card"
                                            checked={formData.paymentMethod === 'credit_card'}
                                            onChange={handleChange}
                                        /> Credit Card
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="paypal"
                                            checked={formData.paymentMethod === 'paypal'}
                                            onChange={handleChange}
                                        /> PayPal
                                    </label>
                                </div>
                            </div>

                            {formData.paymentMethod === 'credit_card' && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="cardNumber">Card Number</label>
                                        <div className="input-with-icon">
                                            <FaCreditCard className="input-icon" />
                                            <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="XXXX XXXX XXXX XXXX" />
                                        </div>
                                        {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="expiryDate">Expiry Date</label>
                                            <input type="text" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} placeholder="MM/YY" />
                                            {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="cvv">CVV</label>
                                            <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="XXX" />
                                            {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                                        </div>
                                    </div>
                                </>
                            )}
                        </motion.div>

                        <motion.div
                            className="checkout-summary-card"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            <h2 className="section-title">Order Summary</h2>
                            <div className="summary-details">
                                {cartItems.map(item => (
                                    <div key={item.id} className="summary-item">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className="summary-item total">
                                    <span>Shipping:</span>
                                    <span>$5.00</span>
                                </div>
                                <div className="summary-item total">
                                    <span>Total:</span>
                                    <span>${totalAmount}</span>
                                </div>
                            </div>
                            <motion.button
                                type="submit"
                                className="place-order-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Place Order - ${totalAmount}
                            </motion.button>
                        </motion.div>
                    </div>
                </form>
            )}
        </motion.div>
    );
};

export default CheckoutPage;