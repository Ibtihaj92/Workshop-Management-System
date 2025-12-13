import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../logo.png";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

 const handleLogin = async () => {
  setLoading(true);
  setMsg("");

  try {
    const response = await axios.post("http://localhost:5000/login", {
      userName: username,
      userPassword: password,
    });

    if (response.data.success) {
      alert("Login successful");

      // Store userId and role in localStorage
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("role", response.data.role);

      // Redirect based on role
      if (response.data.role === "admin") {
        navigate("/admin"); // Admin page
      } else {
        navigate("/workshops"); // Normal user page
      }
    } else {
      setMsg(response.data.message);
    }
  } catch (error) {
    console.error(error);
    setMsg(error.response?.data?.message || "Login failed. Please try again.");
  }

  setLoading(false);
};


  // Inline styles
  const styles = {
    card: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "30px",
      borderRadius: "16px",
      backgroundColor: "#fff",
      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      textAlign: "center",
    },
    logo: { width: "110px", marginBottom: "20px" },
    title: { fontSize: "22px", marginBottom: "20px", color: "#333" },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "12px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    button: {
      backgroundColor: "#ff4d6d",
      color: "white",
      padding: "12px 0",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "16px",
      width: "100%",
      marginBottom: "12px",
      transition: "0.3s",
    },
    linkText: { color: "#ff4d6d", cursor: "pointer", marginLeft: "4px" },
    errorMsg: { color: "red", textAlign: "center", marginBottom: "12px" },
  };

  return (
    <div style={styles.card}>
      <img src={logo} alt="logo" style={styles.logo} />
      <h2 style={styles.title}>Workshop Management System</h2>

      <input
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <button
        style={styles.button}
        onClick={handleLogin}
        disabled={loading}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#ff2a4a")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d6d")}
      >
        {loading ? "Logging in..." : "Log in"}
      </button>

      {msg && <p style={styles.errorMsg}>{msg}</p>}

      <div style={{ fontSize: "14px", color: "#666" }}>
        Don’t have an account?
        <span style={styles.linkText} onClick={() => navigate("/register")}>
          Sign Up
        </span>
      </div>
    </div>
  );
}

export default Login;
