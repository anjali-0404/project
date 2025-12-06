import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api.js";

export default function DashboardAdmin() {
  const [stats, setStats] = useState({ totalProjects: 0, totalUsers: 0, universities: 0, plagiarismChecks: 0, institutionsList: [] });

  useEffect(() => {
    async function load() {
      const res = await axios.get(`${API_BASE}/api/stats`);
      setStats(res.data);
    }
    load();
  }, []);

  return (
    <div className="app">
      <h1 className="title">Admin Dashboard</h1>
      <p className="subtitle">Monitor platform analytics and institutions.</p>
      <div className="grid-4">
        <div className="card"><h3 className="card-title">Projects</h3><p className="title" style={{fontSize:"2rem"}}>{stats.totalProjects}</p></div>
        <div className="card"><h3 className="card-title">Users</h3><p className="title" style={{fontSize:"2rem"}}>{stats.totalUsers}</p></div>
        <div className="card"><h3 className="card-title">Universities</h3><p className="title" style={{fontSize:"2rem"}}>{stats.universities}</p></div>
        <div className="card"><h3 className="card-title">Plagiarism Checks</h3><p className="title" style={{fontSize:"2rem"}}>{stats.plagiarismChecks}</p></div>
      </div>
      <div className="card" style={{ marginTop: "1rem" }}>
        <h3 className="card-title">Institutions</h3>
        <p className="card-text">{stats.institutionsList?.join(", ") || "—"}</p>
      </div>
    </div>
  );
}