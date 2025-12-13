import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../api.js";
import ProjectList from "../components/ProjectList.jsx";

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    loadFeaturedProjects();
  }, []);

  async function loadFeaturedProjects() {
    try {
      const res = await axios.get(`${API_BASE}/api/projects`, { params: { limit: 3 } });
      setFeaturedProjects(res.data.slice(0, 3)); // Show only first 3 projects
    } catch (error) {
      console.error("Error loading featured projects:", error);
    }
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Showcase Your <span className="gradient-text">Academic Projects</span> to the World
            </h1>
            <p className="hero-subtitle">
              Join the ultimate platform for students, faculty, and institutions to discover, share, and collaborate on innovative academic projects across all domains.
            </p>
            <div className="hero-actions">
              <Link to="/auth/register" className="button primary large">Get Started</Link>
              <Link to="/repository" className="button secondary large">Explore Projects</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-illustration">
              <div className="floating-card card-1">
                <div className="card-icon">🚀</div>
                <h4>AI & ML Projects</h4>
              </div>
              <div className="floating-card card-2">
                <div className="card-icon">🌐</div>
                <h4>Web Development</h4>
              </div>
              <div className="floating-card card-3">
                <div className="card-icon">📱</div>
                <h4>Mobile Apps</h4>
              </div>
              <div className="floating-card card-4">
                <div className="card-icon">🤖</div>
                <h4>IoT Solutions</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose NDP Repository?</h2>
            <p className="section-subtitle">Everything you need to accelerate your academic journey</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Project Showcase</h3>
              <p>Display your projects with detailed descriptions, tech stacks, and multimedia content to impress potential employers and collaborators.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Smart Discovery</h3>
              <p>Find projects by domain, technology, institution, or academic level with our advanced filtering and search capabilities.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Plagiarism Detection</h3>
              <p>Ensure originality with our AI-powered plagiarism checker that compares your work against a vast database of academic projects.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Collaboration Hub</h3>
              <p>Connect with peers, faculty, and industry professionals to form teams and work on groundbreaking projects together.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics Dashboard</h3>
              <p>Track project views, engagement metrics, and receive insights to optimize your academic portfolio.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Recognition System</h3>
              <p>Earn badges, certificates, and recognition for outstanding contributions to the academic community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Institutions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Showcase Your Genius?</h2>
            <p>Join thousands of students who are already building their academic legacy</p>
            <Link to="/auth/register" className="button primary large">Start Your Journey</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
