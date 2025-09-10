import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
        role
      });

      if (res.data.success) {
        setPopup({ show: true, message: "✅ Signup successful! Please login.", type: "success" });
        setName("");
        setEmail("");
        setPassword("");
        setRole("user");
      }
    } catch (err) {
      setPopup({
        show: true,
        message: err.response?.data?.message || "❌ Signup failed",
        type: "error"
      });
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <form
        onSubmit={handleSignup}
        style={{
          maxWidth: "350px",
          margin: "50px auto",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        <h2 style={{ textAlign: "center", color: "#2563eb", fontSize: "28px", fontWeight: "700" }}>
          <FaUserPlus /> Sign Up
        </h2>

        {/* Name */}
        <div style={{ position: "relative" }}>
          <FaUser style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ width: "87%", padding: "10px 10px 10px 35px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" }}
          />
        </div>

        {/* Email */}
        <div style={{ position: "relative" }}>
          <FaEnvelope style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: "87%", padding: "10px 10px 10px 35px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" }}
          />
        </div>

        {/* Password */}
        <div style={{ position: "relative" }}>
          <FaLock style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "87%", padding: "10px 10px 10px 35px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" }}
          />
        </div>

        {/* Role dropdown */}
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Submit button */}
        <button
          type="submit"
          style={{
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#fff",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            transition: "0.3s"
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = "#1e40af"}
          onMouseOut={e => e.currentTarget.style.backgroundColor = "#2563eb"}
        >
          <FaUserPlus /> Sign Up
        </button>
      </form>

      {/* Popup */}
      {popup.show && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          onClick={() => setPopup({ ...popup, show: false })}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              minWidth: "250px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
            }}
          >
            <h3 style={{ color: popup.type === "success" ? "green" : "red", marginBottom: "15px" }}>
              {popup.message}
            </h3>
            <button
              onClick={() => setPopup({ ...popup, show: false })}
              style={{
                padding: "8px 15px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#2563eb",
                color: "#fff",
                cursor: "pointer",
                transition: "0.3s"
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = "#1e40af"}
              onMouseOut={e => e.currentTarget.style.backgroundColor = "#2563eb"}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
