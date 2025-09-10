import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import API from "../api/axios";

// Load Stripe with your public key
const stripePromise = loadStripe("pk_test_51S5PAS1LkJPXrhIHUz79ckkWSi2qeD8GI6l04ByjnB8SnZ0Abj0xS20M4eO8Y7IoLnub4sr3ptlfvq2ORrK24MeX00ykJDD5BG"); // 👉 apna STRIPE_PUBLIC_KEY .env se lena

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // 1️⃣ Backend se clientSecret le lo
      const { data } = await API.post("/payment/create-payment-intent", { amount: totalAmount });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setSuccess("✅ Payment Successful!");
        }
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ marginBottom: "15px", color: "#1e40af" }}>Checkout</h2>

      <CardElement options={cardStyle} />

      <button
        type="submit"
        disabled={!stripe || loading}
        style={buttonStyle}
      >
        {loading ? "Processing..." : `Pay Rs. ${totalAmount}`}
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
    </form>
  );
};

const Checkout = ({ cartItems }) => {
  const totalAmount = cartItems.reduce(
    (total, item) => total + ((item?.product?.price || 0) * (item?.quantity || 0)),
    0
  );

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalAmount={totalAmount} />
      </Elements>
    </div>
  );
};

// 🔹 Styles
const formStyle = {
  padding: "25px",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  backgroundColor: "#fff",
};

const buttonStyle = {
  marginTop: "20px",
  padding: "12px",
  width: "100%",
  backgroundColor: "#2563eb",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const cardStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1f2937",
      "::placeholder": { color: "#9ca3af" },
    },
    invalid: {
      color: "#dc2626",
    },
  },
};

export default Checkout;
