import express from "express";
import { Project } from "../models/Project.js";
import { User } from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [projectsCount, usersCount, distinctInstitutions, plagiarismChecks] = await Promise.all([
      Project.count(),
      User.count(),
      Project.aggregate("institution", "count", { distinct: true }),
      Project.count({ where: { plagiarismScore: { [Project.sequelize.Op.ne]: null } } })
    ]);

    const institutionsRaw = await Project.findAll({
      attributes: [[Project.sequelize.fn("DISTINCT", Project.sequelize.col("institution")), "institution"]]
    });
    const institutionsList = institutionsRaw.map((r) => r.get("institution"));

    res.json({
      totalProjects: projectsCount,
      totalUsers: usersCount,
      universities: distinctInstitutions,
      plagiarismChecks,
      institutionsList
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
