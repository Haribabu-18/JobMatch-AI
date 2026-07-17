import React, { useState, useEffect } from "react";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) return <p className="text-center mt-16">Loading dashboard...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">Job Dashboard</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500">Total Jobs</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500">Posted Today</p>
          <p className="text-2xl font-bold text-gray-900">{stats.postedToday}</p>
        </div>
      </div>

      {/* Top roles */}
      <div className="bg-white p-5 rounded-xl shadow-sm border">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Top Roles</h2>
        <ul className="space-y-2">
          {stats.byRole.map((role) => (
            <li key={role._id} className="flex justify-between text-sm text-gray-700">
              <span>{role._id}</span>
              <span className="font-medium">{role.count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Jobs by experience */}
      <div className="bg-white p-5 rounded-xl shadow-sm border">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Jobs by Experience</h2>
        <ul className="space-y-2">
          {stats.byExperience.map((exp) => (
            <li key={exp._id} className="flex justify-between text-sm text-gray-700">
              <span>{exp._id}</span>
              <span className="font-medium">{exp.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;