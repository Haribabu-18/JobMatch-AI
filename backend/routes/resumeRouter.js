// routes/resumeRoutes.js
// Run: npm install multer pdf-parse @google/genai

import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

// Multer keeps the uploaded file in memory (no need to save to disk)
const upload = multer({ storage: multer.memoryStorage() });

// store the resume text here for now (just a variable, no DB)
let storedResumeText = "";

// Gemini setup — key comes from your .env file
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//upload resume
router.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    // req.file.buffer is the raw PDF file
    const data = await pdfParse(req.file.buffer);

    storedResumeText = data.text; // save extracted text in memory
    console.log(storedResumeText, "stored resume text");
    console.log("Resume text extracted, length:", storedResumeText.length);

    res.json({ message: "Resume saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not read PDF" });
  }
});

//check match against a job description --------
// router.post("/match-job", async (req, res) => {
//   try {
//     const { jobDescription } = req.body;

//     if (!storedResumeText) {
//       return res.status(400).json({ error: "Upload a resume first" });
//     }

//     const prompt = `
// Compare this resume to this job description.
// Return ONLY a JSON object like {"score": 0-100, "summary": "short explanation"}.

// Resume:
// ${storedResumeText}

// Job description:
// ${jobDescription}
//     `;

//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: prompt,
//     });

//     const text = response.text;

//     // Gemini sometimes wraps JSON in ```json fences — strip those before parsing
//     const clean = text.replace(/```json|```/g, "").trim();
//     const parsed = JSON.parse(clean);

//     res.json(parsed);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Match failed" });
//   }
// });

export default router;