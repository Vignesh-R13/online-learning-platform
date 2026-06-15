import { useState } from "react";
import axios from "axios";
import "../styles/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h1>Create Account</h1>
        <p>Start learning with LearnHub</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <select
            name="role"
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>

          <button type="submit">
            Register
          </button>

        </form>

      </div>
    </div>
  );
}

export default Register;