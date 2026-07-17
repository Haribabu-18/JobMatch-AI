import React, { useState } from "react";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  //pick a file, just save it in state for now
  const handleFileChange = (e) => {
    console.log(e, "event from file")
    setFile(e.target.files[0]);
  };

  // send the file to backend so it can extract and store the text
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);
    console.log(formData, "form data");

    const res = await fetch("http://localhost:4000/api/upload-resume", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data); //"Resume saved"
    alert("Resume uploaded!");
  };

  //send job description to backend, get back a match score
  const handleCheckMatch = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:4000/api/match-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobDescription }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-xl shadow-md">
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
          className="bg-indigo-600 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Upload
        </button>
      </div>

      <h2 className="text-base font-medium text-gray-800 mt-6 mb-2">Job Description</h2>
      <textarea
        rows={6}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste job description here"
        className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />

      <button
        onClick={handleCheckMatch}
        disabled={loading}
        className="mt-4 w-full bg-indigo-600 text-white font-semibold text-sm py-2.5 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Checking..." : "Check Match"}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            Match Score: {result.score}%
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">{result.summary}</p>
        </div>
      )}
    </div>
  );
}

export default UploadResume;