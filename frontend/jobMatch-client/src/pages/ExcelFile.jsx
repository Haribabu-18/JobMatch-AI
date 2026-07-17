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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Upload Excel File</h1>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFile}
        className="border p-2 rounded"
      />
      <br />
      <br />
      {file && (
        <p>
          <strong>Selected File:</strong> {file.name}
        </p>
      )}
      <br />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}

export default ExcelFile;