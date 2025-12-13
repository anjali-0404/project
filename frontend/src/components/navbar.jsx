import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">📚</div>
          <span className="logo-text">NDP Repository</span>
        </Link>
        <div className="navbar-menu">
          <Link className="navbar-link" to="/repository">Explore Projects</Link>
          <Link className="navbar-link" to="/plagiarism">Plagiarism Check</Link>
          <Link className="navbar-link" to="/about">About</Link>
          <Link className="navbar-link primary" to="/auth/login">Login</Link>
        </div>
        <div className="navbar-mobile-toggle">
          <span>☰</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
