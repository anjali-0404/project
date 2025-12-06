
import express from "express";
import fetch from "node-fetch";
import { Project } from "../models/Project.js";
import { authRequired, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { q, domain, institution, year, tech, department, status, ownerId } = req.query;
    const where = {};
    if (domain) where.domain = domain;
    if (institution) where.institution = institution;
    if (department) where.department = department;
    if (status) where.status = status;
    if (year) where.year = +year;
    if (tech) where.techStack = { [Project.sequelize.Op.iLike]: `%${tech}%` };
    if (q) where.title = { [Project.sequelize.Op.iLike]: `%${q}%` };
    if (ownerId) where.ownerId = +ownerId;

    const projects = await Project.findAll({ where, order: [["year", "DESC"]] });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post(
  "/",
  authRequired,
  requireRole(["student", "faculty", "admin"]),
  async (req, res) => {
    try {
      const { title, domain, abstract, techStack, academicLevel, year, department, fileUrl } = req.body;

      let plagiarismScore = null;
      try {
        const mlUrl = process.env.ML_SERVICE_URL || "http://localhost:7000/api/plagiarism/check";
        const resp = await fetch(mlUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: abstract })
        });
        if (resp.ok) {
          const data = await resp.json();
          plagiarismScore = data.score;
        }
      } catch {
        plagiarismScore = null;
      }

      const project = await Project.create({
        title,
        domain,
        abstract,
        techStack,
        department,
        institution: req.user.institution,
        academicLevel,
        year,
        plagiarismScore,
        fileUrl,
        ownerId: req.user.id
      });

      res.status(201).json(project);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.patch(
  "/:id/status",
  authRequired,
  requireRole(["faculty", "admin"]),
  async (req, res) => {
    try {
      const { status } = req.body;
      const project = await Project.findByPk(req.params.id);
      if (!project) return res.status(404).json({ message: "Not found" });
      project.status = status;
      await project.save();
      res.json(project);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.post(
  "/:id/grade",
  authRequired,
  requireRole(["faculty", "admin"]),
  async (req, res) => {
    try {
      const { grade } = req.body;
      const project = await Project.findByPk(req.params.id);
      if (!project) return res.status(404).json({ message: "Not found" });
      project.grade = grade;
      await project.save();
      res.json(project);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
