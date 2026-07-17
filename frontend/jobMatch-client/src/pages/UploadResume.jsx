import React, { useState } from "react";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(false);

  // pick a file, just save it in state for now
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Step 1: send the resume to backend, it extracts text + skills
  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("resume", file);

    const res = await fetch("http://localhost:4000/api/upload-resume", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Extracted skills:", data.skills);

    setUploading(false);
    setResumeUploaded(true);
  };

  // Step 2: ask backend for jobs that match the resume's skills
  const handleFindMatches = async () => {
    setLoadingMatches(true);

    const res = await fetch("http://localhost:4000/api/matching-jobs");
    const data = await res.json();

    setMatches(data);
    setLoadingMatches(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 p-8">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-xl font-semibold text-gray-900 mb-5">Upload Resume</h1>

        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 file:text-sm file:font-medium hover:file:bg-indigo-100"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-indigo-600 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {resumeUploaded && (
          <button
            onClick={handleFindMatches}
            disabled={loadingMatches}
            className="mt-4 w-full bg-emerald-600 text-white font-semibold text-sm py-2.5 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 transition-colors"
          >
            {loadingMatches ? "Finding jobs..." : "Find Matching Jobs"}
          </button>
        )}
      </div>

      {/* Job cards */}
      {matches.length > 0 && (
        <div className="mt-8 grid gap-4">
          {matches.map((job, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{job.jobTitle}</h3>
                  <p className="text-sm text-gray-500">{job.companyName}</p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {job.score}% match
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {job.locations?.join(", ")} · {job.yearExp} · {job.jobPosted}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {job.skills.map((skill, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-1 rounded-full ${
                      job.matchedSkills.includes(skill)
                        ? "bg-indigo-100 text-indigo-700 font-medium"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <a
                href={job.jobLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Apply →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UploadResume;