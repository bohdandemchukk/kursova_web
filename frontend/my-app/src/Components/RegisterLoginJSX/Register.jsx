import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../AuthStyles.css";

function Register() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", formData);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error || "Помилка реєстрації");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Реєстрація</h2>
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
        <button type="submit">Реєстрація</button>
      </form>
    </div>
  );
}

export default Register;
