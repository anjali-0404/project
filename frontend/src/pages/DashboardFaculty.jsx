import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api.js";

function decodeToken() {
  try {
    const token = localStorage.getItem("token") || "";
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch { return null; }
}

export default function DashboardFaculty() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("");
  const user = decodeToken();

  async function load() {
    const res = await axios.get(`${API_BASE}/api/projects`, { params: { status: "pending", institution: user?.institution } });
    setProjects(res.data);
  }

  useEffect(() => { load(); }, []);

  async function setProjectStatus(id, newStatus) {
    try {
      const token = localStorage.getItem("token") || "";
      await axios.patch(`${API_BASE}/api/projects/${id}/status`, { status: newStatus }, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      setStatus("Updated");
      load();
    } catch { setStatus("Error updating status"); }
  }

  async function setGrade(id, grade) {
    try {
      const token = localStorage.getItem("token") || "";
      await axios.post(`${API_BASE}/api/projects/${id}/grade`, { grade }, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      setStatus("Graded");
      load();
    } catch { setStatus("Error grading"); }
  }

  return (
    <div className="app">
      <h1 className="title">Faculty Dashboard</h1>
      <p className="subtitle">Review and approve student submissions for {user?.institution || "your institution"}.</p>
      {status && <p className="status">{status}</p>}

      {projects.length ? projects.map((p) => (
        <div key={p.id} className="card" style={{ marginBottom: ".75rem" }}>
          <h3 className="card-title">{p.title}</h3>
          <p className="card-meta">Domain: {p.domain} | Year: {p.year} | Plagiarism: {p.plagiarismScore != null ? p.plagiarismScore.toFixed(2) : "—"}</p>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <button className="button" onClick={() => setProjectStatus(p.id, "approved")}>Approve</button>
            <button className="button" onClick={() => setProjectStatus(p.id, "rejected")}>Reject</button>
            <select className="select" onChange={(e) => setGrade(p.id, e.target.value)} defaultValue="">
              <option value="" disabled>Grade</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>
      )) : <p className="card-meta">No pending projects.</p>}
    </div>
  );
}