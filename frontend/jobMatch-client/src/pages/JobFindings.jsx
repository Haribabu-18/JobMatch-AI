import React, { useEffect, useMemo, useState } from "react";

function JobFindings() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [posted, setPosted] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

  const uniqueLocations = useMemo(() => {
    return [
      ...new Set(
        jobs
          .flatMap((job) => job.locations || [])
          .map((loc) => loc.trim())
      ),
    ].sort();
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const titleMatch =
        search === "" ||
        job.jobTitle.toLowerCase().includes(search.toLowerCase());

      const locationMatch =
        location === "" ||
        job.locations.includes(location);

      const expMatch =
        experience === "" ||
        job.yearExp === experience;

      const postedMatch =
        posted === "" ||
        job.jobPosted === posted;

      return (
        titleMatch &&
        locationMatch &&
        expMatch &&
        postedMatch
      );
    });
  }, [jobs, search, location, experience, posted]);

  return (
    <div className="bg-slate-50 min-h-screen p-8">

      <h1 className="text-4xl font-bold mb-2">
        Job Findings
      </h1>

      <p className="text-gray-500 mb-8">
        Browse all uploaded jobs from the database.
      </p>

      {/* Filters */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          <input
            type="text"
            placeholder="Search Job..."
            className="border rounded-lg p-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded-lg p-3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>

            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <select
            className="border rounded-lg p-3"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="">All Experience</option>

            {[...new Set(jobs.map((job) => job.yearExp))].map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>

          <select
            className="border rounded-lg p-3"
            value={posted}
            onChange={(e) => setPosted(e.target.value)}
          >
            <option value="">Any Time</option>

            {[...new Set(jobs.map((job) => job.jobPosted))].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSearch("");
              setLocation("");
              setExperience("");
              setPosted("");
            }}
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            Reset
          </button>

        </div>

      </div>

      {/* Count */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Available Jobs
        </h2>

        <span className="bg-blue-600 text-white px-4 py-2 rounded-full">
          {filteredJobs.length} Jobs
        </span>

      </div>

      {/* Cards */}

      <div className="grid lg:grid-cols-2 gap-6">

        {filteredJobs.map((job) => (

          <div
            key={job._id}
            className="bg-white rounded-xl shadow p-6"
          >

            <h2 className="text-2xl font-bold">
              {job.jobTitle}
            </h2>

            <p className="text-gray-500 mt-1">
              {job.companyName}
            </p>

            <div className="mt-4 space-y-2">

              <p>
                📍 {job.locations.join(", ")}
              </p>

              <p>
                💼 {job.yearExp}
              </p>

              <p>
                📅 {job.jobPosted}
              </p>

            </div>

            <p className="mt-4 text-gray-600 line-clamp-3">
              {job.jobDescription}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">

              {job.skills.map((skill) => (

                <span
                  key={skill}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>

              ))}

            </div>

            <a
              href={job.jobLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Apply Now
            </a>

          </div>

        ))}

      </div>

    </div>
  );
}

export default JobFindings;