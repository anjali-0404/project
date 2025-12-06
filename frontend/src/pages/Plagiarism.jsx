import React, { useState } from "react";
import axios from "axios";

export default function Plagiarism() {
  const [text, setText] = useState("");
  const [score, setScore] = useState(null);
  const [status, setStatus] = useState("");

  async function check() {
    setStatus("Checking...");
    try {
      const res = await axios.post("http://localhost:7000/api/plagiarism/check", { text });
      setScore(res.data.score);
      setStatus("");
    } catch {
      setStatus("Error contacting ML service");
    }
  }

  return (
    <div className="app">
      <h1 className="title">Plagiarism Detection (Mock)</h1>
      <p className="card-meta">Paste your project abstract or description below to generate a similarity score.</p>
      <textarea className="textarea" rows={8} value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to check..." />
      <button className="button primary" onClick={check}>Generate Report</button>
      {status && <p className="status">{status}</p>}
      {score != null && (
        <div className="card" style={{ marginTop: "1rem" }}>
          <h3 className="card-title">Originality Report</h3>
          <p className="card-text">Similarity score: <strong>{score.toFixed(2)}</strong></p>
        </div>
      )}
    </div>
  );
}