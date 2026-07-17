import express from "express";
import multer from "multer";
import * as XLSX from "xlsx";
import Job from "../database/Job.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// -------- Step 3: upload Excel file and save rows to MongoDB --------
router.post("/upload-jobs", upload.single("file"), async (req, res) => {
    try {
        // read the Excel file from memory
        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet); // array of row objects

        // turn each Excel row into a Job document
        const jobs = rows.map((row) => {
            // combine Location 1..6 into a single array, skipping empty ones
            const locations = [
                row["Location 1"],
                row["Location 2"],
                row["Location 3"],
                row["Location 4"],
                row["Location 5"],
                row["Location 6"],
            ].filter(Boolean);

            // split "Excel ,Ms Office ,Hrsd" into ["Excel", "Ms Office", "Hrsd"]
            const skills = row["skills"]
                ? row["skills"].split(",").map((s) => s.trim()).filter(Boolean)
                : [];

            return {
                jobTitle: row["Job Title"],
                jobLink: row["Job Link"],
                jobDescription: row["Job Discrpition"], // matches the exact column name in the sheet
                companyName: row["Company Name"],
                yearExp: row["Year Exp"],
                locations,
                jobPosted: row["Job Posted"],
                skills,
            };
        });

        await Job.insertMany(jobs);

        res.json({ message: "Jobs uploaded", count: jobs.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not process file" });
    }
});

// -------- Step 4: dashboard stats --------
router.get("/dashboard", async (req, res) => {
    try {
        // total jobs
        const totalJobs = await Job.countDocuments();

        // top 10 roles by number of postings
        const byRole = await Job.aggregate([
            { $group: { _id: "$jobTitle", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 },
        ]);

        // jobs grouped by experience range (e.g. "1-6 Yrs")
        const byExperience = await Job.aggregate([
            { $group: { _id: "$yearExp", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        // jobs posted "Today"
        const postedToday = await Job.countDocuments({ jobPosted: "Today" });

        res.json({ totalJobs, byRole, byExperience, postedToday });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not load dashboard data" });
    }
});

// -------- Get all jobs --------
router.get("/jobs", async (req, res) => {
    try {
        const jobs = await Job.find().sort({ _id: -1 });
        res.json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not fetch jobs" });
    }
});

export default router;