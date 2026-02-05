import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // Trim inputs 
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password.trim(),
      };

      await api.post("/register", payload);

      toast.success("Registration successful");

      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="card p-4">
        <h3>Register</h3>

        <input
          name="name"
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Name"
          
        />

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

        <button className="btn btn-success">Register</button>

      </form>
    </div>
  );
};

export default Register;
