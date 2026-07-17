import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import ExcelFile from "./pages/ExcelFile";
import JobFindings from "./pages/JobFindings";

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-slate-50 min-h-screen">
        <Sidebar />

        <main className="flex-1 ml-72">
          <Routes>
            <Route path="/" element={<ExcelFile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload-resume" element={<UploadResume />} />
            <Route path="/job-findings" element={<JobFindings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;