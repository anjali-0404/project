import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../api.js";

export default function Plagiarism() {
  const [text, setText] = useState("");
  const [score, setScore] = useState(null);
  const [status, setStatus] = useState("");

  async function check() {
    if (!text.trim()) {
      setStatus("❌ Please enter some text to check");
      return;
    }
    
    setStatus("Checking...");
    setScore(null);
    try {
      const res = await axios.post(`${API_BASE}/api/plagiarism/check`, { text });
      console.log("Plagiarism response:", res.data);
      setScore(res.data.score);
      setStatus("✅ Check completed");
      setTimeout(() => setStatus(""), 2000);
    } catch (error) {
      console.error("Plagiarism check error:", error);
      const errorMsg = error.response?.data?.message || error.message || "Unknown error";
      setStatus(`❌ ${errorMsg}`);
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
          <p className="card-meta">
            {score < 10 ? "✅ Highly original" : score < 25 ? "⚠️ Mostly original" : "❌ High similarity detected"}
          </p>
        </div>
      )}
    </div>
  );
}