import React from "react";

function ProjectCard({ project }) {
  return (
    <div className="card" style={{ marginBottom: ".75rem" }}>
      <h3 className="card-title">{project.title}</h3>
      <p className="card-meta">
        <strong>Domain:</strong> {project.domain} | <strong>Institution:</strong> {project.institution} | <strong>Year:</strong> {project.year}
      </p>
      <p className="card-text">
        {project.abstract?.slice(0, 160)}
        {project.abstract && project.abstract.length > 160 ? "..." : ""}
      </p>
      {project.plagiarismScore != null && (
        <p className="card-meta" style={{ marginTop: 4 }}>
          Plagiarism score: <strong>{project.plagiarismScore.toFixed(2)}</strong>
        </p>
      )}
    </div>
  );
}

function ProjectList({ projects }) {
  if (!projects.length) return <p className="card-meta">No projects found.</p>;
  return (
    <div>
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}

export default ProjectList;
