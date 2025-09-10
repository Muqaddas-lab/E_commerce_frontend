import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = role === "admin" ? "/admin/login" : "/users/login";
      const res = await API.post(endpoint, { email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", role);

        navigate(role === "admin" ? "/admin" : "/");
        alert(`${role} login successful ✅`);
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "350px",
        margin: "50px auto",
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{
        textAlign: "center",
        marginBottom: "15px",
        color: "#2563eb",
        fontSize: "28px",
        fontWeight: "700"
      }}>
        🔑 Login
      </h2>

      {/* Role dropdown */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px"
        }}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      {/* Email input */}
      <div style={{ position: "relative" }}>
        <FaUser style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#888"
        }} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{
            width: "87%",
            padding: "10px 10px 10px 35px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
      </div>

      {/* Password input */}
      <div style={{ position: "relative" }}>
        <FaLock style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#888"
        }} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{
            width: "87%",
            padding: "10px 10px 10px 35px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "12px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: loading ? "#888" : "#2563eb",
          color: "#fff",
          fontWeight: "600",
          fontSize: "16px",
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          transition: "0.3s"
        }}
        onMouseOver={e => !loading && (e.currentTarget.style.backgroundColor = "#1e40af")}
        onMouseOut={e => !loading && (e.currentTarget.style.backgroundColor = "#2563eb")}
      >
        <FaSignInAlt /> {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
