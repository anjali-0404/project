import React, { useState } from "react";
import axios from "axios";

function SubmitProjectForm({ apiBase, onSubmitted }) {
  const [form, setForm] = useState({
    title: "",
    domain: "",
    abstract: "",
    techStack: "",
    academicLevel: "UG",
    year: new Date().getFullYear()
  });
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const authToken = token || localStorage.getItem("token") || "";
      let fileUrl = form.fileUrl;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const up = await axios.post(`${apiBase}/api/upload/file`, formData, {
          headers: { Authorization: authToken ? `Bearer ${authToken}` : "" }
        });
        fileUrl = up.data.fileUrl;
      }

      await axios.post(`${apiBase}/api/projects`, { ...form, fileUrl }, {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : ""
        }
      });
      setStatus("Submitted successfully");
      setForm({
        title: "",
        domain: "",
        abstract: "",
        techStack: "",
        academicLevel: "UG",
        year: new Date().getFullYear()
      });
      setFile(null);
      onSubmitted && onSubmitted();
    } catch (err) {
      setStatus(err.response?.data?.message || "Error submitting project");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <small>
        Note: For a real deployment, you will first register/login to get a JWT token and paste it below.
      </small>
      <input
        className="input"
        placeholder="JWT token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <input
        className="input"
        name="title"
        placeholder="Project title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        className="input"
        name="domain"
        placeholder="Domain (e.g. AI, IoT, Web)"
        value={form.domain}
        onChange={handleChange}
        required
      />
      <textarea
        className="textarea"
        name="abstract"
        placeholder="Short abstract"
        value={form.abstract}
        onChange={handleChange}
        required
        rows={4}
      />
      <input
        className="input"
        name="techStack"
        placeholder="Tech stack (React, Spring Boot, etc.)"
        value={form.techStack}
        onChange={handleChange}
      />
      <select className="select" name="academicLevel" value={form.academicLevel} onChange={handleChange}>
        <option value="UG">UG</option>
        <option value="PG">PG</option>
        <option value="PhD">PhD</option>
      </select>
      <input
        className="input"
        name="year"
        type="number"
        value={form.year}
        onChange={handleChange}
      />
      <input className="input" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button className="button" type="submit">Submit Project</button>
      {status && <p className="status">{status}</p>}
    </form>
  );
}

export default SubmitProjectForm;
