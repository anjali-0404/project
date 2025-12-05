import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectList from "./components/ProjectList.jsx";
import SubmitProjectForm from "./components/SubmitProjectForm.jsx";

const API_BASE = "http://localhost:5000";

function App() {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");

  async function loadProjects() {
    const res = await axios.get(`${API_BASE}/api/projects`, {
      params: { q: query }
    });
    setProjects(res.data);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">National Digital Repository of Student Projects</h1>
        <p className="subtitle">Explore innovative projects from universities and colleges across India.</p>
      </header>

      <section className="toolbar">
        <input
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") loadProjects();
          }}
          placeholder="Search projects by title..."
        />
        <button className="button primary" onClick={loadProjects}>Search</button>
      </section>

      <section className="content">
        <div className="main">
          <h2>Project Repository</h2>
          <ProjectList projects={projects} />
        </div>
        <div className="side">
          <h2>Submit New Project</h2>
          <SubmitProjectForm onSubmitted={loadProjects} apiBase={API_BASE} />
        </div>
      </section>
    </div>
  );
}

export default App;
