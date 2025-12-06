import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../api.js";
import { useNavigate } from "react-router-dom";

export default function AuthLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function login(e) {
    e.preventDefault();
    setStatus("Logging in…");
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      setStatus("Logged in");
      navigate("/repository");
    } catch (err) {
      setStatus("Invalid credentials");
    }
  }

  return (
    <div className="app">
      <h1 className="title">Login</h1>
      <form className="form" onSubmit={login}>
        <input className="input" name="email" placeholder="Email" value={form.email} onChange={change} />
        <input className="input" type="password" name="password" placeholder="Password" value={form.password} onChange={change} />
        <button className="button primary" type="submit">Login</button>
        {status && <p className="status">{status}</p>}
      </form>
    </div>
  );
}
