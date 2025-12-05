import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/db.js";
import "./models/User.js";
import "./models/Project.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "NDP Backend API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  await sequelize.sync();
  app.listen(PORT, () => console.log(`✅ Server listening on ${PORT}`));
}

start();
