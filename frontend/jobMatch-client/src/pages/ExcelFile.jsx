import React, { useState } from "react";

function ExcelFile() {
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:4000/api/upload-jobs", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      alert(`Uploaded ${data.count} jobs successfully!`);
    } else {
      alert("Upload failed: " + data.error);
    }
  };

  return (
    <div className="bg-slate-50 w-full p-8">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

            <h1 className="text-3xl font-bold text-slate-800">
              Upload Jobs
            </h1>

            <p className="text-slate-500 mt-2 mb-8">
              Upload an Excel file containing job descriptions to begin AI-powered
              job matching.
            </p>

            <div className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-xl p-10 flex flex-col items-center">

              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-4xl mb-5">
                📊
              </div>

              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFile}
                className="mb-5"
              />

              {file && (
                <div className="w-full bg-white border border-green-200 rounded-lg p-4 mb-5">
                  <p className="text-green-700 font-semibold">
                    Selected File
                  </p>

                  <p className="text-slate-700 mt-1 break-all">
                    {file.name}
                  </p>
                </div>
              )}

              <button
                onClick={handleUpload}
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-lg font-semibold shadow"
              >
                Upload Excel
              </button>

            </div>

          </div>

          {/* Right Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Welcome to JobMatch AI
            </h2>

            <p className="text-slate-600 leading-8">
              JobMatch AI is an AI-powered recruitment assistant that compares
              resumes with job descriptions and recommends the most suitable
              opportunities. Upload Excel job data, analyze resumes, and receive
              intelligent matching scores using Gemini AI.
            </p>

            <div className="grid grid-cols-2 gap-5 mt-10">

              <div className="bg-slate-100 rounded-xl p-5 hover:bg-blue-50 transition">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold text-lg text-slate-800">
                  Excel Upload
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  Upload multiple job descriptions in a single Excel file.
                </p>
              </div>

              <div className="bg-slate-100 rounded-xl p-5 hover:bg-blue-50 transition">
                <div className="text-3xl mb-3">📄</div>
                <h3 className="font-bold text-lg text-slate-800">
                  Resume Parser
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  Automatically extracts skills, education and experience.
                </p>
              </div>

              <div className="bg-slate-100 rounded-xl p-5 hover:bg-blue-50 transition">
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="font-bold text-lg text-slate-800">
                  AI Matching
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  Gemini AI calculates resume-job compatibility scores.
                </p>
              </div>

              <div className="bg-slate-100 rounded-xl p-5 hover:bg-blue-50 transition">
                <div className="text-3xl mb-3">📈</div>
                <h3 className="font-bold text-lg text-slate-800">
                  Dashboard
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  View recommendations, scores and shortlisted jobs.
                </p>
              </div>

            </div>

            <div className="mt-8 bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h3 className="font-bold text-blue-700 text-lg">
                Why Use JobMatch AI?
              </h3>

              <ul className="mt-4 space-y-2 text-slate-700">
                <li>✔ Upload jobs in bulk using Excel</li>
                <li>✔ AI-powered resume analysis</li>
                <li>✔ Fast and accurate job matching</li>
                <li>✔ Simple dashboard for recruiters and candidates</li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ExcelFile;