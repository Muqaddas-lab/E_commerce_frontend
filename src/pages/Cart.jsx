import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { FaMinus, FaPlus, FaTrash, FaShoppingCart, FaArrowRight } from "react-icons/fa";

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get("/cart");
        setCartItems(res.data.cart || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [setCartItems]);

  const increaseQty = async (productId) => {
    try {
      const res = await API.put(`/cart/increase/${productId}`);
      setCartItems(res.data.cart || []);
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseQty = async (productId) => {
    try {
      const res = await API.put(`/cart/decrease/${productId}`);
      setCartItems(res.data.cart || []);
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await API.delete(`/cart/remove/${productId}`);
      setCartItems(res.data.cart || []);
    } catch (err) {
      console.error(err);
    }
  };

  const totalPrice = cartItems?.reduce(
    (total, item) => total + ((item?.product?.price || 0) * (item?.quantity || 0)),
    0
  );

  return (
    <div style={{ padding: "30px", maxWidth: "850px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "28px", color: "#1e3a8a" }}>
        <FaShoppingCart /> Your Cart
      </h2>

      {(!cartItems || cartItems.length === 0) ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#6b7280" }}>
          Your cart is empty!
        </p>
      ) : (
        <>
          {cartItems.map(item => (
            item?.product && (
              <div key={item.product._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px",
                  marginBottom: "15px",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "0.3s"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <div>
                  <h3 style={{ fontSize: "20px", color: "#1e3a8a" }}>{item.product.name}</h3>
                  <p style={{ margin: "5px 0" }}>Price: <span style={{ color: "#16a34a" }}>Rs. {item.product.price}</span></p>
                  <p style={{ margin: "5px 0" }}>Total: <span style={{ color: "#dc2626" }}>Rs. {(item.product.price * item.quantity).toFixed(2)}</span></p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button onClick={() => decreaseQty(item.product._id)}
                    style={qtyBtnStyle("#facc15", "#eab308")}
                  >
                    <FaMinus />
                  </button>

                  <span style={{ fontSize: "16px", fontWeight: "700", minWidth: "25px", textAlign: "center" }}>
                    {item.quantity}
                  </span>

                  <button onClick={() => increaseQty(item.product._id)}
                    style={qtyBtnStyle("#22c55e", "#16a34a", true)}
                  >
                    <FaPlus />
                  </button>

                  <button onClick={() => removeItem(item.product._id)}
                    style={qtyBtnStyle("#ef4444", "#dc2626", true)}
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            )
          ))}

          <h3 style={{ textAlign: "right", marginTop: "20px", fontSize: "20px", color: "#1e40af", fontWeight: "700" }}>
            Total: Rs. {totalPrice.toFixed(2)}
          </h3>

          {/* ✅ Proceed to Checkout Button */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "25px" }}>
            <button
              onClick={() => navigate("/checkout")}
              style={{
                padding: "12px 20px",
                backgroundColor: "#2563eb",
                color: "white",
                fontWeight: "600",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "0.3s"
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = "#1e40af"}
              onMouseOut={e => e.currentTarget.style.backgroundColor = "#2563eb"}
            >
              Proceed to Checkout <FaArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// 🔹 Button Style Helper
const qtyBtnStyle = (bg, hover, white = false) => ({
  padding: "8px 12px",
  backgroundColor: bg,
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.3s",
  color: white ? "#fff" : "#000",
  display: "flex",
  alignItems: "center"
});

export default Cart;
