import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api.js";
import SubmitProjectForm from "../components/SubmitProjectForm.jsx";

function decodeToken() {
  try {
    const token = localStorage.getItem("token") || "";
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch { return null; }
}

export default function DashboardStudent() {
  const [projects, setProjects] = useState([]);
  const user = decodeToken();

  async function load() {
    if (!user) return;
    const res = await axios.get(`${API_BASE}/api/projects`, { params: { ownerId: user.id } });
    setProjects(res.data);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="app">
      <h1 className="title">Student Dashboard</h1>
      <p className="subtitle">Welcome {user?.id ? `User #${user.id}` : ""} — manage your projects below.</p>

      <div className="content">
        <div>
          <h2>My Projects</h2>
          {projects.length ? projects.map((p) => (
            <div key={p.id} className="card" style={{ marginBottom: ".75rem" }}>
              <h3 className="card-title">{p.title}</h3>
              <p className="card-meta">Status: {p.status} | Plagiarism: {p.plagiarismScore != null ? p.plagiarismScore.toFixed(2) : "—"}</p>
            </div>
          )) : <p className="card-meta">No projects yet.</p>}
        </div>
        <div>
          <h2>Submit New Project</h2>
          <SubmitProjectForm apiBase={API_BASE} onSubmitted={load} />
        </div>
      </div>
    </div>
  );
}