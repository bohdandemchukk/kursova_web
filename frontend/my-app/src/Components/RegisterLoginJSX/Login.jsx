import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../AuthStyles.css";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      alert("Логін успішний!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.error || "Помилка логіну");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Логін</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
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
        <button type="submit">Логін</button>
      </form>
    </div>
  );
}

export default Login;
