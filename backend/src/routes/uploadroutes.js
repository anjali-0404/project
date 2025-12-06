import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

const uploadDir = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + unique + ext);
  }
});

const upload = multer({ storage, limits: { fileSize: 25 * 1024 * 1024 } });

router.post("/file", authRequired, upload.single("file"), (req, res) => {
  const fileUrl = `/uploads/${path.basename(req.file.path)}`;
  res.status(201).json({ fileUrl });
});

export default router;
