import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", hostel: "" });
  const [error, setError] = useState("");

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-box">
      <h2>Create account</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Full name" required value={form.name} onChange={update("name")} />
        <input type="email" placeholder="Email" required value={form.email} onChange={update("email")} />
        <input type="password" placeholder="Password (min 6 chars)" required minLength={6}
          value={form.password} onChange={update("password")} />
        <input placeholder="Phone / WhatsApp with country code, e.g. 919876543210" value={form.phone} onChange={update("phone")} />
        <input placeholder="Hostel / Block" value={form.hostel} onChange={update("hostel")} />
        <button className="btn" type="submit">Sign Up</button>
      </form>
      <p>Already registered? <Link to="/login">Login</Link></p>
    </div>
  );
}
