import React, { useState, useEffect } from "react";
import ProductCard from "../component/ProductCard";
import API from "../api/axios";
import { FaShoppingCart } from "react-icons/fa";

const Home = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(true);

  // ✅ Add to cart
  const addToCart = async (productId) => {
    try {
      const res = await API.post("/cart/add", { productId, quantity: 1 });
      if (res.data.success) {
        setCartItems(res.data.cart);
        localStorage.setItem("cartItems", JSON.stringify(res.data.cart));
        setMessage({ text: "Item added to cart ✅", type: "success" });
        setTimeout(() => setMessage({ text: "", type: "" }), 2000);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      if (err.response?.status === 401) {
        setMessage({ text: "Please login first ⚠️", type: "error" });
      } else {
        setMessage({ text: "Failed to add item ❌", type: "error" });
      }
      setTimeout(() => setMessage({ text: "", type: "" }), 2000);
    }
  };

  // ✅ Fetch products
  useEffect(() => {
    API.get("/products")
      .then((res) => {
        if (res.data.success) setProducts(res.data.products);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "28px",
        fontWeight: "700",
        marginBottom: "20px",
        color: "#2563eb"
      }}>
        🛍️ Our Products
      </h2>

      {message.text && (
        <p style={{
          textAlign: "center",
          marginBottom: "20px",
          color: message.type === "success" ? "green" : "red",
          fontWeight: "600"
        }}>
          {message.text}
        </p>
      )}

      {loading ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>Loading products...</p>
      ) : (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px"
        }}>
          {products.length > 0 ? (
            products.map((p) => (
              <div key={p._id} style={{
                width: "220px",
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "15px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s"
              }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
              >
                <a href={`/product/${p._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <img
                    src={p.image ? `http://localhost:5000${p.image}` : "https://via.placeholder.com/200x150"}
                    alt={p.name}
                    style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }}
                  />
                  <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "10px 0", color: "#2563eb" }}>{p.name}</h3>
                  <p style={{ fontWeight: "700", fontSize: "16px", marginBottom: "10px" }}>Rs. {p.price}</p>
                </a>
                <button
                  onClick={() => addToCart(p._id)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#28a745",
                    color: "white",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                    transition: "0.3s"
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = "#218838"}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = "#28a745"}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", fontSize: "18px" }}>No products found ❌</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
