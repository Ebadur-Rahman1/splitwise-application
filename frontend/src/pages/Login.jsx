import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", form, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const token = response.data.access_token;

      // Store token
      localStorage.setItem("token", token);

      toast.success("Login successful!");

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (error) {

      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong");
      }

    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h3>Login</h3>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
