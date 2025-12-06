import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api.js";
import ProjectList from "../components/ProjectList.jsx";

export default function Repository() {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({ q: "", domain: "", institution: "", department: "", year: "", tech: "" });

  async function load() {
    const res = await axios.get(`${API_BASE}/api/projects`, { params: filters });
    setProjects(res.data);
  }

  useEffect(() => { load(); }, []);

  function change(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Project Repository</h1>
        <p className="subtitle">Search and explore projects by university, department, technology, and year.</p>
      </header>

      <div className="form card" style={{ marginBottom: "1rem" }}>
        <input className="input" name="q" placeholder="Title contains…" value={filters.q} onChange={change} />
        <input className="input" name="institution" placeholder="Institution" value={filters.institution} onChange={change} />
        <input className="input" name="department" placeholder="Department" value={filters.department} onChange={change} />
        <input className="input" name="domain" placeholder="Domain (AI, IoT, Web)" value={filters.domain} onChange={change} />
        <input className="input" name="tech" placeholder="Technology keyword" value={filters.tech} onChange={change} />
        <input className="input" type="number" name="year" placeholder="Year" value={filters.year} onChange={change} />
        <button className="button primary" onClick={load}>Apply Filters</button>
      </div>

      <ProjectList projects={projects} />
    </div>
  );
}
