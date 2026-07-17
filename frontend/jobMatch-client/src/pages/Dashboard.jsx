import React, { useEffect, useState } from "react";
import RoleBarChart from "../components/charts/RoleBarChart";
import ExperienceLineChart from "../components/charts/ExperienceLineChart";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen p-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-slate-800 mb-8">
        Job Market Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Total Jobs</p>
          <h2 className="text-3xl font-bold mt-2">{stats.totalJobs}</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Posted Today</p>
          <h2 className="text-3xl font-bold mt-2">{stats.postedToday}</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Top Roles</p>
          <h2 className="text-3xl font-bold mt-2">{stats.byRole.length}</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">Experience Groups</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats.byExperience.length}
          </h2>
        </div>
      </div>

      {/* Charts */}
      {/* Charts */}

      <div className="space-y-8">

        {/* Jobs by Role */}

        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-6">
            Jobs by Role
          </h2>

          <RoleBarChart data={stats.byRole} />
        </div>

        {/* Jobs by Experience */}

        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-6">
            Jobs by Experience
          </h2>

          <ExperienceLineChart data={stats.byExperience} />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;