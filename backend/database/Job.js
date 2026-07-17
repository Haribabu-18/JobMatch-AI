import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobTitle: String,
    jobLink: String,
    jobDescription: String,
    companyName: String,
    yearExp: String,     
    locations: [String],   
    jobPosted: String,   
    skills: [String],      
});

const Job = mongoose.model("Job", jobSchema);

export default Job;