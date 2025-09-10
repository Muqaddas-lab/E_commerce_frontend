import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaCashRegister,
} from "react-icons/fa";

const Navbar = ({ cartItems = [] }) => {
  const [cartCount, setCartCount] = useState(cartItems.length);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Update cart count whenever cartItems change
  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  // ✅ Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : { name: "User" });
    }
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 30px",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo */}
      <h1
        style={{
          margin: 0,
          fontSize: "26px",
          fontWeight: "700",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <FaHome /> MyShop
      </h1>

      {/* Links */}
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "20px",
          margin: 0,
          padding: 0,
          alignItems: "center",
        }}
      >
        <li>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/cart"
            style={{
              ...linkStyle,
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <FaShoppingCart /> Cart ({cartCount})
          </Link>
        </li>

        {cartCount > 0 && (
          <li>
            <Link
              to="/checkout"
              style={{
                ...buttonStyle,
                backgroundColor: "#28a745",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
            >
              <FaCashRegister /> Checkout
            </Link>
          </li>
        )}

        {user ? (
          <>
            <li style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <FaUserCircle /> Hi, {user.name}
            </li>
            <li>
              <button onClick={handleLogout} style={buttonStyle}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                style={{
                  ...buttonStyle,
                  backgroundColor: "#34ace0",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2277aa")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#34ace0")
                }
              >
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                style={{
                  ...buttonStyle,
                  backgroundColor: "#ff6b6b",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ff4c4c")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ff6b6b")
                }
              >
                <FaUserPlus /> Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
  padding: "6px 12px",
  borderRadius: "6px",
  transition: "0.3s",
  cursor: "pointer",
};

const buttonStyle = {
  border: "none",
  padding: "6px 12px",
  borderRadius: "8px",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.3s",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
};

export default Navbar;
