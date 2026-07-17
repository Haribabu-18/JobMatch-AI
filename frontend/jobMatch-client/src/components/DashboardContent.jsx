import React from "react";

function DashboardContent() {
  return (
    <div className="bg-slate-50 min-h-screen p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Job Market Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          AI-powered insights from uploaded job postings.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow border p-6">
          <p className="text-sm text-gray-500">Total Jobs</p>

          <h2 className="text-3xl font-bold mt-3">
            --
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow border p-6">
          <p className="text-sm text-gray-500">Companies</p>

          <h2 className="text-3xl font-bold mt-3">
            --
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow border p-6">
          <p className="text-sm text-gray-500">Locations</p>

          <h2 className="text-3xl font-bold mt-3">
            --
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow border p-6">
          <p className="text-sm text-gray-500">Average Skills / Job</p>

          <h2 className="text-3xl font-bold mt-3">
            --
          </h2>
        </div>

      </div>

      {/* Row 1 */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">

        <div className="bg-white rounded-xl shadow border p-6">
          <h2 className="text-xl font-semibold mb-5">
            Jobs by Role
          </h2>

          <div className="h-80 flex items-center justify-center text-gray-400">
            Recharts Bar Chart
          </div>
        </div>

        <div className="bg-white rounded-xl shadow border p-6">
          <h2 className="text-xl font-semibold mb-5">
            Jobs by Experience
          </h2>

          <div className="h-80 flex items-center justify-center text-gray-400">
            Recharts Pie Chart
          </div>
        </div>

      </div>

      {/* Row 2 */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">

        <div className="bg-white rounded-xl shadow border p-6">
          <h2 className="text-xl font-semibold mb-5">
            Top Hiring Companies
          </h2>

          <div className="h-80 flex items-center justify-center text-gray-400">
            Horizontal Bar Chart
          </div>
        </div>

        <div className="bg-white rounded-xl shadow border p-6">
          <h2 className="text-xl font-semibold mb-5">
            Jobs by Location
          </h2>

          <div className="h-80 flex items-center justify-center text-gray-400">
            Bar Chart
          </div>
        </div>

      </div>

      {/* Skills */}

      <div className="bg-white rounded-xl shadow border p-6 mb-8">

        <h2 className="text-xl font-semibold mb-5">
          Skills Demand
        </h2>

        <div className="h-96 flex items-center justify-center text-gray-400">
          Horizontal Bar Chart
        </div>

      </div>

      {/* Recent Jobs */}

      <div className="bg-white rounded-xl shadow border p-6">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-xl font-semibold">
            Recent Jobs
          </h2>

          <button className="text-blue-600 hover:underline">
            View All
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">Job Title</th>

                <th className="text-left py-3">Company</th>

                <th className="text-left py-3">Experience</th>

                <th className="text-left py-3">Location</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td className="py-4 text-gray-400">
                  Sample Job
                </td>

                <td className="py-4 text-gray-400">
                  Company
                </td>

                <td className="py-4 text-gray-400">
                  2-4 Years
                </td>

                <td className="py-4 text-gray-400">
                  Bangalore
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default DashboardContent;