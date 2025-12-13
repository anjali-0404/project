import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/check", async (req, res) => {
  try {
    const { text } = req.body;
    console.log("Plagiarism check request received, text length:", text?.length);
    
    if (!text || !text.trim()) {
      console.log("Empty text, returning 0 score");
      return res.json({ score: 0 });
    }

    // ML Service is not running, so just return mock score
    const mockScore = Math.floor(Math.random() * 35) + 5;
    console.log("Returning mock plagiarism score:", mockScore);
    return res.json({ score: mockScore });
    
  } catch (err) {
    console.error("Plagiarism check error:", err);
    res.status(500).json({ message: "Error checking plagiarism: " + err.message });
  }
});

export default router;
