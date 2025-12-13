import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">NDP Repository</h3>
            <p className="footer-description">
              A comprehensive platform for students to showcase, discover, and collaborate on academic projects across various domains.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/repository">Explore Projects</Link></li>
              <li><Link to="/plagiarism">Plagiarism Check</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Support</h4>
            <ul className="footer-links">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><a href="mailto:support@ndp.edu">Help & Support</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Connect</h4>
            <div className="footer-social">
              <a href="#" className="social-link">📘 Facebook</a>
              <a href="#" className="social-link">🐦 Twitter</a>
              <a href="#" className="social-link">💼 LinkedIn</a>
              <a href="#" className="social-link">📧 Email</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 NDP Student Project Repository. All rights reserved.</p>
          <p>Made with ❤️ for academic excellence</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
