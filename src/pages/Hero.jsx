// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from '@popmotion/popcorn';
import '../assets/css/hero.css';

// Your imported images
import Slider_1 from '../assets/images/slider_1.jpg';
import Slider_2 from '../assets/images/slider_2.jpg';
import Slider_3 from '../assets/images/slider_3.jpg';
import Slider_4 from '../assets/images/slider_4.jpg';
import Slider_5 from '../assets/images/slider_5.jpg';
import Slider_6 from '../assets/images/slider_6.jpg';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: Slider_1,
    title: 'Your Digital Shopping Destination',
    subtitle: 'Everything You Need, Delivered to Your Doorstep.',
  },
  {
    image: Slider_2,
    title: 'Discover Our Newest Collection',
    subtitle: 'Explore a World of Trending Products.',
  },
  {
    image: Slider_3,
    title: 'Deals of the Day',
    subtitle: 'Unbeatable Prices on Your Favorite Items.',
  },
  {
    image: Slider_4,
    title: 'Fastest Delivery Service',
    subtitle: 'Get What You Want, When You Want It.',
  },
  {
    image: Slider_5,
    title: 'Exclusive Offers on the App',
    subtitle: 'Download Now and Start Saving!',
  },
  {
    image: Slider_6,
    title: 'Explore Fashion & Lifestyle',
    subtitle: 'Your Style, Your Way.',
  },
];

// Animation variants for the slide image
const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    scale: 1.1,
  }),
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: { duration: 0.8, ease: 'easeOut' },
      scale: { duration: 0.8, ease: 'easeOut' },
    },
  },
  exit: (direction) => ({
    opacity: 0,
    scale: 0.9,
    transition: {
      opacity: { duration: 0.5, ease: 'easeIn' },
      scale: { duration: 0.5, ease: 'easeIn' },
    },
  }),
};

// Animation variants for the text content
const contentVariants = {
  enter: {
    y: 20,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
    transition: {
      y: { type: 'spring', stiffness: 200, damping: 20, delay: 0.5 },
      opacity: { duration: 0.5, delay: 0.5 },
    },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: {
      y: { duration: 0.3 },
      opacity: { duration: 0.3 },
    },
  },
};

const Hero = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const slideIndex = wrap(0, slides.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [page]);

  return (
    <div className="hero-section-new">
      <div className="hero-slider-wrapper-new">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            className="hero-slide-new"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ backgroundImage: `url(${slides[slideIndex].image})` }}
          >
            <div className="hero-content-overlay-new">
              <motion.h1
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {slides[slideIndex].title}
              </motion.h1>
              <motion.p
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ ...contentVariants.center.transition, delay: 0.7 }}
              >
                {slides[slideIndex].subtitle}
              </motion.p>
              <motion.button
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ ...contentVariants.center.transition, delay: 0.9 }}
                className="cta-button-new"
              >
                <Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Shop Now</Link>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.button
        className="nav-button-new prev-new"
        onClick={() => paginate(-1)}
        // whileHover={{ scale: 1.1 }}
        // whileTap={{ scale: 0.9 }}
      >
        &#10094;
      </motion.button>
      <motion.button
        className="nav-button-new next-new"
        onClick={() => paginate(1)}
        // whileHover={{ scale: 1.1 }}
        // whileTap={{ scale: 0.9 }}
      >
        &#10095;
      </motion.button>
      
      <div className="pagination-new">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            className={`pagination-dot-new ${i === slideIndex ? 'active' : ''}`}
            onClick={() => {
              const newDirection = i > slideIndex ? 1 : -1;
              setPage([i, newDirection]);
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;