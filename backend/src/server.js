import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/db.js";
import "./models/User.js";
import "./models/Project.js";
import "./models/Comment.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import plagiarismRoutes from "./routes/plagiarismRoutes.js";
import { Project } from "./models/Project.js";
import { User } from "./models/User.js";
import path from "path";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "NDP Backend API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/plagiarism", plagiarismRoutes);

const PORT = process.env.PORT || 5000;

async function seedDatabase() {
  try {
    // Check if demo user exists
    let demoUser = await User.findOne({ where: { email: 'demo@ndp.edu' } });
    if (!demoUser) {
      demoUser = await User.create({
        name: 'Demo User',
        email: 'demo@ndp.edu',
        passwordHash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
        role: 'student',
        institution: 'National Demo University'
      });
      console.log('✅ Demo user created');
    }

    // Check if projects exist
    const projectCount = await Project.count();
    if (projectCount === 0) {
      const sampleProjects = [
        {
          title: 'AI-Powered Campus Navigation System',
          domain: 'AI',
          abstract: 'A revolutionary mobile application that uses artificial intelligence and computer vision to help students navigate campus buildings and find optimal routes between classes. Features include indoor positioning, crowd density monitoring, and personalized recommendations based on user preferences and schedule.',
          techStack: 'React Native, TensorFlow, Node.js, PostgreSQL',
          institution: 'National Demo University',
          academicLevel: 'UG',
          year: 2024,
          ownerId: demoUser.id,
          status: 'approved'
        },
        {
          title: 'IoT-Based Smart Agriculture Platform',
          domain: 'IoT',
          abstract: 'An intelligent farming system that monitors soil moisture, temperature, and nutrient levels in real-time using IoT sensors. The platform provides automated irrigation control, crop health monitoring, and predictive analytics to optimize yield and reduce water usage by 40%.',
          techStack: 'Arduino, Raspberry Pi, Python, MQTT, React',
          institution: 'Agricultural Institute',
          academicLevel: 'PG',
          year: 2023,
          ownerId: demoUser.id,
          status: 'approved'
        },
        {
          title: 'Blockchain Academic Credential Verification',
          domain: 'Blockchain',
          abstract: 'A decentralized platform for secure verification of academic credentials using blockchain technology. Universities can issue tamper-proof digital certificates, and employers can instantly verify degrees and transcripts without contacting institutions directly.',
          techStack: 'Ethereum, Solidity, IPFS, React, Node.js',
          institution: 'Tech University',
          academicLevel: 'PhD',
          year: 2024,
          ownerId: demoUser.id,
          status: 'approved'
        },
        {
          title: 'AR/VR Medical Training Simulator',
          domain: 'AR/VR',
          abstract: 'An immersive virtual reality environment for medical students to practice surgical procedures and anatomical studies. Features realistic 3D models, haptic feedback, and performance analytics to enhance learning outcomes and reduce training costs.',
          techStack: 'Unity, Oculus SDK, C#, Blender, Firebase',
          institution: 'Medical College',
          academicLevel: 'PG',
          year: 2023,
          ownerId: demoUser.id,
          status: 'approved'
        },
        {
          title: 'Sustainable Energy Management System',
          domain: 'Energy',
          abstract: 'A comprehensive platform for monitoring and optimizing energy consumption in university campuses. Uses machine learning algorithms to predict energy demand, automate lighting and HVAC systems, and provide detailed analytics for sustainable energy management.',
          techStack: 'Python, TensorFlow, IoT sensors, React, MongoDB',
          institution: 'Green University',
          academicLevel: 'UG',
          year: 2024,
          ownerId: demoUser.id,
          status: 'approved'
        }
      ];

      for (const proj of sampleProjects) {
        try {
          await Project.create(proj);
        } catch (e) {
          console.warn(`⚠️ Could not create project "${proj.title}":`, e.message);
        }
      }
      console.log('✅ Sample projects seeded');
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  }
}

async function start() {
  await connectDB();
  await sequelize.sync();
  try {
    await seedDatabase();
  } catch (err) {
    console.warn('⚠️ Seed error (non-critical):', err.message);
  }
  app.listen(PORT, () => console.log(`✅ Server listening on ${PORT}`));
}

start();
