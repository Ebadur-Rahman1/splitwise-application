import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Login = () => {

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // Trim inputs (Main Fix)
      const payload = {
        email: form.email.trim(),
        password: form.password.trim(),
      };

      const res = await api.post("/login", payload);

      localStorage.setItem("token", res.data.access_token);
      setToken(res.data.access_token);

      toast.success("Login successful");

      navigate("/dashboard");

    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="card p-4">
        <h3>Login</h3>

        {/* Email Type Added */}
        <input
          name="email"
          type="email"
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Email"
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Password"
        />

        <button className="btn btn-primary">Login</button>

      </form>
    </div>
  );
};

export default Login;
