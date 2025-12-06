import React from "react";

function Footer() {
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid #e5e7eb", marginTop: "2rem" }}>
      <div className="app" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p className="card-meta">© {new Date().getFullYear()} National Digital Repository of Student Projects</p>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <a className="button" href="/privacy">Privacy Policy</a>
          <a className="button" href="/terms">Terms</a>
          <a className="button" href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;