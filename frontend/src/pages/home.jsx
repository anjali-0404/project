import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api.js";
import { Link } from "react-router-dom";

export default function Home() {
  const [stats, setStats] = useState({ totalProjects: 0, universities: 0, totalUsers: 0, plagiarismChecks: 0 });

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await axios.get(`${API_BASE}/api/stats`);
        setStats(res.data);
      } catch {}
    }
    loadStats();
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="hero-content app">
          <h1 className="hero-title">One Nation, One Student Project Platform</h1>
          <p className="hero-subtitle">A centralized national repository to submit, review, and explore student projects across India.</p>
          <div className="hero-actions">
            <Link className="button primary" to="/repository">Explore Projects</Link>
            <Link className="button" to="/auth/register">Submit Project</Link>
          </div>
        </div>
      </section>

      <section className="app" style={{ marginTop: "1.5rem" }}>
        <h2>Platform Overview</h2>
        <p className="card-text">Secure, role-based access for Students, Faculty, and Admins. Built with React, Node, and PostgreSQL. Future-ready for Turnitin integration.</p>
      </section>

      <section className="app grid-4">
        <div className="card fade-in"><h3 className="card-title">Total Projects</h3><p className="title" style={{fontSize: "2rem"}}>{stats.totalProjects}</p></div>
        <div className="card fade-in"><h3 className="card-title">Universities</h3><p className="title" style={{fontSize: "2rem"}}>{stats.universities}</p></div>
        <div className="card fade-in"><h3 className="card-title">Users</h3><p className="title" style={{fontSize: "2rem"}}>{stats.totalUsers}</p></div>
        <div className="card fade-in"><h3 className="card-title">Plagiarism Checks</h3><p className="title" style={{fontSize: "2rem"}}>{stats.plagiarismChecks}</p></div>
      </section>

      <section className="app">
        <div className="card">
          <h3 className="card-title">SDG Alignment</h3>
          <p className="card-text"><strong>SDG 4:</strong> Quality Education — promoting accessible academic knowledge sharing.</p>
          <p className="card-text"><strong>SDG 8:</strong> Decent Work and Economic Growth — enabling innovation and employability.</p>
        </div>
      </section>
    </div>
  );
}
