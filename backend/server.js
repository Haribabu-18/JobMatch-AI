import 'dotenv/config';
import express from 'express'
import cors from 'cors';
import resumeRoutes from "./routes/resumeRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", resumeRoutes);

app.listen(4000, (req, res) => {
    console.log("server running on port 4000 ")
})
