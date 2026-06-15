import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        email,
        password
      });

      console.log("DATA:", data);
      console.log("USER:", data.user);

      // ✅ STORE TOKEN + USER
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful");

      console.log("Role:", data.user.role);

      // ✅ PROPER REDIRECT (NO window.location BUG)
      if (data.user.role === "student") {
        console.log("Redirecting to student dashboard");
        navigate("/student-dashboard");
      } else {
        console.log("Redirecting to instructor dashboard");
        navigate("/instructor-dashboard");
      }

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">
          Login to continue your learning journey
        </p>

        <form onSubmit={onSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="login-input"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="login-input"
          />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;