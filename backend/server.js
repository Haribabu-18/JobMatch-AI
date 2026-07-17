import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import cors from 'cors';
import resumeRoutes from "./routes/resumeRouter.js";
import jobRoutes from "./routes/jobRoutes.js"
import connectDB from './database/db.js';

const app = express();
app.use(cors());
app.use(express.json());

console.log(process.env.MONGO_URI);

connectDB();

app.use("/api", resumeRoutes);
app.use("/api", jobRoutes)

app.listen(4000, (req, res) => {
    console.log("server running on port 4000 ")
})
