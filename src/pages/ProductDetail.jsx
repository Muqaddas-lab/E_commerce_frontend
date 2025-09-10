import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { FaMinus, FaPlus, FaCartPlus, FaTags } from "react-icons/fa";

const ProductDetail = ({ cartItems, setCartItems }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => {
        if (res.data.success) setProduct(res.data.product);
      })
      .catch((err) => console.error("Error fetching product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const addToCart = async () => {
    if (!product) return;
    try {
      const res = await API.post("/cart/add", { productId: product._id, quantity });
      if (res.data.success) {
        setCartItems(res.data.cart || []);
        localStorage.setItem("cartItems", JSON.stringify(res.data.cart || []));
        setMessage({ text: `✅ Added ${quantity} x "${product.name}" to cart`, type: "success" });
        setTimeout(() => setMessage({ text: "", type: "" }), 2000);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage({ text: "❌ Failed to add to cart", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 2000);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading product...</p>;
  if (!product) return <p className="text-center mt-6">Product not found ❌</p>;

  const productImage = product.image
    ? `http://localhost:5000${product.image}`
    : "https://via.placeholder.com/400x300";

  const totalPriceForSelected = (product.price * quantity).toFixed(2);

  return (
    <div style={{
      maxWidth: "650px",
      margin: "80px auto 40px",
      padding: "25px",
      borderRadius: "12px",
      backgroundColor: "#fdfdfd",
      boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
      transition: "0.3s",
      border: "1px solid #e0e0e0"
    }}>
      <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "10px", color: "#1e3a8a" }}>
        {product.name} <FaTags style={{ color: "#f59e0b" }} />
      </h2>
      <p style={{ fontStyle: "italic", color: "#555", marginBottom: "15px" }}>
        Category: {product.category || "N/A"}
      </p>
      <img
        src={productImage}
        alt={product.name}
        style={{
          width: "100%",
          maxHeight: "420px",
          objectFit: "contain",
          marginBottom: "20px",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
      />
      <p style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>{product.description}</p>
      <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "5px" }}>
        Price per item: <span style={{ color: "#16a34a" }}>Rs. {product.price}</span>
      </p>
      <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>
        Total for {quantity} item(s): <span style={{ color: "#dc2626" }}>Rs. {totalPriceForSelected}</span>
      </p>

      {/* Quantity Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "25px" }}>
        <button
          onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          style={{
            padding: "8px 12px",
            backgroundColor: "#facc15",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s",
            display: "flex",
            alignItems: "center"
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = "#eab308"}
          onMouseOut={e => e.currentTarget.style.backgroundColor = "#facc15"}
        >
          <FaMinus />
        </button>
        <span style={{ fontWeight: "700", minWidth: "30px", textAlign: "center", fontSize: "16px" }}>{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          style={{
            padding: "8px 12px",
            backgroundColor: "#22c55e",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s",
            color: "#fff",
            display: "flex",
            alignItems: "center"
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = "#16a34a"}
          onMouseOut={e => e.currentTarget.style.backgroundColor = "#22c55e"}
        >
          <FaPlus />
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={addToCart}
        style={{
          padding: "12px 20px",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          width: "100%",
          fontWeight: "600",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          fontSize: "16px",
          transition: "0.3s"
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = "#1e40af"}
        onMouseOut={e => e.currentTarget.style.backgroundColor = "#2563eb"}
      >
        <FaCartPlus /> Add to Cart
      </button>

      {/* Message */}
      {message.text && (
        <p style={{
          marginTop: "15px",
          padding: "10px 15px",
          borderRadius: "8px",
          backgroundColor: message.type === "success" ? "#d1fae5" : "#fee2e2",
          color: message.type === "success" ? "#065f46" : "#b91c1c",
          fontWeight: "600",
          textAlign: "center",
          fontSize: "15px",
          transition: "0.3s"
        }}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default ProductDetail;
