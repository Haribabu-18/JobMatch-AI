import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import UploadResume from './pages/UploadResume'
import ExcelFile from './pages/ExcelFile'
import JobFindings from './pages/JobFindings'
import Sidebar from './components/Sidebar'

function App() {

    return (
        <>
        <BrowserRouter>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 ml-64 p-6">
          <Routes>
            <Route path="/" element={<ExcelFile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload-resume" element={<UploadResume />} />
            <Route path="/job-findings" element={<JobFindings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>

        </>
    )
}

export default App;