
import express from "express";
import { Project } from "../models/Project.js";
import { authRequired, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { q, domain, institution } = req.query;
    const where = {};
    if (domain) where.domain = domain;
    if (institution) where.institution = institution;
    if (q) where.title = { [Project.sequelize.Op.iLike]: `%${q}%` };

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
      const { title, domain, abstract, techStack, academicLevel, year } = req.body;

      let plagiarismScore = null;
      try {
        const resp = await fetch(process.env.ML_SERVICE_URL, {
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
        institution: req.user.institution,
        academicLevel,
        year,
        plagiarismScore,
        ownerId: req.user.id
      });

      res.status(201).json(project);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
