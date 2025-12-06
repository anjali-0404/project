import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../api.js";

export default function AuthRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "", institution: "", role: "student" });
  const [status, setStatus] = useState("");

  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function register(e) {
    e.preventDefault();
    setStatus("Registering…");
    try {
      await axios.post(`${API_BASE}/api/auth/register`, form);
      setStatus("Registered. Please login.");
    } catch (err) { setStatus("Error registering"); }
  }

  return (
    <div className="app">
      <h1 className="title">Register</h1>
      <form className="form" onSubmit={register}>
        <input className="input" name="name" placeholder="Name" value={form.name} onChange={change} />
        <input className="input" name="email" placeholder="Email" value={form.email} onChange={change} />
        <input className="input" type="password" name="password" placeholder="Password" value={form.password} onChange={change} />
        <input className="input" name="institution" placeholder="Institution" value={form.institution} onChange={change} />
        <select className="select" name="role" value={form.role} onChange={change}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>
        <button className="button primary" type="submit">Register</button>
        {status && <p className="status">{status}</p>}
      </form>
    </div>
  );
}
