import express from "express";
import { authRequired, requireRole } from "../middleware/authMiddleware.js";
import { Comment } from "../models/Comment.js";
import { Project } from "../models/Project.js";

const router = express.Router();

router.get("/project/:projectId", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { projectId: req.params.projectId },
      order: [["createdAt", "DESC"]],
      include: [{ association: "author", attributes: ["id", "name", "role", "institution"] }]
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post(
  "/project/:projectId",
  authRequired,
  requireRole(["student", "faculty", "admin"]),
  async (req, res) => {
    try {
      const project = await Project.findByPk(req.params.projectId);
      if (!project) return res.status(404).json({ message: "Project not found" });
      const { text } = req.body;
      const comment = await Comment.create({ text, projectId: project.id, userId: req.user.id });
      res.status(201).json(comment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.delete(
  "/:id",
  authRequired,
  requireRole(["student", "faculty", "admin"]),
  async (req, res) => {
    try {
      const comment = await Comment.findByPk(req.params.id);
      if (!comment) return res.status(404).json({ message: "Not found" });
      if (comment.userId !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      await comment.destroy();
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
