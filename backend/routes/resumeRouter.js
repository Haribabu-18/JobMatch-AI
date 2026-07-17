// routes/resumeRoutes.js
// Run: npm install multer pdf-parse

import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import Job from "../database/Job.js";

const router = express.Router();

// Multer keeps the uploaded file in memory (no need to save to disk)
const upload = multer({ storage: multer.memoryStorage() });

// store resume data here for now (just variables, no DB)
let storedResumeText = "";
let storedResumeSkills = [];

// escape special regex characters in a skill name (e.g. "C++" or "C#")
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// -------- Step 1: upload resume + find skills by matching against known job skills --------
router.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    // req.file.buffer is the raw PDF file
    const data = await pdfParse(req.file.buffer);
    storedResumeText = data.text;
    console.log("Resume text extracted, length:", storedResumeText.length);

    // get every unique skill name that exists across all jobs in MongoDB
    const allJobSkills = await Job.distinct("skills");

    // keep only the skills that actually appear as a whole word in the resume text
    storedResumeSkills = allJobSkills.filter((skill) => {
      if (!skill) return false;
      const pattern = new RegExp(`\\b${escapeRegex(skill)}\\b`, "i");
      return pattern.test(storedResumeText);
    });

    console.log("Matched skills from resume:", storedResumeSkills);

    res.json({ message: "Resume saved", skills: storedResumeSkills });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not read PDF" });
  }
});

// -------- Step 2: find matching jobs from MongoDB by skill overlap --------
router.get("/matching-jobs", async (req, res) => {
  try {
    if (storedResumeSkills.length === 0) {
      return res.status(400).json({ error: "Upload a resume first" });
    }

    const resumeSkillsLower = storedResumeSkills.map((s) => s.toLowerCase());

    const jobs = await Job.find(
      {},
      "jobTitle companyName locations yearExp jobLink jobPosted skills"
    );

    const scoredJobs = jobs.map((job) => {
      const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
      const matchedSkills = job.skills.filter((skill) =>
        resumeSkillsLower.includes(skill.toLowerCase())
      );

      const score =
        jobSkillsLower.length === 0
          ? 0
          : Math.round((matchedSkills.length / jobSkillsLower.length) * 100);

      return {
        jobTitle: job.jobTitle,
        companyName: job.companyName,
        locations: job.locations,
        yearExp: job.yearExp,
        jobLink: job.jobLink,
        jobPosted: job.jobPosted,
        skills: job.skills,
        matchedSkills,
        score,
      };
    });

    const topMatches = scoredJobs
      .filter((job) => job.matchedSkills.length > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);

    res.json(topMatches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not find matching jobs" });
  }
});

export default router;