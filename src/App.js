import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout"; 
import API from "./api/axios";

// 🔹 Stripe publishable key (test mode only)
const stripePromise = loadStripe("pk_test_51S5PAS1LkJPXrhIHUz79ckkWSi2qeD8GI6l04ByjnB8SnZ0Abj0xS20M4eO8Y7IoLnub4sr3ptlfvq2ORrK24MeX00ykJDD5BG"); 

// ✅ Admin route wrapper
const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  return role === "admin" ? children : <Navigate to="/" />;
};

function App() {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load cart on app start (if logged in)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setCartItems(res.data.cart || []))
        .catch((err) => console.error("Error fetching cart:", err));
    }
  }, []);

  return (
    <Router>
      <Navbar cartItems={cartItems} setCartItems={setCartItems} />
      <Routes>
        {/* User Routes */}
        <Route
          path="/"
          element={<Home cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route path="/login" element={<Login setCartItems={setCartItems} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />}
        />

        {/* ✅ Stripe Checkout wrapped with Elements */}
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <Checkout cartItems={cartItems} setCartItems={setCartItems} />
            </Elements>
          }
        />

        {/* Admin Route (Protected) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;











// 