import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
  if (!product) return null;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        margin: "10px",
        width: "220px",
        textAlign: "center",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        transition: "0.3s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Image and Name clickable for Product Detail */}
      <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <img
          src={product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/150"}
          alt={product.name || "Product"}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />
        <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "10px 0" }}>
          {product.name || "No Name"}
        </h3>
      </Link>

      {/* Price */}
      <p style={{ fontWeight: "bold", color: "#222", marginBottom: "10px" }}>
        Rs. {product.price ?? "N/A"}
      </p>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product._id)}
        style={{
          padding: "8px 12px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#2563eb",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "500",
          transition: "0.3s",
          width: "100%",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1e40af")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
