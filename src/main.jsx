// src/main.jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import IMG_1 from "./assets/images/porduct_1.jpg";
import IMG_2 from "./assets/images/porduct_2.jpeg";
import IMG_3 from "./assets/images/porduct_3.jpg";
import IMG_4 from "./assets/images/porduct_4.jpg";
import IMG_5 from "./assets/images/porduct_5.jpg";
import IMG_6 from "./assets/images/porduct_6.jpg";
import IMG_7 from "./assets/images/porduct_7.png";
import IMG_8 from "./assets/images/porduct_8.png";
import IMG_9 from "./assets/images/porduct_9.jpg";
import IMG_10 from "./assets/images/porduct_10.png";
import IMG_11 from "./assets/images/porduct_11.jpg";
import IMG_12 from "./assets/images/porduct_12.png";

import Navbar from "./navbar/navbar";
import Footer from "./Footer/footer";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProductsPage from "./pages/ProductsPage";
import ProductView from "./pages/ProductView";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";

import NotFoundPage from "./pages/NotFoundPage";

// Centralized Product Data with discounts
const dummyProducts = [
  {
    id: "1",
    name: "Smartphone Pro",
    price: 599.99,
    realPrice: 650.0,
    discountPercentage: 8,
    imageUrl: IMG_1,
    category: "Electronics",
    description:
      "Experience the next level of mobile technology with stunning camera, long-lasting battery, and powerful performance.",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: "2",
    name: "Designer Watch",
    price: 129.99,
    realPrice: 150.0,
    discountPercentage: 13,
    imageUrl: IMG_2,
    category: "Fashion",
    description:
      "A timeless piece crafted with precision and elegance. Perfect for any occasion.",
    rating: 4.8,
    reviews: 85,
  },
  {
    id: "3",
    name: "Wireless Headphones",
    price: 79.99,
    realPrice: 100.0,
    discountPercentage: 20,
    imageUrl: IMG_3,
    category: "Electronics",
    description:
      "Immersive sound experience with noise-cancelling technology and comfortable earcups. Long battery life for uninterrupted music.",
    rating: 4.2,
    reviews: 210,
  },
  {
    id: "4",
    name: "Smart Home Speaker",
    price: 49.99,
    realPrice: 55.0,
    discountPercentage: 9,
    imageUrl: IMG_4,
    category: "Smart Home",
    description:
      "Control your smart home devices with voice commands and enjoy crisp audio from this compact speaker.",
    rating: 4.0,
    reviews: 150,
  },
  {
    id: "5",
    name: "Running Shoes",
    price: 89.99,
    realPrice: 95.0,
    discountPercentage: 5,
    imageUrl: IMG_5,
    category: "Sports",
    description:
      "Lightweight and breathable running shoes designed for optimal comfort and performance during your workouts.",
    rating: 4.6,
    reviews: 90,
  },
  {
    id: "6",
    name: "Gaming Laptop",
    price: 1200.0,
    realPrice: 1350.0,
    discountPercentage: 11,
    imageUrl: IMG_6,
    category: "Electronics",
    description:
      "Unleash your gaming potential with this high-performance laptop featuring a powerful processor and dedicated graphics card.",
    rating: 4.7,
    reviews: 75,
  },
  {
    id: "7",
    name: "Leather Wallet",
    price: 35.0,
    realPrice: 40.0,
    discountPercentage: 12,
    imageUrl: IMG_7,
    category: "Fashion",
    description:
      "Premium genuine leather wallet with multiple card slots and a sleek design, perfect for everyday use.",
    rating: 4.1,
    reviews: 50,
  },
  {
    id: "8",
    name: "Coffee Maker",
    price: 60.5,
    realPrice: 65.0,
    discountPercentage: 7,
    imageUrl: IMG_8,
    category: "Home Appliances",
    description:
      "Brew your favorite coffee at home with this easy-to-use and efficient coffee maker. Features a programmable timer.",
    rating: 3.9,
    reviews: 110,
  },
  {
    id: "9",
    name: "Stainless Steel Water Bottle",
    price: 25.0,
    realPrice: 30.0,
    discountPercentage: 17,
    imageUrl: IMG_9,
    category: "Home Appliances",
    description:
      "Keep your drinks hot or cold for hours with this durable, leak-proof water bottle.",
    rating: 4.6,
    reviews: 155,
  },
  {
    id: "10",
    
    name: "Electric Kettle",
    price: 45.0,
    realPrice: 50.0,
    discountPercentage: 10,
    imageUrl: IMG_10,
    category: "Home Appliances",
    description:
      "Boil water quickly and safely with this sleek electric kettle, featuring auto-shutoff and boil-dry protection.",
    rating: 4.3,
    reviews: 95,
  },
  {
    id: "11",
    name: "Yoga Mat",
    price: 29.99,
    realPrice: 35.0,
    discountPercentage: 14,
    imageUrl: IMG_11,
    category: "Sports",
    description:
      "A comfortable and non-slip yoga mat, perfect for all types of workouts and stretching.",
    rating: 4.9,
    reviews: 250,
  },
  {
    id: "12",
    name: "E-Reader",
    price: 199.99,
    realPrice: 220.0,
    discountPercentage: 9,
    imageUrl: IMG_12,
    category: "Electronics",
    description:
      "Read your favorite books on the go with this lightweight e-reader featuring a glare-free display and long battery life.",
    rating: 4.7,
    reviews: 180,
  },
];

const HeroAndProducts = () => (
  <>
    <Hero />
    <ProductsPage products={dummyProducts} />
  </>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Layout = () => {
  const [cartItems, setCartItems] = useState([]);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.id !== productId);
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <Navbar cartCount={cartCount} />
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<HeroAndProducts />} />
          <Route
            path="/products"
            element={<ProductsPage products={dummyProducts} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/product/:id"
            element={
              <ProductView products={dummyProducts} addToCart={addToCart} />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                updateCartItemQuantity={updateCartItemQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage cartItems={cartItems} clearCart={clearCart} />
            }
          />
          <Route path="/order-confirm" element={<OrderConfirmPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const Main = () => (
  <Router>
    <ScrollToTop />
    <Layout />
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
