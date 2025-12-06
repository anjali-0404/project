import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
      <div className="app" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="title" style={{ margin: 0 }}>NDRSP</h1>
        </Link>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Link className="button" to="/repository">Explore Projects</Link>
          <Link className="button" to="/plagiarism">Plagiarism Check</Link>
          <Link className="button" to="/about">About</Link>
          <Link className="button primary" to="/auth/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
